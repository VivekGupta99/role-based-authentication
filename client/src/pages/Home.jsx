import React from "react"
import { useSelector } from "react-redux"

const Home = () => {
  const user = useSelector((state) => state.Auth.user)
  console.log(user)
  return (
    <div>
      <div className="home-container">
        <div className="user-card">
          <h2>Welcome, {user && user.name}</h2>
          <button className="logout-btn">Logout</button>
          <button className="admin-btn"> Go To Admin</button>
        </div>
      </div>
    </div>
  )
}

export default Home
