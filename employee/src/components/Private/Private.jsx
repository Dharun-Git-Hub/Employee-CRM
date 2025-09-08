import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
    
    return isAuthenticated ? <Outlet/> : <Navigate to="/"/>
}

export default Private