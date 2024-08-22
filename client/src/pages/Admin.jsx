import axios from "axios"
import React, { useEffect } from "react"

const Admin = () => {
  useEffect(() => {
    const getUsers = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])
  return <div>admin</div>
}

export default Admin
