const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
    jwt: {
        type: String,
        require: [true, 'jwt token required.'],
        // tags: { type: [String], index: true },
        unique: true
    }
}, {
    expireAfterSeconds: 3600 * 24 * 7
});

module.exports = mongoose.model('Tokens', tokenSchema);