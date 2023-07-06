/**
 * @file users.js
 * @summary Defines user schema
 * */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    pdfs: [
        {
            fileId: { type: String },
            filename: { type: String },
            password: { type: String }
        }
    ]
});

module.exports = {
    Users: mongoose.model("Users", userSchema)
};
