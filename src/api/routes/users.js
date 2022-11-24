const express = require('express');
const router = express.Router();
const { isValidNewUser, isAuthentication, isValidUserData } = require('../middlewares/users');
const { createNewUser, updateUserProfile } = require('../controllers/users');
const uploadImage = require('../middlewares/imageUpload');
const uploadProfileImage = require('../controllers/uploadImage');

// add a file validator middleware
router.post('/create-user', isValidUserData, isValidNewUser, createNewUser);
router.put('/:userId/update-profile/:changeItem', isAuthentication, updateUserProfile);
router.post('/:userId/upload-file', isAuthentication, uploadImage.upload.single('image'), uploadProfileImage)

module.exports = router;