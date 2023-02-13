import express from "express";
import AdminController from "../controllers/AdminController.js";

const router = express.Router();

router
    .get('/user/auth/:onlyCheck', AdminController.checkToken)
    .get('/user/:id', AdminController.checkToken, AdminController.infosAdmin)
    .post('/user/token', AdminController.checkToken, AdminController.insertToken)
    .post('/auth/login', AdminController.authAdmin)
    .post('/auth/register', AdminController.insertAdmin)

export default router;