import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Add = () => {
    const [name,setName] = useState('')
    const [id,setId] = useState('')
    const [department,setDepartment] = useState('')
    const [designation,setDesignation] = useState('')
    const [project,setProject] = useState('')
    const [type,setType] = useState('')
    const [status,setStatus] = useState('')
    const [cancelling,setCancelling] = useState(false)
    const [image,setImage] = useState(null)
    const themed = useSelector(state=>state.theme.mode)
    const [theme,setThemed] = useState(themed)
    const fileRef = useRef()
    const navigate = useNavigate()

    const addEmployee = async(e) => {
        e.preventDefault();
        try{
            if(name.trim()==='' || id.trim()==='' || type.trim() === '' || department.trim()==='' || designation.trim()==='' || status.trim()===''){
                toast.warn('Please Fill up all the needed fields!');
                return
            }
            const formData = new FormData()
            formData.append('name',name)
            formData.append('id',id)
            formData.append('department',department)
            formData.append('designation',designation)
            formData.append('type',type)
            formData.append('status',status)
            formData.append('project',project)
            formData.append('file',image)
            const result = await fetch(import.meta.env.VITE_URI+'addEmployee',{
                method: 'POST',
                body: formData
            })
            const data = await result.json()
            console.log(data)
            if(data.status==='success'){
                toast(data.message)
            }
            else{
                toast.error(data.message)
                return
            }
        }
        catch(err){
            toast.error(err)
        }
    }

    useEffect(()=>{
        setThemed(theme)
    },[themed])

    return (
        <div className='right-main-2' style={{background:themed === 'dark' && 'black', minHeight:themed === 'dark' &&'fit-content', color: themed === 'dark' &&'white'}}>
            <div className='employee-1'>
                <h1>Add Employee</h1>
            </div>
            <div className='active'>
                <h3><i style={{marginRight: '10px'}} className='bxs bxs-user'></i>Personal Information</h3>
            </div>
            <div className='add-form'>
                <form onSubmit={addEmployee}>
                    <div className='add-img'>
                        <label>
                            {!image && 
                            <div className='fill-camera' onClick={()=>fileRef.current.click()}>
                                <i className='bx bx-camera'></i>
                            </div>}
                            {image && <img className='profile-add' onClick={()=>fileRef.current.click()} src={image && URL.createObjectURL(image) || null} alt='Click to Add an Image'/>}
                            <input type='file' ref={fileRef} accept='.png' onChange={e=>setImage(e.target.files[0])} required/>
                        </label>
                    </div>
                    <div className='add-data'>
                        <label>
                            Name *
                            <input type='text' placeholder='Enter Name' onChange={e=>setName(e.target.value)} required/>
                        </label>
                        <label>
                            Employee ID *
                            <input type='text' placeholder='Enter Employee ID' onChange={e=>setId(e.target.value)} required/>
                        </label>
                    </div>
                    <div className='add-data'>
                        <label>
                            Department *
                            <input placeholder="Select Department" list='department-list' value={department} onChange={e=>setDepartment(e.target.value)} required/>
                            <datalist id='department-list'>
                                <select>
                                    <option value="" selected>Department</option>
                                    <option value="Design">Design</option>
                                    <option value="Testing">Testing</option>
                                    <option value="Backend">Backend</option>
                                    <option value="HR">HR</option>
                                    <option value="Business">Business</option>
                                </select>
                            </datalist>
                        </label>
                        <label>
                            Designation *
                            <input placeholder='Select Designation' list='designation-list' value={designation} onChange={e=>setDesignation(e.target.value)} required/>
                            <datalist id='designation-list'>
                                <select>
                                    <option value="" selected>Select Designation</option>
                                    <option value="Design Lead">Design Lead</option>
                                    <option value="Frontend Developer">Frontend Developer</option>
                                    <option value="Backend Developer">Backend Developer</option>
                                    <option value="QA Engineer">QA Engineer</option>
                                    <option value="HR Manager">HR Manager</option>
                                    <option value="Business Analyst">Business Analyst</option>
                                    <option value="Project Manager">Project Manager</option>
                                    <option value="DevOps Engineer">DevOps Engineer</option>
                                </select>
                            </datalist>
                        </label>
                    </div>
                    <div className='add-data'>
                        <label>
                            Project
                            <input type='text' placeholder='Enter Project' onChange={e=>setProject(e.target.value)}/>
                        </label>
                        <label>
                            Type *
                            <input list='type-list' placeholder='Select Type' value={type} onChange={e=>setType(e.target.value)} required/>
                            <datalist id='type-list'>
                                <select>
                                    <option value="" selected>Select Type</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Office">Office</option>
                                    <option value="Contract">Contract</option>
                                    <option value="On-Site">On-Site</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Part-Time">Part-Time</option>
                                </select>
                            </datalist>
                        </label>
                    </div>
                    <div className='add-data'>
                        <label>
                            Status *
                            <input list='status-list' placeholder='Select Status' value={status} onChange={e=>setStatus(e.target.value)} required/>
                            <datalist id='status-list'>
                                <select>
                                    <option value="">Select Status</option>
                                    <option value="Assigned">Assigned</option>
                                    <option value="On-The-Go">On-The-Go</option>
                                    <option value="Done">Done</option>
                                </select>
                            </datalist>
                        </label>
                    </div>
                    <button style={{marginLeft:'40px',marginRight:'20px'}} className='formal-button-2' type="button" onClick={()=>setCancelling(true)}>Cancel</button>
                    <button style={{marginBottom: '30px'}} className='formal-button' type='submit'>Confirm</button>
                    {
                        cancelling && 
                        <div className='delete-modal' onClick={()=>setCancelling(false)}>
                            <div className='delete-div'>
                                <span>Are you sure to cancel?</span>
                                <div className='delete-buttons'>
                                    <button type='button' style={{backgroundColor:'rgb(0, 102, 255)'}} onClick={()=>setCancelling(false)}>No</button>
                                    <button type='button' style={{backgroundColor:'orangered'}} onClick={()=>navigate(-1)}>Yes</button>
                                </div>
                            </div>
                        </div>
                    }
                </form>
            </div>
            <ToastContainer autoClose={2000}/>
        </div>
    )
}

export default Add