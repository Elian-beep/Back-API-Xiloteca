import usuarios from "../models/Usuario.js";

class UsuariosController{
    // CADASTRAR UM NOVO USUARIO
    static async insertUser(req, res){
        try{
            let usuario = new usuarios(req.body);
            await usuario.save();
            return res.status(200).send(usuario);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // ALTERAR OS DADOS DE UM USUÁRIO
    static async alterUser(req, res){
        try{
            const { id } = req.params;
            usuarios.findByIdAndUpdate(id, { $set: req.body }, (err)=>{
                if (!err) {
                    res.status(200).json({ message: 'Usuário alterado' });
                }else{
                    res.status(500).json(err.message);
                }
            })
        }catch(error){
            res.status(500).json(error.message);
        }
    }

    // DELETAR UM USUÁRIO
    static deleteUser = (req, res) => {
        const { id } = req.params;
        try{
            usuarios.findByIdAndDelete(id, (err) => {
                if (!err) {
                    res.status(200).json({message: 'Usuário removido com sucesso'});
                }else{
                    res.status(500).json(err.message);        
                }
            });
        }catch(error){
            res.status(500).json(error.message);
        }
    }

    // BUSCAR USUÁRIO PELO E-MAIL
    static async findEmail(req, res){
        const email = req.query.email;
        try{
            usuarios.find({'email': email}, {}, (err, usuario) => {
                return res.status(200).json(usuario);
            })
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
}

export default UsuariosController;