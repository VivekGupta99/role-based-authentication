const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "Admin", "Manager", "Normal User"],
      default: "Normal User",
    },
    team: { type: String, default: "default" }, 
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

module.exports = mongoose.model("User", userSchema)
