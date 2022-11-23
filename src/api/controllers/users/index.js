const db = require('../../models');
const jwt = require('jsonwebtoken');
const { hashingPassword, decodePassword, decryptPasword } = require('../../helpers/users');
const { phoneNoValidator, nameValidator, passwordValidator } = require('../../validators/user');

const createNewUser = async (req, res, next) => {
    try {
        const { name, email, phoneNo, password } = req.body;
        // console.log(password, 'password')
        let hashPassword = await hashingPassword(password);
        // console.log('hash', hashPassword)

        const user = new db.Users({
            name, email, phoneNo,
            password: hashPassword
        });
        let result = await user.save();
        let dataObj = {
            email,
            id: result._id,
        };
        let token = jwt.sign(dataObj, process.env.JWT_SECRET_TOKEN, { expiresIn: '60' });

        let jwtToken = new db.Tokens({
            jwt: token
        });
        let tokenRes = await jwtToken.save();
        console.log(tokenRes, 'token res')

        return res.json({
            name, email, phoneNo, token
        })
    } catch (err) {
        return next({
            message: err.message
        })
    }
};

const updateUserProfile = async (err, req, res, next) => {
    try {
        const { changeItem } = req.params;
        const data = req.body;
        // console.log(changeItem, "change item")
        const users = err.result;
        let dataObj = {
            name: users?.name,
            email: users?.email,
            phoneNo: users?.phoneNo
        };

        if (changeItem === 'phoneNo' && data?.phoneNo && phoneNoValidator(data?.phoneNo)) {
            users.phoneNo = data?.phoneNo;
            let result = await users.save();
            dataObj.phoneNo = result?.phoneNo;
        } else if (changeItem === "name" && data?.name && nameValidator(data?.name)) {
            users.name = data?.name;
            let result = await users.save();
            dataObj.name = result?.name;
        } else if (changeItem === "password" && data?.password) {
            // this expect a CryptoJS.AES password from frontend or from req else it show error
            // if you want to bypass this encryption then comment this if else block & comment out bellow box

            let decPassword = decryptPasword(data?.password);
            if (typeof decPassword === 'string' && decPassword.length > 0 && passwordValidator(decPassword)) {
                let hashPassword = await hashingPassword(data?.password);
                users.password = hashPassword;
                let result = await users.save();
            } else {
                return next({
                    status: 400,
                    message: "invalid password..."
                });
            }

            // comment out this to bypass crypto password from frontend
            /*
            if (passwordValidator(data?.password)) {
                let hashPassword = await hashingPassword(data?.password);
                users.password = hashPassword;
                let result = await users.save();

            } else {
                return next({
                    status: 400,
                    message: "invalid password..."
                });
            }
            */

        } else if (changeItem === "all" && data?.name && data?.phoneNo) {
            users.phoneNo = data?.phoneNo;
            users.name = data?.name;
            let result = await users.save();
            dataObj.name = result?.name;
            dataObj.phoneNo = result?.phoneNo;
        } else {
            return next({
                status: 403,
                message: `invalid ${changeItem} or ${changeItem} can't be change..`
            })
        }

        return res.json(dataObj);
    } catch (err) {
        return next({
            message: err.message
        })
    }
}

module.exports = {
    createNewUser,
    updateUserProfile
}