import amostras from "../models/Amostra.js";
import jwt from "jsonwebtoken";
import { findAllService, countAmostras } from '../services/Amostras.service.js';

class AmostrasController {

    // CHECA A VALIDADE E AUTENTICIDADE DO TOKEN GERADO
    static checkToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: "Acesso negado" });
        }

        try {
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            // if (onlyCheck == 'true') {
            //     return res.status(200).json({ msg: "Token válido!" });
            // }
            console.log("Token válido");
            next();
        } catch (error) {
            res.status(400).json({ msg: "Token inválido!", error });
        }
    }

    // BUSCAR TODAS AS AMOSTRAS
    static async listAll(req, res) {
        try {
            const allAmostras = await amostras.find();
            return res.status(200).json(allAmostras);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    // BUSCAR TODAS AS AMOSTRAS PAGINASS
    static async listAllPage(req, res) {
        try {
            let { limit, offset } = req.query;

            limit = Number(limit);
            offset = Number(offset);

            if (!limit) limit = 100;
            if (!offset) offset = 0;

            const allAmostras = await findAllService(offset, limit);
            const total = await countAmostras();
            const next = offset + limit;
            const nextUrl = next < total ? `/amostras/page?limit=${limit}&offset=${next}` : null;

            const previous = offset - limit < 0 ? null : offset - limit;
            const previousUrl = previous != null ? `/amostras/page?limit=${limit}&offset=${previous}` : null;

            if (allAmostras.length === 0) {
                return res.status(400).send({
                    message: "Não há nenhuma amostra cadastrada"
                });
            }
            return res.status(200).send({ nextUrl, previousUrl, limit, offset, total, results: allAmostras.map(amostra => (amostra)) })
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    static async listSearchPage(req, res) {
        try {
            let { limit, offset } = req.query;
            const amostras = req.body;
            limit = Number(limit);
            offset = Number(offset);

            if (!limit) limit = 100;
            if (!offset) offset = 0;

            const total = amostras.length;

            const paginatedAmostras = amostras.slice(offset, offset + limit);

            const next = offset + limit;
            const nextUrl = next < total ? `/amostras/page/busca?limit=${limit}&offset=${next}` : null;

            const previous = offset - limit < 0 ? null : offset - limit;
            const previousUrl = previous !== null ? `/amostras/page/busca?limit=${limit}&offset=${previous}` : null;

            if (paginatedAmostras.length === 0) {
                return res.status(400).send({
                    message: "Não há amostras para exibir.",
                });
            }

            return res.status(200).send({
                nextUrl,
                previousUrl,
                limit,
                offset,
                total,
                results: paginatedAmostras,
            });

        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    // BUSCAR AMOSTRA POR ID
    static async findId(req, res) {
        const { id } = req.params;
        try {
            const amostraFound = await amostras.findById(id);
            // return res.status(200).json(amostraFound);
            return true;
        } catch (error) {
            return false;
            // return res.status(400).json(error.message);
        }
    }

    // CADASTRAR UMA NOVA AMOSTRA
    static async insertAmostra(req, res) {
        let amostra = new amostras(req.body);
        amostras.find({ 'cod': amostra.cod }, {}, (err, amostras) => {
            if (amostras.length == 0) {
                try {
                    amostra.save();
                    console.log("salvou");
                    return res.status(200).send(amostra);
                } catch (error) {
                    console.log("erro ao salvar");
                    return res.status(500).json(error.message);
                }
            } else {
                return res.status(500).json({ msg: "Código ja existente na base de dados!" });
            }
        });
    }

    // ALTERAR OS DADOS DE UMA AMOSTRA
    static async alterAmostra(req, res) {
        try {
            const { id } = req.params;
            amostras.findByIdAndUpdate(id, { $set: req.body }, (err) => {
                if (!err) {
                    res.status(200).json({ message: 'Amostra alterada' });
                } else {
                    res.status(500).json(err.message);
                }
            })
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    // DELETAR UMA AMOSTRA
    static deleteAmostra = (req, res) => {
        const { id } = req.params;
        try {
            amostras.findByIdAndDelete(id, (err) => {
                if (!err) {
                    res.status(200).json({ message: 'Amostra removida com sucesso' });
                } else {
                    res.status(500).json(err.message);
                }
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

}

export default AmostrasController;