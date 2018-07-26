const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let tiposValidos = {
    values: ['Comida', 'Cena', 'Postre'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let recetaSchema = new Schema({
    titulo: {
        type: String,
        unique: true,
        required: [true, 'El título es necesario']
    },
    tiempo: {
        type: Number,
        required: [true, 'El tiempo es necesario']
    },
    ingredientes: {
        type: Array,
        required: [true, 'Los ingredientes son necesarios']
    },
    instrucciones: {
        type: String,
        required: [true, 'Las instrucciones son necsarias']
    },
    img: {
        type: String,
        required: false
    },
    etiquetas: {
        type: Array,
        required: false
    },
    tipo: {
        type: String,
        required: [true, 'El tipo de plato es necesario'],
        enum: tiposValidos
    },
    favorito: {
        type: Boolean,
        default: false
    },
    fechaSubida: {
        type: Date,
        default: new Date()
    },
    consejos: {
        type: String,
        required: false
    },
    hidratos: {
        type: Number,
        required: false
    },
    vegetales: {
        type: Number,
        required: false
    },
    frutas: {
        type: Number,
        required: false
    },
    proteinas: {
        type: Number,
        required: false
    },
    lipidos: {
        type: Number,
        required: false
    }
});

recetaSchema.plugin(uniqueValidator, { message: 'El {PATH} debe de ser único' });

module.exports = mongoose.model('Receta', recetaSchema);