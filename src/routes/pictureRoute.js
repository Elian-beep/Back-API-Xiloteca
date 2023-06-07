import express from "express";
import PicturesController from "../controllers/PictureController.js";

const router = express.Router();

router
    .get('/imagens', PicturesController.findAll)
    .get('/imagens/:idAmostra', PicturesController.findBySample)
    .post('/imagens', PicturesController.create)
    .delete('/imagens/:id', PicturesController.remove)

export default router;