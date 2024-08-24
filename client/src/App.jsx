import { useState } from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Admin from "./pages/Admin"
import AdminLayout from "./Layouts/AdminLayout"
import UserLayout from "./Layouts/UserLayout"
import PublicLayout from "./Layouts/PublicLayout"
import Manager from "./pages/Manager"
import ManagerLayout from "./Layouts/ManagerLayout"
import SuperAdmin from "./pages/SuperAdmin"
import SuperAdminLayout from "./Layouts/SuperAdminLayout"
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
          </Route>

          <Route path="/SuperAdmin" element={<SuperAdminLayout />}>
            <Route index element={<SuperAdmin />} />
          </Route>

          <Route path="/" element={<PublicLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<Manager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
