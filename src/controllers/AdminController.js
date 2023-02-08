import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

class AdminController {
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
}

export default AdminController;