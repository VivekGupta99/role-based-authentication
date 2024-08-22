import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { toast } from "react-hot-toast"


const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      })
            toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }
  }

  return (
    <div>
      <div className="register-container">
        <h2>Register</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              name=""
              id="name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name=""
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id="password"
            />
          </div>
          <button type="submit">Register</button>
          <p className="register-link">
            Already have an account? <Link to={"/login"}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
