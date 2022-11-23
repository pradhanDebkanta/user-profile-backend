const CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');
const secretKey = process.env.CRYPTO_SECRET_KEY;
const saltRounds = 10;

const encryptPassword = (password) => {
    try {
        const ciphertext = CryptoJS.AES.encrypt(password, secretKey).toString();
        return ciphertext;
    } catch (err) {
        return err.message;
    }
};

const decryptPasword = password => {
    try {
        const bytes = CryptoJS.AES.decrypt(password, secretKey);
        const decPassword = bytes.toString(CryptoJS.enc.Utf8);
        return decPassword;
    } catch (err) {
        return err.message;
    }
};

const hashingPassword = async password => {
    try {
        let hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        return err.message;
    }
}

const decodePassword = async (hashPassword, plainText) => {
    try {
        let result = await bcrypt.compare(plainText, hashPassword);
        return result;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    encryptPassword,
    decryptPasword,
    hashingPassword,
    decodePassword,
}