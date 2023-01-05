const express = require('express');
const meetingRouter = express.Router();
const db = require('./db');

meetingRouter.get('/', (req, res) => {
    const allMeetings = db.getAllFromDatabase('meetings');
    res.send(allMeetings);
});
meetingRouter.post('/', (req,res)=>{
    const newMeeting = db.createMeeting();
    db.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});
meetingRouter.delete('/', (req, res) =>{
    const isDeleted = db.deleteAllFromDatabase('meetings');
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = meetingRouter;