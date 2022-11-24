const db = require('../../models');
const { uploadFile } = require('../../helpers/imageUpload');


const uploadProfileImage = async function (req, res, next) {
    try {
        const { userId } = req.params;
        if (!req?.file) {
            return next({
                status: 403,
                message: 'file must be defined..'
            })
        }
        const user = await db.Users.findOne({ email: userId });
        let dataObj = {
            name: user?.name,
            email: user?.email,
            phoneNo: user?.phoneNo
        };
        if (user) {
            // console.log('file', req.file);
            let urlObj = await uploadFile(req?.file);
            if (urlObj) {
                // console.log(urlObj, 'coudinary img url');
                dataObj.profileImgUrl = urlObj?.dataurl;
                dataObj.profileImgId = urlObj?.dataid;
                user.profileImgUrl = urlObj.dataurl;
                user.profileImgId = urlObj.dataid;
                let result = await user.save();
                res.json(dataObj);
            } else {
                return next({
                    message: "file can't be uploaded on server.."
                })
            }
        } else {
            return next({
                status: 403,
                message: 'userId not exist...'
            })
        }
    } catch (err) {
        return next({
            message: err.message
        })
    }

};

module.exports = uploadProfileImage;