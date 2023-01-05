const express = require('express');
const app = require('../server');
const meetingRouter = express.Router();
const db = require('./db');

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

module.exports = meetingRouter;