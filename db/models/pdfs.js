/**
 * @file pdfs.js
 * @summary Defines pdfs schema
 * */

const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    fileId: { type: String },
    filename: { type: String },
    data: { type: Buffer },
    password: { type: String }
});

module.exports = {
    Pdfs: mongoose.model("Pdfs", pdfSchema)
};
