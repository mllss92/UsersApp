const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routing = require('./app/routes/index');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routing());

module.exports = app;