import amostras from "../models/Amostra.js";

const findAllService = (offset, limit) => amostras.find()
        .sort({ _id: 1 })
        .skip(offset)
        .limit(limit);

const countAmostras = () => amostras.countDocuments();

export {
    findAllService,
    countAmostras
}