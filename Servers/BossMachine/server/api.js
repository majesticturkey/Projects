const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const db = require('./db.js');

app.get('/minions/', (req, res, next) => {
    res.send(db.findDataArrayByName(minions));
    next();
});

app.post('/minions/', (req, res, next) => {
    let newMinion = db.createMinion(req.body.id, req.body.name, req.body.title, req.body.weaknesses, req.body.salary);
});

module.exports = apiRouter;
