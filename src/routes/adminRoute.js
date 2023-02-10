import express from "express";
import { get } from "mongoose";
import AdminController from "../controllers/AdminController.js";

const router = express.Router();

router
    .get('/user/:id', AdminController.checkToken, AdminController.infosAdmin)
    .get('/user/auth/:onlyCheck', AdminController.checkToken)
    .post('/auth/login', AdminController.authAdmin)
    .post('/auth/register', AdminController.insertAdmin)

export default router;