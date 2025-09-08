import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

const Dashboard = () => {
    const [employee,setEmployee] = useState(null)
    const [empCount,setEmpCount] = useState(0)
    const [permanent,setPermanent] = useState(0)
    const [hrs,setHR] = useState(0)
    const themed = useSelector(state=>state.theme.mode)
    const [theme,setThemed] = useState(themed)
    const [logs,setLogs] = useState([])
    const [status,setStatus] = useState(null)

    const fetchData = async () => {
        try{
            const response = await fetch(import.meta.env.VITE_URI+'getEmployee')
            const data = await response.json()
            console.log(data.list)
            if(data.status==='success'){
                setEmployee(data.list)
                Object.values(data.list).map((e,i)=>(
                    console.log(e.id)
                ))
            }
            else if(data.status==='notsure'){
                setEmpCount(0)
            }
            else if(data.status==='failure'){
                toast.success(data.message)
            }
        }
        catch(err){
            console.log(err)
            toast.error('Something went wrong!')
        }
        try{
            const response = await axios.get(import.meta.env.VITE_URI+'getLogs')
            const data = await response.data
            if(data.status==='not_sure'){
                setStatus(data.message)
            }
            else if(data.status==='success'){
                setStatus(null)
                setLogs(data.list)
            }
            else{
                toast.error('Something went wrong!')
            }
        }
        catch(err){
            console.log(err)
            toast.error('Something went wrong!')
        }
    }

    const calculate = () => {
        if(employee===null) return
        if(employee.length === 0)
            return
        setEmpCount(employee?.length || 0)
        setPermanent(employee?.filter(e=>e.type==='Permanent').length)
        setHR(employee?.filter(e=>e.designation==='HR Manager').length)
        console.log(employee)
    }

    useEffect(()=>{
         fetchData()
    },[])

    useEffect(()=>{
        calculate()
    },[employee])

    useEffect(()=>{
        setThemed(themed)
    },[themed])

    return (
        <div className='right-main-2' style={{background:themed==='dark'&&'black'}}>
            <div className='main-1'>
                {empCount!==null &&
                    <>
                        <div className='emp-count'>
                            <span className={themed==='light'&&'level'||'level-dark'}></span>
                            <span className='info-span'>{empCount}</span>
                            <span className='info-span-2'>Employees</span>
                        </div>
                        <div className='emp-count'>
                            <span className={themed==='light'&&'level'||'level-dark'}></span>
                            <span className='info-span'>{permanent}</span>
                            <span className='info-span-2'>Permanent</span>
                        </div>
                        <div className='emp-count'>
                            <span className={themed==='light'&&'level'||'level-dark'}></span>
                            <span className='info-span'>{hrs}</span>
                            <span className='info-span-2'>HR Managers</span>
                        </div>
                    </>
                }
            </div>
            <div className='employee-1' style={{margin:'0',background:themed === 'dark' && 'black',color:themed === 'dark' && 'whitesmoke'}}>
                <h1>Employee</h1>
            </div>
            <div style={{marginBottom:'20px'}} className={themed==='light'?'employee-2':'employee-2-dark'}>
                { logs!==null && logs.length>0 && status===null ?
                <table>
                    <thead>
                        <tr>
                            <th>
                                Email
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Checked At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((el, index) => (
                            <tr key={index}>
                            <td className='normal'>{el.gmail}</td>
                            <td className='normal'>{el.name}</td>
                            <td className='normal'>{new Date(el.checked_at).toLocaleDateString()}{" - "}{new Date(el.checked_at).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                <span style={{display:'flex',flexDirection:'column',marginLeft:'20px',fontFamily:'Poppins',color:themed==='light'?'black':'white'}}>{status}!<span>Login to create Logs!</span></span>
                }
            </div>
            <ToastContainer/>
        </div>
    )
}


export default Dashboard
