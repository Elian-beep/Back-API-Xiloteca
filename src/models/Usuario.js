import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        nome: {type: String, required: true},
        usuario: {type: String, required: true},
        email: {type: String, required: true},
        senha: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

const usuarios = mongoose.model('usuarios', usuarioSchema);
export default usuarios;