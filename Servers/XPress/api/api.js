const express = require('express');
const app = express();

// Router imports
const artistRouter = require('./artists.js');

// Router mounts
app.use('/artists', artistRouter);

module.exports = app;