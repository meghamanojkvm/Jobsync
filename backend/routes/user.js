const express = require('express');

// controller functions
const {
  loginUser,
  signupUser,
  updateInterestedFields,
  updateProfile,
} = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

router.patch('/update-interested-fields', updateInterestedFields);

router.post('/update-profile', updateProfile);

module.exports = router;
