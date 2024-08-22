const jwt = require("jsonwebtoken")
const User = require("../model/user")

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Access denied" })
  try {
    const user = jwt.verify(token, "secretekey")
    const currUser = await User.findById(user.id)
    req.user = currUser
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}

const roleCheck = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient rights" })
    }
    next()
  }
}

module.exports = { authenticate, roleCheck }
