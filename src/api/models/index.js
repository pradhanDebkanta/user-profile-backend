const mongoose = require('mongoose');
const { getDBURL } = require('../../config/dataBase');

mongoose.connect(getDBURL.url)
    .then(res => {
        console.log('DB connected...');
    })
    .catch(err => {
        console.log('DB connection fail', err.message);
    });

module.exports.Users = require('./user');
module.exports.Tokens = require('./user/tokenSchema');
