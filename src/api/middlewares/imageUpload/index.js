const multer = require("multer");
const uniqid = require('uniqid');

const maxSize = 2 * 1024 * 1024;

let uploadImage = {};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const randomID = uniqid();
        file.fieldname = `DK${Date.now()}${randomID}${file.originalname}`;
        cb(null, file.fieldname);
    }
});

const imageFilter = function (req, file, cb) {

    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }

    cb(null, true);
};

//for image upolads
uploadImage.upload = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: maxSize } });

module.exports = uploadImage;
