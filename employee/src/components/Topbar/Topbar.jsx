import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { setTheme } from '../../slices/theme'
import { logOut } from '../../slices/auth'

const Topbar = () => {
    const [settings,showSettings] = useState(false)
    const [image,setImage] = useState(null)
    const [showprofile,setShowProfile] = useState(false)
    const themed = useSelector(state=>state.theme.mode)
    const [theme,setThemed] = useState(themed)
    const navigate = useNavigate()

    const getDetails = async() => {
        try{
            const response = await fetch(import.meta.env.VITE_URI+'getAdmin')
            const data = await response.json()
            console.log(data)
            if(data.status==='success')
                setImage(data.links)
            else
                toast.warn(data.message)
        }
        catch(err){
            console.log(err)
            toast.error('Something went wrong!')
        }
    }

    useEffect(()=>{
        getDetails()
    },[])

    useEffect(()=>{
        setThemed(themed)
    },[theme])

    return (
        <div className={themed === 'light' ? 'right-main' : 'right-main-dark'}>
            <button title='Settings' onClick={()=>showSettings(prev=>!prev)}><i className='bx bx-cog'></i></button>
            {settings && <Settings showSettings={showSettings} logOut={logOut}/>}
            <button onClick={()=>navigate('/messages')} title='Messages'><i className='bx bx-bell'></i></button>
            {image && <img title='Profile' src={image} alt='profile' onClick={()=>setShowProfile(prev=>!prev)}/>}
            {showprofile && image!==null && <Profile image={image}/>}
            <ToastContainer autoClose={2000}/>
        </div>
    )
}

const Settings = ({showSettings,logOut}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const curr_theme = useSelector((state)=>state.theme.mode)

    const logout = () => {
        const opt = confirm('Are you sure to logout?')
        if(!opt)
            return
        console.log('Logging out...')
        showSettings(false)
        dispatch(logOut())
        navigate('/')
    }

    return (
        <div className='settings-div'>
            <div className='settings-list'>
                <button onClick={()=>{dispatch(setTheme());showSettings(false);}}>{(curr_theme.toUpperCase()==='DARK'?'LIGHT':"DARK") || null}{"  "}{curr_theme && <i style={{marginLeft:'10px'}} className={curr_theme==='light'?'bxs bxs-moon':'bxs bxs-sun'}></i>}</button>
                <button onClick={logout}>Logout <i style={{marginLeft:'10px'}} className='bx bx-power-off'></i></button>
            </div>
        </div>
    )
}

const Profile = ({image}) => {
    return (
        <div className='settings-div-2'>
            <img src={image} alt='Profile'/>
            <span>{localStorage.getItem('user') || 'Admin'}</span>
        </div>
    )
}

export default Topbar