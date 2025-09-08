import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import { loginSuccess } from '../../slices/auth';
import { useNavigate } from 'react-router-dom';

const LoginWithGoogle = ({username}) => {
    const [pic,setPic] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        console.log(credentialResponse)
        try{
            const res = await axios.post(import.meta.env.VITE_URI+'google-login',{token});
            await axios.post(import.meta.env.VITE_URI+'logUser',{details:res?.data,username})
            console.log(res.data);
            const {user} = res.data
            dispatch(loginSuccess({user,token}))
            localStorage.setItem("auth",JSON.stringify({user,token}));
            setPic(res?.data?.user?.picture)
            toast('Verification Successful!')
            console.log('fired...')
            navigate('/employee')
        }
        catch(err){
            console.log(err)
            toast.error('Something went wrong!')
        }
    }

    const CustomCloseButton = ({closeToast}) => {
        return (
            <button onClick={closeToast} style={{color:'black',position:'absolute',top:'0',right:'0',fontSize:'0.8rem',background:'transparent',border:'none'}}>
                x
            </button>
        )
    }

  return (
    <div style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'30px'}}>
      <h2 style={{fontFamily:'Poppins',backgroundImage:'linear-gradient(to right, #ff2976, blue)',backgroundClip:'text',color:'transparent'}}>Login with Google</h2>
      {
        pic !== null &&
            <img style={{width:'200px',height:'200px'}} src={pic} onClick={()=>window.open(pic)}/>
        }
      <GoogleLogin onSuccess={handleSuccess} onError={()=>console.log('Login Failed')}/>
      <ToastContainer position='bottom-left' autoClose={false} toastStyle={{background:'rgba(255,255,255,0.15)',color:'whitesmoke'}} closeButton={<CustomCloseButton/>}/>
    </div>
  );
};

export default LoginWithGoogle;