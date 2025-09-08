import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Signup = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const signup = async (e) => {
        e.preventDefault();
        if(username.trim() === '' || password.trim() === ''){
            toast.warn('Please Fill all the Credentials !')
            return
        }
        try{
            const response = await fetch(import.meta.env.VITE_URI+'signup',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username,password})
            })
            const data = await response.json()
            if(data.status==='success'){
                toast(data.message)
                navigate('/employee')
                return
            }
            else
                toast.error(data.message)
        }
        catch(err){
            console.log(err)
            toast.error('Something went wrong!')
        }
    }
    return (
        <div className='main-body'>
            <div className='login-cont'>
                <h1 className='banner'>Sign up</h1>
                <form onSubmit={signup}>
                    <label>Email: 
                        <input type="email" onChange={e=>setUsername(e.target.value)} required/>
                    </label>
                    <label>
                        Password: 
                        <input type="password" onChange={e=>setPassword(e.target.value)} required/>
                    </label>
                    <button type="submit">Signup</button>
                </form>
            </div>
            <ToastContainer position='top-center' autoClose={2000}/>
        </div>
    )
}

export default Signup