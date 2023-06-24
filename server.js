const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./src/routes/User');
const restaurantRouter = require('./src/routes/Restaurant');

require('./src/dbconfig/config');

//allow all origins
app.use(cors());

//express middleware to parse all data to json
app.use(express.json());
app.use(userRouter);
app.use(restaurantRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my restaurant API');
});

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('DB connected');
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(config.server.port, () => console.log('DB is connected on', config.server.port));
