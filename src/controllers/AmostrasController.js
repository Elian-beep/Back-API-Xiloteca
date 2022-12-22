import amostras from "../models/Amostra.js";

class AmostrasController{

    // BUSCAR TODAS AS AMOSTRAS
    static async listAll (req, res) {
        try{
            const allAmostras = await amostras.find();
            return res.status(200).json(allAmostras);
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    // BUSCAR AMOSTRA POR ID
    static async findId(req, res){
        const { id } = req.params;
        try{
            const amostraFound = await amostras.findById(id);
            return res.status(200).json(amostraFound);
        }catch(error){
            return res.status(400).json(error.message);
        }
    }

    // BUSCAR AMOSTRA PELO NOME VULGAR (busca somente se o nome for exato)
    static async findNV(req, res){
        const nv = req.query.nomeVulgar;
        try{
            amostras.find({'nomeVulgar': nv}, {}, (err, amostras) => {
                return res.status(200).json(amostras);
            })
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // BUSCAR AMOSTRA PELO NOME CIENTÍFICO (busca somente se o nome for exato)
    static async findNC(req, res){
        const nc = req.query.nomeCientifico;
        try{
            amostras.find({'nomeCientifico': nc}, {}, (err, amostras) => {
                return res.status(200).json(amostras);
            })
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    // BUSCAR AMOSTRA PELO CODIGO (busca somente se o nome for exato)
    static async findCod(req, res){
        const cod = req.query.cod;
        try{
            amostras.find({'cod': new RegExp('.*'+cod+'.*') }, {}, (err, amostras) => {
                return res.status(200).json(amostras);
            })
            // amostras.find({'cod': cod}, {}, (err, amostras) => {
            //     return res.status(200).json(amostras);
            // })
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    // BUSCAR AMOSTRA PELO CODIGO (busca somente se o nome for exato)
    static async findFamilia(req, res){
        const familia = req.query.familia;
        try{
            amostras.find({'familia': { $regex: '.*'+familia+'.*' }}, (err, amostras) => {
                return res.status(200).json(amostras);
            })
            // amostras.find({'familia': /familia/}, {}, (err, amostras) => {
            //     return res.status(200).json(amostras);
            // }).lean()
        }catch(error){
            return res.status(500).send(error.message);
        }
    }

    // CADASTRAR UMA NOVA AMOSTRA
    static async insertAmostra (req, res) {
        try{
            let amostra = new amostras(req.body);
            await amostra.save();
            return res.status(200).send(amostra);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    // ALTERAR OS DADOS DE UMA AMOSTRA
    static async alterAmostra(req, res){
        try{
            const { id } = req.params;
            amostras.findByIdAndUpdate(id, { $set: req.body }, (err)=>{
                if (!err) {
                    res.status(200).json({ message: 'Amostra alterada' });
                }else{
                    res.status(500).json(err.message);
                }
            })
        }catch(error){
            res.status(500).json(error.message);
        }
    }

    // DELETAR UMA AMOSTRA
    static deleteAmostra = (req, res) => {
        const { id } = req.params;
        try{
            amostras.findByIdAndDelete(id, (err) => {
                if (!err) {
                    res.status(200).json({message: 'Amostra removida com sucesso'});
                }else{
                    res.status(500).json(err.message);        
                }
            });
        }catch(error){
            res.status(500).json(error.message);
        }
    }

}

export default AmostrasController;