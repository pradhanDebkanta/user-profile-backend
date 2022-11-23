const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
    jwt: {
        type: String,
        require: [true, 'jwt token required.']
    }
}, {
    expireAfterSeconds: 30
});

module.exports = mongoose.model('Tokens', tokenSchema);