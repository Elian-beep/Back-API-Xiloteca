import express from "express";
import PicturesController from "../controllers/PictureController.js";
import upload from "../config/multer.js";

const router = express.Router();

router
    .get('/imagens', PicturesController.findAll)
    .post('/imagens', upload.single("file"), PicturesController.create)
    .delete('/imagens/:id', PicturesController.remove)

export default router;