import axios from "axios"
import React, { useEffect, useState } from "react"

const Admin = () => {
  const [users, setUsers] = useState("")

  useEffect(() => {
    const getUsers = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        if (response.data) {
          setUsers(response.data)
        }
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [users])

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${id}`
      )
      console.log(response)
    } catch (error) {}
  }
  return (
    <div>
      <div className="admin-container">
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
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
            <tr>
              <td>Vivek</td>
              <td>vivek@gmail.com</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
