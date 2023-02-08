import express from "express";
import AdminController from "../controllers/AdminController.js";

const router = express.Router();

router
    .post('/auth/register', AdminController.insertAdmin);

export default router;