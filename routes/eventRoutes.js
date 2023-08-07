const express = require('express');
const router = express.Router();
const {
  createEvent,
  inviteUser,
  updateEvent,
} = require('../controllers/eventControllers');

router.post('/event', createEvent);
router.post('/invite', inviteUser);
router.put('/update/:id', updateEvent);

module.exports = router;
