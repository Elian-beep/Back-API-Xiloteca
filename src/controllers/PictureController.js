import Picture from "../models/Picture.js";
import fs from 'fs';

import { Storage } from '@google-cloud/storage';
import path, { dirname } from "path";
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from "url";
import { json } from "express";

class PicturesController {

    static async create(req, res) {
        try{
            // const file = req.file;
            const { linkDrive } = req.body;

            const picture = new Picture({
                // src: file.path,
                linkDrive
            });
            await picture.save()
            return res.json({picture, msg: "Imgem salva com sucesso!"})
        }catch(error){
            return res.status(500).json({message: "Erro ao salvar imagem.", error: error.message});
        }
    }

    /*
    static async create(req, res, next){
        const storage = new Storage({
            keyFilename: path.join(dirname(fileURLToPath(import.meta.url)), './data/pictures-xiloteca-547296c599c1.json'),
            projectId: 'pictures-xiloteca'
        });
        const bucket = storage.bucket('pictures-xiloteca');

        const file = req.file;
        const blobName = (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname));
        const blob = bucket.file(blobName);

        if (req.file && req.file.mimetype) {
            const stream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });
        }else{
            return res.json({msg: "arquivo nulo"});
        }

        stream.on('error', (err) => {
            next(err);
        });
        
        stream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blobName}`;
            res.status(200).send(publicUrl);
        });
        stream.end(file.buffer);
    }
    */

    static async findAll(req, res){
        try{
            const pictures = await Picture.find();
            return res.json(pictures)
        }catch(error){
            return res.status(500).json({message: "Erro ao buscar imagens.", error: error.message});
        }
    }

    static async remove(req, res){
        try{
            const picture = await Picture.findById(req.params.id);
            if (!picture) {
                return res.status(404).json({ message: "Imagem não encontrada" });
            }

            fs.unlinkSync(picture.src)
            await picture.remove();
            return res.json({ message: "Imagem removida com sucesso!" });
        }catch(error){
            return res.status(500).json({message: "Erro ao excluir imagem.", error: error.message});
        }
    }
}

export default PicturesController;