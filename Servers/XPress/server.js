// Dependencies
const bodyparser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const express = require('express');
const apiRouter = require('./api/api');

// Establish server settings
const app = express();
const PORT = process.env.PORT || 4001;
app.use(bodyparser.json());
app.use(errorHandler());
app.use(morgan('dev'));
app.use(cors());

// Mount API routing
app.use('/api', apiRouter);

// Initialize the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;