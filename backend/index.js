const express = require('express');

const app = express();

app.get('/', (req,res) =>{
    res.json({
        aluno:'Gabriel Gregório Silveira Netto',
    });
});

app.listen(3333);
