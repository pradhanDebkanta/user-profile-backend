const { nameValidator, emailValidate, phoneNoValidator, passwordValidator } = require('../../validators/user');
const { decryptPasword, encryptPassword } = require('../../helpers/users');
const db = require('../../models');

const isValidUserData = function (req, res, next) {
    try {
        const { name, email, phoneNo, password } = req.body;
        if (nameValidator(name) && emailValidate(email) && phoneNoValidator(phoneNo) && password) {

            // this expect a CryptoJS.AES password from frontend or from req else it show error
            // if you want to bypass this encryption then comment this if else block & comment out next()

            let decPassword = decryptPasword(password);
            if (typeof decPassword === 'string' && decPassword.length > 0 && passwordValidator(decPassword)) {
                // console.log('validate');
                req.body.password = decPassword;
                next();
            } else {
                return next({
                    status: 400,
                    message: "invalid password..."
                });
            }
            // if (passwordValidator(password))
            //     next();
            // else
            //     return next({
            //         status: 400,
            //         message: "invalid password.."
            //     });

        } else {
            return next({
                status: 400,
                message: "Invalid argument"
            });
        }

    } catch (err) {
        return next({
            status: 400,
            message: "Invalid argument"
        });
    }
};

// U2FsdGVkX1+6DYAN1vb+phV8Ske8yxsSBxz9yn5a40U=
const isValidNewUser = function async(req, res, next) {
    const { email } = req.body;
    console.log(email, "dfdf");
    next();
}

const isAuthentication = function (req, res, next) {

}

module.exports = {
    isValidUserData,
    isValidNewUser,
    isAuthentication,
}