import mongoose from "mongoose";
import amostras from "./Amostra.js";

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    // src: {type: String, required: true},
    linkDrive: { type: String }
    // idAmostra: {type: mongoose.Schema.Types.ObjectId, ref: 'amostras'}
}, {
    versionKey: false
});

const pictures = mongoose.model('imagens', PictureSchema);

export default pictures;