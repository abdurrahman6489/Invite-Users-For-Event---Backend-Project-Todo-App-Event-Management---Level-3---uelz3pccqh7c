const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const User = require('../models/userModel');
const Invitee = require('../models/eventInviteeMapping');
const jwt = require('jsonwebtoken');

//Creating a new Event
const createEvent = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { name, date } = req.body;
    const event = new Event({
      name,
      creator: decoded._id,
      date,
    });
    await event.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const inviteUser = async (req, res) => {
  try {
    //Write your code here for inviting users to a event and storing it to DB,
    //Kindly refer to eventInviteeMapping.js in models. As we are storing this data into different table
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body;
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const updateEvent = await Event.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          date,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = { createEvent, updateEvent, inviteUser };
