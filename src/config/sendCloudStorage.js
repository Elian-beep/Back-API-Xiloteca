// const { Storage } = require('@google-cloud/storage');
import { Storage } from '@google-cloud/storage';
// const path = require('path');
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = new Storage({
    keyFilename: path.join(__dirname, '../controllers/data/pictures-xiloteca-547296c599c1.json'),
    projectId: 'pictures-xiloteca'
});

const bucket = storage.bucket('pictures-xiloteca');

const sendCloudStorage = (req, res, next) => {
    if (req.file && req.file.mimetype) {
        const blob = bucket.file(uuidv4() + req.file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', err => {
            res.status(500).send({ error: err });
        });

        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            req.fileUrl = publicUrl; // adiciona a URL do arquivo à requisição
            next();
        });

        blobStream.end(req.file.buffer);
    } else {
        res.status(400).send({ error: 'Nenhum arquivo encontrado' });
    }
};

export default sendCloudStorage;