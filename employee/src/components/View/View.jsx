import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const View = () => {
    const location = useLocation()
    const data = location.state || {}
    const [clicked,setClicked] = useState(false)
    const themed = useSelector(state=>state.theme.mode)
    const [theme,setThemed] = useState(themed)

    useEffect(()=>{
        setThemed(themed)
    },[themed])

    return (
        <div className='right-main-2'  style={{background:themed === 'dark' && 'black', minHeight:themed === 'dark' &&'fit-content', color: themed === 'dark' &&'white'}}>
            <div className='employee-1'>
                <h1>View Employee Details</h1>
            </div>
            <div className='active'>
                <h3>Personal Information</h3>
            </div>
            <div className='edit-body'>
                <div className='add-data-view'>
                    {data.dp && <img className='profile-add' src={`data:image/png;base64,${data.dp}`} onClick={()=>setClicked(true)} alt="profile"/>
                    || <div className='fill-camera'>
                            <i className='bxs bxs-camera'></i>
                        </div>
                    }
                </div>
                <div className='add-data-view'>
                    <div className={themed === 'light' ? 'ind-view' : 'ind-view-dark'}>
                        <span>Name</span>
                        <span>{data.name}</span>
                    </div>
                    <div className={themed === 'light' ? 'ind-view' : 'ind-view-dark'}>
                        <span>Employee ID</span>
                        <span>{data.id}</span>
                    </div>
                    <div className={themed === 'light' ? 'ind-view' : 'ind-view-dark'}>
                        <span>Department</span>
                        <span>{data.department}</span>
                    </div>
                    <div className={themed === 'light' ? 'ind-view' : 'ind-view-dark'}>
                        <span>Designation</span>
                        <span>{data.designation}</span>
                    </div>
                    <div className={themed === 'light' ? 'ind-view' : 'ind-view-dark'}>
                        <span>Project</span>
                        <span>{data.project}</span>
                    </div>
                    <div className={themed === 'light' ? 'ind-view' : 'ind-view-dark'}>
                        <span>Type</span>
                        <span>{data.type}</span>
                    </div>
                    <div className={themed === 'light' ? 'ind-view' : 'ind-view-dark'}>
                        <span>Status</span>
                        <span>{data.status}</span>
                    </div>
                </div>
            </div>
            {clicked && <PicModal image={data.dp} setClicked={setClicked}/>}
        </div>
    )
}

const PicModal = ({image,setClicked}) => {
    return (
        <div className='delete-modal' onClick={()=>setClicked(false)}>
            <img src={`data:image/png;base64,${image}`} onClick={(e)=>e.stopPropagation()} alt='Profile Photo'/>
        </div>
    )
}

export default View