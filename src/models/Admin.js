import mongoose from "mongoose";

const Admin = mongoose.model('admins', {
    nome: String,
    usuario: String,
    senha: String
})

export default Admin;



// import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema(
//     {
//         nome: {type: String, required: true},
//         usuario: {type: String, required: true},
//         senha: {type: String, required: true},
//     }
// );

// const admin = mongoose.model('admin', adminSchema);
// export default admin;