import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'

const Edit = () => {
    const location = useLocation()
    const data = location.state || {}
    console.log(data)
    const [name,setName] = useState(data?.name || '')
    const [id,setId] = useState(data.id || '')
    const [department,setDepartment] = useState(data?.department || '')
    const [designation,setDesignation] = useState(data?.designation || '')
    const [project,setProject] = useState(data?.project || '')
    const [type,setType] = useState(data?.type || '')
    const [status,setStatus] = useState(data?.status || '')
    const [cancelling,setCancelling] = useState(false)
    const [image,setImage] = useState(data?.dp || null)
    const [preview, setPreview] = useState(data?.dp ? `data:image/png;base64,${data.dp}` : null);
    const themed = useSelector(state=>state.theme.mode)
    const [theme,setThemed] = useState(themed)
    const fileRef = useRef(null)
    const navigate = useNavigate()

    const editEmployee = async (e) => {
        e.preventDefault()
        try{
            if(name.trim()==='' || id.trim()==='' || department.trim()==='' || type.trim() === '' || designation.trim()==='' || status.trim()===''){
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
            if(image instanceof File)
                formData.append('file', image);
            const result = await fetch(import.meta.env.VITE_URI+'editEmployee',{
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
            console.log(err)
            toast.error('Something went wrong!')
        }
    }

    useEffect(() => {
        if(image instanceof File){
            const objectUrl = URL.createObjectURL(image)
            setPreview(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        }
        else if(typeof image === "string")
            setPreview(`data:image/png;base64,${image}`)
    },[image])

    useEffect(()=>{
        setThemed(themed)
    },[themed])

    return (
        <div className='right-main-2'  style={{background:themed === 'dark' && 'black', minHeight:themed === 'dark' &&'fit-content', color: themed === 'dark' &&'white'}}>
            <div className='employee-1'>
                <h1>Edit Employee Details</h1>
            </div>
            <div className='active'>
                <h3>Personal Information</h3>
            </div>
            <div className='add-form'>
                <form onSubmit={editEmployee}>
                    <div className='add-img'>
                        {!preview && (
                            <div className='fill-camera'>
                                <i className='bxs bxs-camera' onClick={()=>fileRef.current.click()}></i>
                            </div>
                        )}
                        {preview && (
                            <img className='profile-add' src={preview} alt="Profile Preview" onClick={()=>fileRef.current.click()}/>
                        )}
                        <input type="file" accept=".png" onChange={e => setImage(e.target.files[0])} ref={fileRef}/>
                    </div>
                    <div className='add-data'>
                        <label>
                            Department *
                            <input value={department} list='department-list' onChange={e=>setDepartment(e.target.value)} required/>
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
                            <input value={designation} list='designation-list' onChange={e=>setDesignation(e.target.value)} required/>
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
                            <input value={project} type='text' placeholder={data.project} onChange={e=>setProject(e.target.value)}/>
                        </label>
                        <label>
                            Type *
                            <input value={type} list='type-list' onChange={e=>setType(e.target.value)} required/>
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
                            <input value={status} list='status-list' onChange={e=>setStatus(e.target.value)} required/>
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
                    <button style={{marginLeft:'20px',marginRight:'20px'}} type="button" className='formal-button-2' onClick={()=>setCancelling(true)}>Cancel</button>
                    <button style={{marginBottom: '30px'}} type='submit' className='formal-button'>Confirm</button>
                    {
                        cancelling && 
                        <div className='delete-modal' onClick={()=>setCancelling(false)}>
                            <div className='delete-div' onClick={(e)=>e.stopPropagation()}>
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

export default Edit