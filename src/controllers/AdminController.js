import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config.js";
import Admin from "../models/Admin.js";


class AdminController {
    static checkToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];
    
        if (!token) {
            return res.status(401).json({msg: "Acesso negado"});
        }

        try{
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            next();
        }catch(error){
            res.status(400).json({msg: "Token inválido!", error});
        }
    }


    // PRIVATE
    static async infosAdmin(req, res){
        const id = req.params.id;

        // CHECK IS USER EXISTS
        const user = await Admin.findById(id, '-senha');

        if (!user) {
            return res.status(404).json({msg: "Usuário não encontrado"});
        }
        res.status(200).json({ user });
    }

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
            return res.status(201).json({ msg: "Administrador criado com sucesso!" })
        } catch (error) {
            res.status(500).json({ msg: 'Erro na inserção: ', error });
        }
    }

    // LOGIN AUTH
    static async authAdmin(req, res) {
        const { usuario, senha } = req.body;
        if (!usuario) {
            return res.status(422).json({ msg: "O usuário é obrigatório!" });
        }
        if (!senha) {
            return res.status(422).json({ msg: "A senha é obrigatório!" });
        }

        // CHECK IF USER EXISTS
        const user = await Admin.findOne({ usuario: usuario });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // CHECK IF PASSWORD MATCH
        const checkSenha = await bcrypt.compare(senha, user.senha);
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
            return res.status(200).json({msg: "Autenticação realizada com sucesso: ", token});
        } catch (error) {
            res.status(500).json({ msg: 'Erro na autenticação: ', error });
        }
    }
}


export default AdminController;