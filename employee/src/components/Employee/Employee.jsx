import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Employee = () => {
    const [employee,setEmployee] = useState([])
    const [status,setStatus] = useState(null)
    const [showDlt,setShowdlt] = useState(false)
    const [dltId,setDltId] = useState(null)
    const [filters,setFilters] = useState([])
    const [clicked,setClicked] = useState(false)
    const [clickedImage,setClickedImage] = useState(null)
    const themed = useSelector(state=>state.theme.mode)
    const [theme,setThemed] = useState(themed)
    const navigate = useNavigate()

    const fetchData = async () => {
        try{
            const response = await fetch(import.meta.env.VITE_URI+'getEmployee')
            const data = await response.json()
            console.log(data.list)
            if(data.status==='success'){
                setStatus(null)
                setEmployee(data.list)
                setFilters(data.list)
                Object.values(data.list).map((e,i)=>(
                    console.log(e.id)
                ))
            }
            else if(data.status==='notsure'){
                setStatus(data.message)
            }
            else if(data.status==='failure'){
                setStatus(data.message)
            }
        }
        catch(err){
            console.log(err)
            setStatus('Something went wrong!')
        }
    }

    const deleteEmployee = async (id) => {
        try{
            const response = await fetch(import.meta.env.VITE_URI+'deleteEmployee',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({emp_id: id})
            })
            const data = await response.json()
            console.log(data)
            if(data.status==='success'){
                setDltId(null)
                setShowdlt(false)
                toast(data.message)
                await fetchData()
            }
            else{
                toast.warn(data.message)
            }
        }
        catch(err){
            console.error(err)
            toast.error('Failed to Delete')
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        setThemed(themed)
    },[themed])

    const filterTable = (query) => {
        console.log(query.length)
        if(query.length===0){
            setEmployee(filters)
            return
        }
        const result = filters.filter((e)=>{
            console.log(e)
            if(e.name.toLowerCase().includes(query.toLowerCase()))
                return e.name
            else if(e.id.toLowerCase().includes(query.toLowerCase()))
                return e.id
            else if(e.designation.toLowerCase().includes(query.toLowerCase()))
                return e.designation
            else if(e.department.toLowerCase().includes(query.toLowerCase()))
                return e.department
            else if(e.type.toLowerCase().includes(query.toLowerCase()))
                return e.type
            else if(e.status.toLowerCase().includes(query.toLowerCase()))
                return e.status
            else if(e.project.toLowerCase().includes(query.toLowerCase()))
                return e.project
        })
        console.log('Result: ',result)
        setEmployee(result)
    }

    return (
        <div className='right-main-2'>
            <div className='employee-1' style={{background:themed === 'dark' && 'black',color:themed === 'dark' && 'whitesmoke'}}>
                <h1>Employee</h1>
                <div className='divider'>
                    <input type='text' placeholder='Search by Anything' onChange={(e)=>filterTable(e.target.value)}/>
                    <button onClick={()=>navigate('/add')}>Add New Employee +</button>
                </div>
            </div>
            <div className={themed==='light'?'employee-2':'employee-2-dark'}>
                {
                employee.length>0 && status===null ?
                <table>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Project</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((el, index) => (
                            <tr key={index}>
                            <td className='named'>
                                {el.dp && 
                                    <img className='special-case' src={`data:image/png;base64,${el.dp}`} alt="Pic" style={{ width: "40px", height: "40px", borderRadius: "50%" }} onClick={()=>{toast('Click Anywhere to close the Image');setClickedImage(el.dp);setClicked(true);}}/>
                                    ||
                                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor:'white', display: 'flex', justifyContent:'center', alignItems:'center'}}>
                                        <i style={{color:'grey'}} className='bx bx-camera'></i>
                                    </div>
                                }
                                <span>{el.name}</span>
                            </td>
                            <td className='normal'>{el.id}</td>
                            <td className='normal'>{el.department}</td>
                            <td className='normal'>{el.designation}</td>
                            <td className='normal'>{el.project}</td>
                            <td className='normal'>{el.type}</td>
                            <td className='normal'>{el.status}</td>
                            <td className={themed==='light'&&'actions'||'actions-dark'}>
                                <span title='View' onClick={() => navigate("/view", { state: el })}><i className='bx bx-eye'></i></span>
                                <span title='Update' onClick={() => navigate("/edit", { state: el })}><i className='bx bx-pencil'></i></span>
                                <span title='Delete' onClick={() => { setShowdlt(true); setDltId(el.id); }}><i className='bx bx-trash'></i></span>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                <span>{status}</span>
                }
            </div>
            {
                showDlt && 
                <Delete id={dltId} deleteEmployee={deleteEmployee} setShowdlt={setShowdlt} setDltId={setDltId}/>
            }
            {clicked && <PicModal image={clickedImage} setClicked={setClicked} setClickedImage={setClickedImage}/>}
            <ToastContainer autoClose={2000} position='top-center'/>
        </div>
    )
}

const Delete = ({id,deleteEmployee,setShowdlt,setDltId}) => {
    return (
        <div className='delete-modal' onClick={()=>{setShowdlt(false);setDltId(null)}}>
            <div className='delete-div' onClick={e=>e.stopPropagation()}>
                <i className='bxs bxs-trash' style={{color: '#ff2976', fontSize:'2rem'}}></i>
                <span style={{marginBlock:'10px'}}>Are you sure to delete?</span>
                <div className='delete-buttons'>
                    <button type='button' style={{backgroundColor:'rgb(0, 102, 255)'}} onClick={()=>{setShowdlt(false);setDltId(null)}}>Cancel</button>
                    <button type='button' style={{backgroundColor:'orangered'}} onClick={()=>deleteEmployee(id)}>Delete</button>
                </div>
            </div>            
        </div>
    )
}

const PicModal = ({image,setClicked,setClickedImage}) => {
    return (
        <div className='delete-modal' onClick={()=>{setClickedImage(null);setClicked(false)}}>
            <img src={`data:image/png;base64,${image}`} onClick={(e)=>e.stopPropagation()} alt='Profile Photo'/>
        </div>
    )
}

export default Employee