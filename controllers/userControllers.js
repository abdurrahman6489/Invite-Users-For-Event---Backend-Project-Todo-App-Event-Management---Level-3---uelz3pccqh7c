const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//Registering user into database
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmpassword: confirmpassword,
    });
    delete newUser.confirmpassword; // remove it before saving
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
//Checking if the user exists
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //Generating Token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ message: 'Successful login', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const email = req.body.email;
    if (user.email !== email) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const updatedPassword = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPass },
      { new: true }
    );
    res.status(200).json(updatedPassword);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { registerUser, loginUser, updatePassword };
