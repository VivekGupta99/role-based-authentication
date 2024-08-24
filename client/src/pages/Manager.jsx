import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Manager() {
  const user = useSelector((state) => state.Auth.user)
  const [users, setUsers] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const getUsers = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get(
          "https://role-based-authentication-mrf5.onrender.com/api/users/team",
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        if (response.data) {
          const filteredData = response.data.filter(
            (x) => x.email !== user.email
          )
          setUsers(filteredData)
        }
      } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 401) {
          toast.error("Session expired, please log in again")
          navigate("/login")
        }
      }
    }
    getUsers()
  }, [users])

  const goToHome = () => {
    navigate("/")
  }

  return (
    <>
      <div>
        <div className="admin-container">
          <h1>Welcome to the Manager Dashboard, {user.name}</h1>
          <button id="log-out-btn" onClick={goToHome}>
            Go To Home
          </button>

          <h2>Manage Your Team</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Reports</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((elem, index) => {
                  return (
                    <tr key={index}>
                      <td>{elem.name}</td>
                      <td>{elem.email}</td>
                      <td>Will be updated soon...</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Manager
