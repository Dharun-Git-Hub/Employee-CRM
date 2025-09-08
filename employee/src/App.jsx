import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Employee from './components/Employee/Employee'
import Add from './components/Add/Add'
import View from './components/View/View'
import Edit from './components/Edit/Edit'
import Topbar from './components/Topbar/Topbar'
import Sidebar from './components/Sidebar/Sidebar'
import Messages from './components/Messages/Messages'
import Dashboard from './components/Dashboard/Dashboard'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Private from './components/Private/Private'
import Calendars from './components/Calendar/Calendar'
import Forgot from './components/Forgot/Forgot'
import Guide from './components/Guide/Guide'

const App = () => {
  useEffect(()=>{
    if(localStorage.getItem('theme')===null)
      localStorage.setItem('theme','light')
  },[])

    return (
      <GoogleOAuthProvider clientId="1014320992008-e5dge5u0olirdnjaupe05tos011i994i.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/forgot' element={<Forgot/>}/>
            <Route path='/guide' element={<Guide/>}/>
            <Route element={<Private/>}>
              <Route path='/employee' element={<><Topbar/><Employee/><Sidebar/></>}/>
              <Route path='/add' element={<><Topbar/><Add/><Sidebar/></>}/>
              <Route path='/view' element={<><Topbar/><View/><Sidebar/></>}/>
              <Route path='/edit' element={<><Topbar/><Edit/><Sidebar/></>}/>
              <Route path='/messages' element={<><Topbar/><Messages/><Sidebar/></>}/>
              <Route path='/dashboard' element={<><Topbar/><Dashboard/><Sidebar/></>}/>
              <Route path='/calendar' element={<><Topbar/><Calendars/><Sidebar/></>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    )
}

export default App