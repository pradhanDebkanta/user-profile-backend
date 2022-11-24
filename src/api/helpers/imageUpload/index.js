const cloudinary = require('../../../config/cloudinary');
const sharp = require("sharp");
const sizeOf = require("image-size");

const maxSize = 2 * 1024 * 1024;

const uploadFile = async function (file) {
    try {
        let imgObj = {};
        if (file.size <= maxSize) {
            let result = await upload_get_url(file.path);
            imgObj.dataurl = result.secure_url;
            imgObj.dataid = result.public_id;

        } else {
            console.log('file size is too large')
        }
        return imgObj;
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}

// UPLOAD IMAGE TO CLOUDINARY.COM SENDING OBJECT..
const upload_get_url = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(image, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        });
    });
}


module.exports = {
    uploadFile,
}