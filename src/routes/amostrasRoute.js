import express from "express";
import AmostrasController from "../controllers/AmostrasController.js";

const router = express.Router();

router
    .get('/amostras', AmostrasController.listAll)
    .get('/amostras/:id', AmostrasController.findId)
    .post('/amostras', AmostrasController.checkToken, AmostrasController.insertAmostra)
    .put('/amostras/:id', AmostrasController.checkToken, AmostrasController.alterAmostra)
    .delete('/amostras/:id', AmostrasController.checkToken, AmostrasController.deleteAmostra)

export default router;