import mongoose from "mongoose";

const amostraSchema = new mongoose.Schema(
    {
        id: {type: String},
        cod: {type: String, required: true},
        lamina: {type: String},
        herb: {type: String},
        familia: {type: String},
        nomeCientifico: {type: String, required: true},
        nomeVulgar: {type: String},
        procedencia: {type: String},
        coletor: {type: String},
        dataColeta: {type: String},
        determinador: {type: String},
        remetente: {type: String},
        desc: {type: String},
        obs: {type: String}
    },{
        versionKey: false
    }
);

const amostras = mongoose.model('amostras', amostraSchema);

export default amostras;