const express = require("express")
const { authenticate, roleCheck } = require("../middleware/auth")
const {
  getUsers,
  updateUser,
  deleteUser,
} = require("../controller/userController")
const router = express.Router()


// admin routes
router
  .route("/")
  .get(authenticate, roleCheck("SuperAdmin", "Admin"), getUsers)
  .put(authenticate, roleCheck("SuperAdmin", "Admin"), updateUser)

router.delete("/:id", authenticate, roleCheck("SuperAdmin"), deleteUser)


module.exports = router
