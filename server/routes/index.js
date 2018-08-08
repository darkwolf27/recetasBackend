const express = require('express');

const app = express();

app.use(require('./receta'));
app.use(require('./menu-semana'));


module.exports = app;