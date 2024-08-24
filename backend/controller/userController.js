const User = require("../model/user")

const getUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}

const updateUser = async (req, res) => {
  const { id, role, team } = req.body
  const user = await User.findById(id)

  try {
    if (user) {
      if (req.user.role === "Admin" && role === "SuperAdmin") {
        return res.json({ message: "You can not grant SuperAdmin role" })
      }
      if (req.user.role == "Admin" && user.role === "SuperAdmin") {
        return res.json({
          message: "You can not assign team to SuperAdmin",
        })
      }
      if (
        req.user.role === "SuperAdmin" ||
        (req.user.role === "Admin" && role !== "SuperAdmin")
      ) {
        user.team = team || user.team
        user.role = role || user.role
      }

      const updatedUser = await user.save()
      res.json({ message: "Role updated successfully" })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    res.json({ message: "Internal server error" })
    console.log(error)
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
// Manager: Get team members
const getTeamMembers = async (req, res) => {
  const team = req.user.team
  const teamMembers = await User.find({ team })
  res.json(teamMembers)
}

// Manager: Update a team member
const updateTeamMember = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user && user.team === req.user.team) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    const updatedUser = await user.save()
    res.json(updatedUser)
  } else {
    res.status(404).json({ message: "User not found or not part of your team" })
  }
}

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getTeamMembers,
  updateTeamMember,
}
