const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_TOKEN;

const jwtDecode = token => {
    try {
        let decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        return err.message;
    }
}

module.exports = jwtDecode;