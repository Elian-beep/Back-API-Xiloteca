import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config.js";
import Admin from "../models/Admin.js";
import Token from "../models/Token.js";


class AdminController {

    // CHECA A VALIDADE E AUTENTICIDADE DO TOKEN GERADO
    static checkToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: "Acesso negado" });
        }

        try {
            // Token.find({"token":token}, {}, (err, findedToken) => {
            //     if (findedToken[0].token !== token) {
            //         console.log("Token falso ou expirado");
            //     }
            // });
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            console.log("Token válido");
            next();
        } catch (error) {
            res.status(400).json({ msg: "Token inválido!", error });
        }
    }


    // MÉTODOS PRIVADOS PRIVATE---------------------------------

    // AUTENTICAÇÃO DE LOGIN E CRIAÇÃO DE TOKEN PARA SESSÃO
    static async authAdmin(req, res) {
        const admin = req.body;
        if (!admin.usuario) {
            return res.status(422).json({ msg: "O usuário é obrigatório!" });
        }
        if (!admin.senha) {
            return res.status(422).json({ msg: "A senha é obrigatório!" });
        }

        // CHECK IF USER EXISTS
        const user = await Admin.findOne({ usuario: admin.usuario });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // CHECK IF PASSWORD MATCH
        const checkSenha = await bcrypt.compare(admin.senha, user.senha);
        if (!checkSenha) {
            return res.status(422).json({ msg: "Senha inválida!" });
        }

        try {
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    id: user._id
                },
                secret
            );
            //ISERINDO TOKEN GERADO NO BANCO DE DADOS
            const myToken = new Token({
                token: token,
                expirationDate: Date.now()
            });
            await myToken.save();

            return res.status(200).json({ msg: "Autenticação realizada com sucesso: ", token, "Admin": user._id });
        } catch (error) {
            res.status(500).json({ msg: 'Erro na autenticação: ', error });
        }
    }

    // TRATAMENTO DE TOKEN POR SESSÃO

    static async listToken(req, res) {
        const { token } = req.params;
        try{
            Token.find({"token":token}, {}, (err, findedToken) => {
                if (findedToken.length == 0) {
                    return res.status(404).json({ msg: "Token não encontrado", cod: 404 });
                }
                res.status(200).json(findedToken);
            })
        }catch(error){
            res.status(500).json({ msg: 'Erro na pesquisa do token: ', error });
        }
    }

    static async delToken(req, res) {
        const { id } = req.params;
        try {
            Token.findByIdAndDelete(id, (err) => {
                if (!err) {
                    res.status(200).json({message: 'Token removida com sucesso'});
                }else{
                    res.status(500).json(err.message);  
                }
            });
        } catch (error) {
            res.status(500).json({ msg: 'Erro na exclusão: ', error });
        }
    }

    // INFORMAÇÕES DE ADMIN (MENOS A SENHA)
    static async infosAdmin(req, res) {
        const id = req.params.id;

        // CHECK IS USER EXISTS
        const user = await Admin.findById(id, '-senha');

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }
        res.status(200).json({ user });
    }

    // INSERÇÃO DE NOVO ADM
    static async insertAdmin(req, res) {
        const { nome, usuario, senha, confirmSenha } = req.body;
        //validations
        if (!nome) {
            return res.status(422).json({ msg: "O nome é obrigatório!" });
        }
        if (!usuario) {
            return res.status(422).json({ msg: "O usuário é obrigatório!" });
        }
        if (!senha) {
            return res.status(422).json({ msg: "A senha é obrigatório!" });
        }
        if (senha != confirmSenha) {
            return res.status(422).json({ msg: "As senhas não conferem!" });
        }

        // CHECK IF USER EXISTS
        const userExists = await Admin.findOne({ usuario: usuario });
        if (userExists) {
            return res.status(422).json({ msg: "Usuário ja existente, utilize outro!" });
        }

        // CREATE PASSWORD
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        const admin = new Admin({
            nome,
            usuario,
            senha: senhaHash,
        });

        try {
            await admin.save();
            return res.status(201).json({ msg: "Administrador criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: 'Erro na inserção: ', error });
        }
    }
}


export default AdminController;