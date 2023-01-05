const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const db = require('./db.js');
const ideaCheck = require('./checkMillionDollarIdea.js');

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

// Ideas APIs
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

//Meetings APIs
app.get('/api/meetings', (req, res) => {
    const allMeetings = db.getAllFromDatabase('meetings');
    res.send(allMeetings);
});
app.post('/api/meetings/', (req,res)=>{
    const newMeeting = db.createMeeting();
    db.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});
app.delete('/api/meetings/', (req, res) =>{
    const isDeleted = db.deleteAllFromDatabase('meetings');
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = apiRouter;
