import express from "express";
import AdminController from "../controllers/AdminController.js";

const router = express.Router();

router
    // .get('/user/auth/:onlyCheck', AdminController.checkToken)
    .get('/user/token/:token', AdminController.checkToken, AdminController.listToken)
    .get('/user/:id', AdminController.checkToken, AdminController.infosAdmin)
    .post('/auth/login', AdminController.authAdmin)
    .post('/auth/register', AdminController.insertAdmin)
    .delete('/user/token/:id', AdminController.checkToken, AdminController.delToken) 

export default router;