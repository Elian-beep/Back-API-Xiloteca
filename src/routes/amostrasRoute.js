import express from "express";
import AmostrasController from "../controllers/AmostrasController.js";

const router = express.Router();

router
    .get('/amostras', AmostrasController.listAll)
    .get('/amostras/busca/nv', AmostrasController.findNV)
    .get('/amostras/busca/nc', AmostrasController.findNC)
    .get('/amostras/busca/cod', AmostrasController.findCod)
    .get('/amostras/busca/familia', AmostrasController.findFamilia)
    .get('/amostras/:id', AmostrasController.findId)
    .post('/amostras', AmostrasController.insertAmostra)
    .put('/amostras/:id', AmostrasController.alterAmostra)
    .delete('/amostras/:id', AmostrasController.deleteAmostra)

export default router;