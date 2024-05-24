const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      username: user.username,
      email,
      token,
      firstTime: user.firstTime,
      interestedFields: user.interestedFields ? user.interestedFields : [],
      phone: user.phone ? user.phone : '',
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    const user = await User.signup(username, email, password, true, []);
    console.log('abc', user);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({
      username: user.username,
      email,
      token,
      firstTime: user.firstTime,
      phone: '',
      interestedFields: [],
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateInterestedFields = async (req, res) => {
  const { email, interestedFields } = req.body;
  const filter = { email };
  // const options = { upsert: true };
  const updateDoc = {
    $set: {
      interestedFields,
      firstTime: false,
    },
  };

  const result = await User.updateOne(filter, updateDoc);
  res.send(result);
};

const updateProfile = async (req, res) => {
  const { email, username, interestedFields, phone } = req.body;
  const filter = { email };
  // const options = { upsert: true };
  const updateDoc = {
    $set: {
      interestedFields,
      username,
      phone,
      email,
    },
  };

  const result = await User.updateOne(filter, updateDoc);
  res.send(result);
};

module.exports = {
  signupUser,
  loginUser,
  updateInterestedFields,
  updateProfile,
};
