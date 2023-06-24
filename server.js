const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./src/dbconfig/config');

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('DB connected');
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(config.server.port, () => console.log('DB is connected on', config.server.port));
