import mongoose from "mongoose";
import amostras from "./Amostra.js";

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    name: {type: String, required: true},
    src: {type: String, required: true},
    // idAmostra: {type: mongoose.Schema.Types.ObjectId, ref: 'amostras'}
});

const pictures = mongoose.model('imagens', PictureSchema);

export default pictures;