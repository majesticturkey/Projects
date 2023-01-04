const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const db = require('./db.js');

app.get('/minions/', (req, res, next) => {
    res.send(db.findDataArrayByName(minions));
    next();
});

module.exports = apiRouter;
