import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

function SuperAdminLayout() {
  const user = useSelector((state) => state.Auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role !== "SuperAdmin") {
      navigate("/login")
    }
  }, [user])

  return (
    <>
      <Outlet />
    </>
  )
}

export default SuperAdminLayout
