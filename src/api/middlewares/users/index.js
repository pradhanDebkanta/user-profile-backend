const db = require('../../models');
const { nameValidator, emailValidate, phoneNoValidator, passwordValidator } = require('../../validators/user');
const { decryptPasword, encryptPassword, } = require('../../helpers/users');
const getAuthToken = require('../../helpers/users/extractToken');
const jwtDecode = require('../../helpers/users/jwtDecode');

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
const isValidNewUser = async function (req, res, next) {
    try {
        const { email } = req.body;
        if (email) {
            let isExistUser = await db.Users.findOne({ email });
            if (isExistUser) {
                return next({
                    status: 403,
                    message: 'User email is already exist..'
                })
            } else {
                next();
            }

        } else {
            return next({
                status: 400,
                message: 'email must be required..'
            })
        }
    } catch (err) {
        return next({
            message: err.message
        })
    }
}

const isAuthentication = async function (req, res, next) {
    try {
        const { userId } = req.params;
        let token = getAuthToken(req);

        if (token && userId) {
            let isTokenExist = await db.Tokens.findOne({ jwt: token });
            if (isTokenExist) {
                let decode = jwtDecode(token);
                // console.log(decode, "deocded")
                if (decode?.email !== userId) {
                    return next({
                        status: 403,
                        message: 'token email does not matched with userId..'
                    })
                }
                if (typeof decode === 'object') {
                    let result = await db.Users.findById(decode.id);
                    if (result) {
                        next();

                    } else {
                        return next({
                            status: 403,
                            message: 'invalid user...'
                        })
                    }
                } else {
                    return next({
                        status: 403,
                        message: 'jwt token expired..'
                    })
                }

            } else {
                return next({
                    status: 403,
                    message: 'unAuthorized token'
                })
            }
        } else {
            return next({
                status: 403,
                message: 'auth token is required..'
            })
        }
    } catch (err) {
        return next({
            message: err.message
        })
    }
}

module.exports = {
    isValidUserData,
    isValidNewUser,
    isAuthentication,
}