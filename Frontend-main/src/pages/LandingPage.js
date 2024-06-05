import React from 'react'
import {ToastContainer} from 'react-toastify'
import Login from '../components/landingPage/login/Login'
import Navbar from '../components/landingPage/Navbar'

export default function LandingPage() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Login />
    </>
  )
}
