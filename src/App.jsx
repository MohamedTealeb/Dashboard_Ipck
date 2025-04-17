import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Shared/Home'
import Login from './Modules/Login/Login'
import Products from './Modules/Products/Products'
import Admin from './Modules/Admin/Admin'
import Users from './Modules/Users/Users'
import Verify from './Modules/Verfiy/Verify'

export default function App() {
  return <>
  <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='home' element={<Home/>} />
    <Route path='products' element={<Products/>} />
    <Route path='admin' element={<Admin/>} />
    <Route path='users' element={<Users/>} />
    <Route path='verify' element={<Verify/>} />
  </Routes>
  </>
}
