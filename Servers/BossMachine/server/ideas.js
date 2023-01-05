const ideaCheck = require('./checkMillionDollarIdea.js');
const express = require('express');
const app = require('../server');
const ideaRouter = express.Router();
const db = require('./db.js');

app.get('/api/ideas', (req, res) =>{
    const allIdeas = db.getAllFromDatabase('ideas');
    res.status(200).send(allIdeas);
});
app.get('/api/ideas/:ideaId', (req, res) => {
    const idea = db.getFromDatabaseById('ideas',req.params.ideaId);
    if(idea){
        res.status(200).send(idea);
    } else {
        res.status(404).send();
    }
});
app.put('/api/ideas/:ideaId', (req, res) =>{
    const idea = db.updateInstanceInDatabase('ideas', req.body);
    if(idea) {
        res.status(200).send(idea);
    } else {
        res.status(404).send();
    }
});

app.post('/api/ideas/', ideaCheck, (req, res, next) => {
    const newIdea = {
        name: req.body.name,
        description: req.body.description,
        weeklyRevenue: req.body.weeklyRevenue,
        numWeeks: req.body.numWeeks
    }
    res.status(201).send(db.addToDatabase('ideas', newIdea));
});
app.delete('/api/ideas/:ideaId', (req, res) => {
    const isDeleted = db.deleteFromDatabasebyId('ideas',req.params.ideaId);
    if(isDeleted){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = ideaRouter;