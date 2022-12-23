import express from "express";
import UsuariosController from "../controllers/UsuariosController.js";

const router = express.Router();

router
    .post('/user', UsuariosController.insertUser)
    .put('/user/:id', UsuariosController.alterUser)

export default router;