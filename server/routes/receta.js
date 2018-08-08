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

app.get('/receta/:id', (req, res) => {

    let id = req.params.id;

    Receta.findById(id).exec((err, recetaDB) => {
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

app.put('/receta/:id', (req, res) => {

    let id = req.params.id;

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

    Receta.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, recetaActualizada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            receta: recetaActualizada
        });

    });

});

app.delete('/receta/:id', (req, res) => {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Receta.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, recetaEliminada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            receta: recetaEliminada
        });

    });

});

app.put('/receta/:id/:megusta', (req, res) => {

    let id = req.params.id;
    let megusta = req.params.megusta;

    let cambioFavorito = {
        favorito: megusta
    };

    Receta.findByIdAndUpdate(id, cambioFavorito, { new: true }, (err, recetaActualizada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            receta: recetaActualizada
        });

    });

});

app.put('/receta/:id/:menu/:persona', (req, res) => {

    let id = req.params.id;

    let cambioMenu = {
        menu: req.params.menu,
        menuPersona: req.params.persona
    };

    Receta.findByIdAndUpdate(id, cambioMenu, { new: true }, (err, recetaActualizada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            receta: recetaActualizada
        });

    });

});

/* app.get('/receta-search', (req, res) => {

    let busqueda = req.query.busqueda;

    Receta.find({ estado: true, titulo: { $regex: '.*' + busqueda + '.*', $options: 'i' } }).exec((err, recetas) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            recetas
        });
    });
});
 */
module.exports = app;