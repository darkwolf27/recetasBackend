const express = require('express');
const _ = require('underscore');

const Receta = require('../models/receta');

const app = express();

app.put('/menu-semana/eliminar', (req, res) => {


    Receta.where().setOptions({ multi: true }).update({ $set: { menu: false, menuPersona: '' } }, (err, info) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            info
        });

    });

});

app.put('/menu-semana/eliminar/:id', (req, res) => {

    let id = req.params.id;

    Receta.where({ _id: id }).update({ $set: { menu: false, menuPersona: '' } }, (err, info) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            info
        });
    });
});

module.exports = app;