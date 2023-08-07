const express = require('express');
const app = express();
const router1 = require('../routes/eventRoutes');
const router = require('../routes/userRoutes');

//Router Middlewares
app.use(express.json());

app.use('/api/v1', router);
app.use('/api/v1', router1);

module.exports = app;
