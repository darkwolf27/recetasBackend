const express = require('express');
const _ = require('underscore');

const Receta = require('../models/receta');

const app = express();

app.get('/recetas', (req, res) => {
    Receta.find({ estado: true }).exec((err, recetas) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Receta.count({ estado: true }, (err, count) => {

            res.json({
                ok: true,
                recetas,
                count
            });

        });
    });
});

app.post('/receta', (req, res) => {

    let body = _.pick(req.body, [
        'titulo',
        'tiempo',
        'ingredientes',
        'instrucciones',
        'img',
        'etiquetas',
        'tipo',
        'favorito',
        'consejos',
        'hidratos',
        'vegetales',
        'frutas',
        'proteinas',
        'lipidos',
        'estado'
    ]);

    let receta = new Receta(body);


    receta.save((err, recetaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            receta: recetaDB
        });

    });

});

module.exports = app;