import { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useSelector } from 'react-redux'

const Messages = () => {
    const themed = useSelector(state=>state.theme.mode)
    const [theme,setThemed] = useState(themed)

    useEffect(()=>{
        setThemed(themed)
    },[themed])

    return (
        <div className='under-div' style={{position:'fixed',left:'20vw',top:'15vh',height:"80vh",width:'80vw',padding:'20px',cursor:'pointer',background:theme==='dark'?'black':'white',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img src={assets.under} style={{width:'300px',height:'300px'}} alt='Under Construction'/>
        </div>
    )
}

export default Messages