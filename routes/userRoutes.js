const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updatePassword,
} = require('../controllers/userControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update/:id', updatePassword);

module.exports = router;
