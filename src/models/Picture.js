import mongoose from "mongoose";

const pictureSchema = new mongoose.Schema(
    {
    linkDrive: { type: String },
    tituloLink: {type: String},
    idAmostra: {type: mongoose.Schema.Types.ObjectId, ref: 'amostras'}
    }, {
        versionKey: false
    }
);

const pictures = mongoose.model('imagens', pictureSchema);
export default pictures;