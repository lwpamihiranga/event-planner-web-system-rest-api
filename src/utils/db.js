const mongoose = require('mongoose');

exports.connectDatabase = () => {
    mongoose
        .connect('mongodb://localhost:27017/event_planner', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then((result) => {
            console.log('Successfully connected to local MongoDB database');
        })
        .catch((err) => {
            console.log('Error! Failed to connect the local MongoDB database');
        });
};