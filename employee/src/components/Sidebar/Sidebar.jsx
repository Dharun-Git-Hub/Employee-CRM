import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [clicked,setClicked] = useState(location.pathname.substring(1))
    const themed = useSelector(state=>state.theme.mode)
    const [theme,setThemed] = useState(themed)

    useEffect(()=>{
        const path = location.pathname.substring(1)
        if(['dashboard','employee','messages','calendar'].includes(path)){
            setClicked(path)
            return
        }
        else{
            console.log('Other')
        }
    },[location])

    useEffect(()=>{
        setThemed(themed)
    },[themed])

    return (
        <div className='sidebar-cont' style={{background:themed === 'dark' && 'black', color: themed==='dark'&&'white'}}>
            <div className={theme === 'light' ? 'sidebar-head' : 'sidebar-head-dark'}>
                <h1>RS - TECH</h1>
            </div>
            <div className='sidebar-body'>
                <div style={{marginTop:'5vh'}} className={clicked==='dashboard'?'side-button-clicked':'side-button'} onClick={()=>{navigate('/dashboard');}}>
                    <i className='bx bx-dashboard'></i><span>Dashboard</span>
                </div>
                <div className={clicked==='employee'?'side-button-clicked':'side-button'} onClick={()=>{navigate('/employee')}}>
                    <i className='bx bx-user'></i><span>Employee</span>
                </div>
                <div className={clicked==='calendar'?'side-button-clicked':'side-button'} onClick={()=>{navigate('/calendar')}}>
                    <i className='bx bx-calendar'></i><span>Calendar</span>
                </div>
                <div className={clicked==='messages'?'side-button-clicked':'side-button'} onClick={()=>{navigate('/messages')}}>
                    <i className='bx bx-message'></i><span>Messages</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar