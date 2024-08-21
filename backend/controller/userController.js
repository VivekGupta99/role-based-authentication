const User = require("../model/user")

const getUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}

const updateUser = async (req, res) => {
  const { id, name, email, role } = req.body
  const user = await User.findById(id)

  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    if (req.user.role === "Admin" && role === "SuperAdmin") {
      return res.json({ message: "You can not grant SuperAdmin role " })
    }
    if (
      req.user.role === "SuperAdmin" ||
      (req.user.role === "Admin" && role !== "SuperAdmin")
    ) {
      user.role = role || user.role
    }

    const updatedUser = await user.save()
    res.json(updatedUser)
  } else {
    res.status(404).json({ message: "User not found" })
  }
}

const deleteUser = async (req, res) => {
  console.log(req.params.id)
  const user = await User.findById(req.params.id)
  console.log(user)
  if (user) {
    await User.deleteOne(user._id)
    res.json({ message: "User removed" })
  } else {
    res.status(404).json({ message: "User not found" })
  }
}

module.exports = { getUsers, updateUser, deleteUser }
