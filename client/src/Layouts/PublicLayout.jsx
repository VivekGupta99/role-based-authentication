import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

const PublicLayout = () => {
  const user = useSelector((state) => state.Auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (user.role === "SuperAdmin") {
        navigate("/SuperAdmin")
      } 
      else if (user.role === "Admin") {
        navigate("/admin")
      } else if (user.role === "Manager") {
        navigate("/manager")
      } else if (user.role === "Normal User") {
        navigate("/")
      }
    }
  }, [user])
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default PublicLayout
