const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const db = require('./db.js');

app.get('/api/minions', (req, res, next) => {
    const allMinions = db.getAllFromDatabase('minions');
    res.status(200).send(allMinions);
});
app.get('/api/minions/:minionId', (req, res, next) => {
    const minion = db.getFromDatabaseById('minions', req.params.minionId);
    if (minion){
        res.status(200).send(minion);
    } else {
        res.status(404).send();
    }
});

app.post('/api/minions', (req, res, next) => {
    let newMinion = {
        name: req.body.name,
        title: req.body.title,
        salary: req.body.salary,
        weaknesses: req.body.weaknesses
    };
    res.status(201).send(db.addToDatabase('minions', newMinion));
});

app.put('/api/minions/:minionId', (req, res) => {
    const minion = db.updateInstanceInDatabase('minions', req.body);
    if(minion) {
        res.status(200).send(minion);
    } else {
        res.status(404).send();
    }
});

app.delete('/api/minions/:minionId', (req, res) => {
    const isDeleted = db.deleteFromDatabasebyId('minions', req.params.minionId);
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = apiRouter;
