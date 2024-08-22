import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

export default function UserLayout() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.Auth.user)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user])

  return (
    <div>
      <Outlet />
    </div>
  )
}
