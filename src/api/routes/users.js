const express = require('express');
const router = express.Router();
const { isValidNewUser, isAuthentication, isValidUserData } = require('../middlewares/users');
const { createNewUser, updateUserProfile } = require('../controllers/users');

// add a file validator middleware
router.post('/create-user', isValidUserData, isValidNewUser, createNewUser);
router.put('/update-profile/:changeItem', isAuthentication, updateUserProfile);

module.exports = router;