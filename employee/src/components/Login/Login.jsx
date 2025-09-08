import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import '../../styles/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import LoginWithGoogle from '../OAuth/LoginWithGoogle'

const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [showGoogle,setShowGoogle] = useState(false)
    const themed = useSelector(state=>state.theme.mode)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const [theme,setThemed] = useState(themed)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/dashboard', { replace: true })
        }
    },[isAuthenticated,navigate])

    const login = async (e) => {
        e.preventDefault()
        if(username.trim() === '' || password.trim() === ''){
            toast.error('Please Fill all the Credentials !')
            return
        }
        try{
            const response = await fetch(import.meta.env.VITE_URI+'login',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username,password})
            })
            const data = await response.json()
            console.log(data)
            if(data.status==='success'){
                toast(data.message)
                setShowGoogle(true)
                return
            }
            else 
                toast.error(data.message)
        }
        catch(err){
            toast.error('Something went wrong!')
            console.log(err)
        }
    }

    useEffect(()=>{
        setThemed(themed)
    },[theme])

    return (
        <div className={themed === 'light' ? 'main-body' : 'main-body-dark'}>
            {
            !showGoogle ?
                <div className='login-cont'>
                    <h1 className='banner'>Login</h1>
                    <button onClick={()=>navigate('/guide')} className='formal-button'>Go To Guide ?</button>
                    <form onSubmit={login}>
                        <label>Email
                            <input type="email" autoComplete='on' onChange={e=>setUsername(e.target.value)} required/>
                        </label>
                        <label>Password
                            <input type="password" autoComplete='on' onChange={e=>setPassword(e.target.value)} required/>
                        </label>
                        <button type='submit'>Login</button>
                    </form>
                    <button className='formal-button' onClick={()=>navigate('/signup')}>Signup</button>
                    <a style={{fontSize:'14px',marginTop:'10px',fontFamily:'Poppins',cursor:'pointer'}} onClick={()=>navigate('/forgot')}>Forgot Password ?</a>
                </div>
                :
                <LoginWithGoogle username={username}/>
            }
            <ToastContainer position='top-center' autoClose={2000}/>
        </div>
    )
}

export default Login