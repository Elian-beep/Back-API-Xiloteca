import Picture from "../models/Picture.js";
import fs from 'fs';

class PicturesController {

    static async create(req, res) {
        try{
            const {name} = req.body;
            const file = req.file;

            const picture = new Picture({
                name,
                src: file.path
            });

            await picture.save()
            return res.json({picture, msg: "Imgem salva com sucesso!"})
        }catch(error){
            return res.status(500).json({message: "Erro ao salvar imagem.", error: error.message});
        }
    }

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