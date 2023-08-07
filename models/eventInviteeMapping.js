const mongoose = require('mongoose');

const eventInviteeSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // invitee: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Event',
  //   required: true,
  // },
});

const Invitee = mongoose.model('Invitee', eventInviteeSchema);

module.exports = Invitee;
