const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()
// userVerification


// create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// signup
const signupUser = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;

    if (!email || !password || !name || !number) {
      throw Error("All fields must be field");
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      throw Error("Email is not valid");
    }
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$/.test(password)) {
      throw Error("Password is not strong enough");
    }

    const exist = await User.findOne({ name });
    if (exist) {
      throw Error("Name already in use");
    }
    const exists = await User.findOne({ email });
    if (exists) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(7);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hash,
      number,
      verified: false,
    });

    //create a token
    const token = createToken(user._id);

    const newUser = await user.save();
   
    if (!newUser) {
      res.status(401).json("Sorry, there was an error during registration");
    }

    res.status(200).json({ name, email, token });
  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw Error("All fields must be field");
    }
    const user = await User.findOne({ email });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
