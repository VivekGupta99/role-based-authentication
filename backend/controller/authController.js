const User = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, "secretekey", {
    expiresIn: "1h",
  })
}

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    const user = await User.find({ email })
    if (user.length) {
      return res.json({ message: "user already exists" })
    }
    const newUser = new User({ name, email, password, role })
    await User.create(newUser)
    res.status(201).json({ message: "User registered successfully" })
  } catch (err) {
    res.status(400).json({ message: "User registration failed" })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    })
  } else {
    res.status(401).json({ message: "Invalid email or password" })
  }
}

module.exports = { registerUser, loginUser }
