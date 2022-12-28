import express from "express";
import UsuariosController from "../controllers/UsuariosController.js";

const router = express.Router();

router
    .get('/user/busca/em', UsuariosController.findEmail)
    .post('/user', UsuariosController.insertUser)
    .put('/user/:id', UsuariosController.alterUser)
    .delete('/user/:id', UsuariosController.deleteUser)

export default router;