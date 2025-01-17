const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({

    codeId: {
        type: String,
        required: true,
    },

    code: {
        type: String,
        required: true,
    },

    codeLanguage: {
        type: String,
        required: true,
    },
});

const Code = mongoose.model('Code', codeSchema);