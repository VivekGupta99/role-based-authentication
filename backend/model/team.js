const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to Manager
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // References to team members
})

module.exports = mongoose.model("Team", TeamSchema)
