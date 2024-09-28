const express = require('express');
const cors = require('cors');
const personRoutes = require('./routes/person.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/people', personRoutes);

module.exports = app;