import React, { useState } from 'react'
import Button from '@mui/material/Button';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import './styles.css';

import { Paper, Box, Grid, Hidden } from '@mui/material'

export interface LoginCardProps {
    setLoginMode: React.Dispatch<React.SetStateAction<string>>
}
  

const Login: React.FC = () => {

    const [loginMode, setLoginMode] = useState('login')

    return (
        <div className='signup'>
            <div className='MainBkg'>
                <div className='contentWrap'>
                    <div className='leftWrap'>
                        <div className='imgCont'>
                            <img
                                className='img'
                                alt="spiral"
                                src='spiral.svg'
                            />
                        </div>
                        <div className='textHld'>
                            <div className='majorCap'>WELCOME TO THE MARKETPLACE</div>
                            <div className='minorText'>Exceptionly provides hands-on tested remote software engineers unlike any other outsourcing company. Our product delivers talent directly for hiring without a lifetime markup over 400%.</div>
                        </div>
                    </div>
                    <div className='rightWrap'>
                        <div className='topHld'>
                            <div className='actionTitle'>
                                <img
                                    alt="exceptionly logo"
                                    src='logo.bf7070eb.svg'
                                />
                                <div className='proText'>
                                    <span className='show'>Sign in to your account</span>
                                    <span className='hide'>Sign up to your account</span>
                                    <span className='hide'>Password Recovery</span>
                                    <span className='hide'>Invalid Registration</span>
                                    <span className='hide'>Password Recovery</span>
                                </div>
                            </div>
                            <div className='vertical-centre'>
                                <div className='signInGroup'>
                                    <div><Button variant="contained" startIcon={<GoogleIcon />}>SIGN IN WITH GOOGLE</Button></div>
                                </div>
                            </div>
                        </div>
                        <div className='show'></div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Login;