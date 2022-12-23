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

    // ALTERAR OS DADOS DE UMA AMOSTRA
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
}

export default UsuariosController;