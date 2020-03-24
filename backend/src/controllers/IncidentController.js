const connection = require('../database/connection')

module.exports = {
    
    async index(req,res){
        const incidents = await connection('incidents').select('*');

        return res.json(incidents);

    },

    async create(req, res) {
        
        //pega do cabeçalho da requisição o id da ong autenticada
        const ong_id = req.headers.authorization;

        const {tittle, description, value } = req.body;

        //cadastra no caso da ong
        const [id] = await connection('incidents').insert({
            tittle,
            description,
            value,
            ong_id,
        })

        return res.json({ id });
    },

    async delete(req, res){

        const id= req.params;
        const ong_id = req.headers.authorization;

        console.log(ong_id);
        console.log(id);

        const incident = await connection('incidents').where('id',id).select('ong_id').first();

        if(incident.ong_id != ong_id){
            return res.status(401).json({error:'Operation not permited.'});
        }

        await connection('incidents').where('id',id).delete();

        return  res.status(204).send();

    }

}