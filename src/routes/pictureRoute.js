import express from "express";
import PicturesController from "../controllers/PictureController.js";
import upload from "../config/multer.js";
import sendCloudStorage from "../config/sendCloudStorage.js";

const router = express.Router();

router
    .get('/imagens', PicturesController.findAll)
    .get('/imagens/:idAmostra', PicturesController.findBySample)
    .post('/imagens', PicturesController.create)
    .delete('/imagens/:id', PicturesController.remove)

export default router;