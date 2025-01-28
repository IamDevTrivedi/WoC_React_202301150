const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({

    fileId: {
        type: String,
        required: true,
    },

    fileContent: {
        type: String,
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    fileLanguage: {
        type: String,
        required: true,
    },

    fileName: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;