import express from "express";
import AdminController from "../controllers/AdminController.js";

const router = express.Router();

router
    .get('/user/:id', AdminController.checkToken, AdminController.infosAdmin)
    .post('/auth/register', AdminController.insertAdmin)
    .post('/auth/login', AdminController.authAdmin)

export default router;