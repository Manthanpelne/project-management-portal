const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { updateUserProfile } = require('../controllers/userController');
const router = express.Router();


// This route requires the user to be logged in 
router.put('/profile', protect, updateUserProfile);

module.exports = router;