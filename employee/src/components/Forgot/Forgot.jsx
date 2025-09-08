import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Forgot = () => {
    const [email,setEmail] = useState('')
    const [showOTP,setShowOTP] = useState(false)
    const [newPassword,setNew] = useState('')
    const [otp,setOTP] = useState('')
    const navigate = useNavigate()

    const forgot = async (e) => {
        e.preventDefault()
        if(email.trim()==='' || newPassword.trim()===''){
            toast.warn('Please fill up all the fields!')
            return
        }
        try{
            const response = await axios.post(import.meta.env.VITE_URI+"forgot",{email})
            const data = await response.data
            if(data.status=='success'){
                toast('Email Successfully Sent !')
                setShowOTP(true)
                return
            }
            else{
                toast.warn(data.message)
                return
            }
        }
        catch(err){
            console.log(err)
            toast.error('Something went wrong!')
        }
    }

    const verify = async (e) => {
        e.preventDefault()
        if(otp.trim()===''){
            toast.warn('Please fill up all the fields!')
            return
        }
        try{
            const response = await axios.post(import.meta.env.VITE_URI+'verifyOTP',{email,otp,newPassword})
            const data = await response.data
            console.log(data)
            if(data.status==='success'){
                toast('Password Changed Successfully!')
                navigate('/')
                return
            }
            else{
                toast.error(data.message)
            }
        }
        catch(err){
            console.log(err)
            toast.error('Something went wrong!')
        }
    }

    return (
        <div className='main-body'>
            {!showOTP ? <div className='login-cont'>
                <h1 className='banner'>Forgot Password</h1>
                <form onSubmit={forgot}>
                    <label>Email
                        <input type="email" autoComplete='on' onChange={e=>setEmail(e.target.value)} required/>
                    </label>
                    <label>New Password
                        <input type='password' autoComplete='on' onChange={e=>setNew(e.target.value)} required/>
                    </label>
                    <button type='submit'>Send Code</button>
                </form>
            </div>
            :
            <div className='login-cont'>
                <form onSubmit={verify}>
                    <label>OTP: 
                        <input type='number' onChange={e=>setOTP(e.target.value)} required/>
                    </label>
                    <button type='submit'>Submit Code</button>
                </form>
            </div>
            }
            <ToastContainer position='top-center' autoClose={2000}/>
        </div>
    )
}

export default Forgot