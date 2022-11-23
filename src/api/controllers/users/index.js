const db = require('../../models');
const jwt = require('jsonwebtoken');
const { hashingPassword, decodePassword, } = require('../../helpers/users');

const createNewUser = async (req, res, next) => {
    try {
        const { name, email, phoneNo, password } = req.body;
        console.log(password, 'password')
        let hashPassword = await hashingPassword(password);
        // console.log('hash', hashPassword)

        const user = new db.Users({
            name, email, phoneNo,
            password: hashPassword
        });
        user.save((err, result) => {
            if (err) {
                return next({
                    message: 'somthings wrong..'
                })
            }
            // console.log(result);
            let dataObj = {
                email,
                id: result._id,
            };
            let token = jwt.sign(dataObj, process.env.JWT_SECRET_TOKEN, { expiresIn: "7d" });
            return res.json({
                name, email, phoneNo, token
            })
        });

    } catch (err) {
        return next({
            message: err.message
        })
    }
};

const updateUserProfile = async (req, res, next) => {

}

module.exports = {
    createNewUser,
    updateUserProfile
}