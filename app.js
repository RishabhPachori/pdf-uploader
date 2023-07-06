/**
 * @file app.js
 * @summary Create and expose express app instance
 * @description This file is responsible for creating instance of express and initializing swagger. All application specific
 * middleware will be used here.
 * The app instance along with the express router are exposed to be used by HTTP server.
*/
const express = require("express");
const cors = require("cors");
const router = express.Router();
const initiateRoutes = require("./modules");

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json({
    extended: true
}));

app.use(cors());

initiateRoutes(router);

app.use('/api/v1', router);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access", "application/json");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

// For serving files statically from "encrypted" directory
app.use('/encrypted', express.static('encrypted'));

module.exports = {
    app,
    router
};
