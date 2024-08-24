import axios from "axios"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { SetUser } from "../redux/AuthSlice"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      )
      localStorage.setItem("token", response.data.token)

      console.log(response)
      if (response.data) {
        if (response.data.role === "Admin") {
          navigate("/admin")
        } else if (response.data.role === "SuperAdmin") {
          navigate("/SuperAdmin")
        } else if (response.data.role === "Normal User") {
          navigate("/")
        } else if (response.data.role === "Manager") {
          navigate("/manager")
        }
        dispatch(SetUser(response.data))
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }
  }

  return (
    <div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name=""
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="passowrd">Password</label>
            <input
              type="password"
              name=""
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <button type="submit">Login</button>
          <p className="register-link">
            Not registered? <Link to={"/register"}>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
