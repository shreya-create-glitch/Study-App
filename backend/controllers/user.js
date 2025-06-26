const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if ( !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hash
    });

    const token = jwt.sign({ email:user.email,_id:user._id }, process.env.SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    
    if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email:user.email ,_id:user._id}, process.env.SECRET, { expiresIn: '7d' });

      
      return res.json({
        user,
        token
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { Signup,login };
