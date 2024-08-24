import React from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Logout } from "../redux/AuthSlice"

const Home = () => {
  const user = useSelector((state) => state.Auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goTo = () => {
    if (user.role === "Admin") navigate("/admin")
    else if (user.role === "SuperAdmin") navigate("/SuperAdmin")
    else navigate("/manager")
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem("token")
      dispatch(Logout())
      toast.success("Log out Successfully")
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="home-container">
        <div className="user-card">
          <h2>Welcome to the Homepage, {user && user.name}</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          {user &&
          (user.role == "Admin" ||
            user.role === "Manager" ||
            user.role == "SuperAdmin") ? (
            <button className="admin-btn" onClick={goTo}>
              Go To {user.role} Page
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
