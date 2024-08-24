import axios from "axios"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"

const Admin = () => {
  const user = useSelector((state) => state.Auth.user)
  const navigate = useNavigate()
  const [users, setUsers] = useState("")
  const [editingRole, setEditingRole] = useState(null)
  const [newRole, setNewRole] = useState("")
  const [editingTeam, setEditingTeam] = useState(null)
  const [newTeam, setNewTeam] = useState("")

  useEffect(() => {
    const getUsers = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get(
          "https://role-based-authentication-mrf5.onrender.com/api/users",
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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.delete(
        `https://role-based-authentication-mrf5.onrender.com/api/users/${id}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      toast.success("User deleted successfully")
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 401) {
        toast.error("Session expired, please log in again")
        navigate("/login")
      } else {
        toast.error(error.response.data.message)
      }
    }
  }

  const handleRoleChange = async (id, role) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(
        `https://role-based-authentication-mrf5.onrender.com/api/users`,
        { id, role },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      console.log(response.data)
      if (response.data.message === "You can not grant SuperAdmin role") {
        toast.error(response.data.message)
      } else {
        toast.success(response.data.message)
      }
      setEditingRole(null)
    } catch (error) {
      console.log(error)
      toast.error("Failed to update role")
    }
  }

  const handleTeamChange = async (id, team) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(
        `https://role-based-authentication-mrf5.onrender.com/api/users`,
        { id, team },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      console.log(response.data)
      if (response.data.message == "You can not assign team to SuperAdmin") {
        toast.error(response.data.message)
      } else {
        toast.success("Team updated successfully")
      }
      setEditingTeam(null)
    } catch (error) {
      console.log(error)
      toast.error("Failed to update team")
    }
  }

  const goToHome = () => {
    navigate("/")
  }
  return (
    <div>
      <div className="admin-container">
        <h1>Welcome to the Admin Dashboard, {user.name}</h1>
        <button id="log-out-btn" onClick={goToHome}>
          Go To Home
        </button>
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Team</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td>{elem.name}</td>
                    <td>{elem.email}</td>
                    <td>
                      {editingRole === elem._id ? (
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          onBlur={() => handleRoleChange(elem._id, newRole)}
                        >
                          <option value="SuperAdmin">SuperAdmin</option>
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Normal User">Normal User</option>
                        </select>
                      ) : (
                        <>
                          {elem.role}
                          <FontAwesomeIcon
                            icon={faEdit}
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                            onClick={() => {
                              setEditingRole(elem._id)
                              setNewRole(elem.role)
                            }}
                          />
                        </>
                      )}
                    </td>
                    <td>
                      {editingTeam === elem._id ? (
                        <input
                          type="text"
                          value={newTeam}
                          onChange={(e) => setNewTeam(e.target.value)}
                          onBlur={() => handleTeamChange(elem._id, newTeam)}
                          style={{ width: "100px", padding: "2px" }}
                        />
                      ) : (
                        <>
                          {elem.team}
                          <FontAwesomeIcon
                            icon={faEdit}
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                            onClick={() => {
                              setEditingTeam(elem._id)
                              setNewTeam(elem.team)
                            }}
                          />
                        </>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleDelete(elem._id)
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
