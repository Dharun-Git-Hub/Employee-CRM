import { useState, useEffect } from 'react'
import assets from '../../assets/assets'

const Guide = () => {
    return (
        <div className='main-cont'>
            <h1 style={{fontSize:'3rem', marginBottom:'50px'}} className='banner'>Instructions</h1>
            <div className='cards' style={{marginTop:'20vh'}}>
                <span>
                    Hello, RadicalStart Team ! I'm G. Dharun Vignesh, BCA, PGDCA.
                </span>
                <span>
                    I Know you know all then also,
                    <br/>
                    <span style={{fontWeight:'600',animation:'load 1s infinite'}}>
                        Before using and testing this App Please read the Instructions below so that it will work as expected!
                    </span>
                </span>
                <div style={{background:'#f7d8e3ff',display:'flex',flexDirection:'column'}}>
                    <h1>Backend Configuration</h1>
                    <img src={assets.backend}/>
                    <br/>
                    <span>
                        Here is the backend Environment Variables and their Key Names.
                        <br/>
                        <span style={{textAlign:'center',fontWeight:'600',animation:'load 1s infinite'}}>
                            I've Given them as a config.txt files too. You may copy & paste it.
                        </span>
                        <br/>
                        <span>
                            As this is a Sample Project some of the Informations like (Email Passkeys) are explicitly given.
                        </span>
                        <span>
                            <ul>
                                <li>host - localhost (or) your's host</li>
                                <li>user - username of your MySQL</li>
                                <li>pass - password of your MySQL</li>
                            </ul>    
                        </span>
                    </span>
                </div>
                <div style={{background:'#f9f5d0ff',display:'flex',flexDirection:'column'}}>
                    <h1>Frontend Configuration</h1>
                    <img src={assets.frontend}/>
                    <span>
                        Here is the frontend Env Variable and it's key name.
                    </span>
                    <button className='formal-button' onClick={()=>window.open('https://about-dharun.vercel.app')}>
                        About Me 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Guide