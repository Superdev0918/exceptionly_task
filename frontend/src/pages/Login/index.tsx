import React, { useState } from 'react'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import MicroSoftIcon from '@mui/icons-material/Window';

import LoginCard from '../../components/LoginCard'
import RegisterCard from '../../components/RegisterCard';
import PasswordReset from '../../components/PasswordReset';

import RegistrationProvider from '../../contexts/RegistrationContext'

import './styles.css';

import { Divider, Button, Link } from '@mui/material'

export interface LoginCardProps {
    setLoginMode: React.Dispatch<React.SetStateAction<string>>
}
  

const Login: React.FC = () => {

    const [loginMode, setLoginMode] = useState('login')
    console.log("here: ", loginMode)
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
                                    <span className='show'>{loginMode === 'login' ? 'Sign in' : 'Sign up'} to your account</span>
                                    <span className='hide'>Password Recovery</span>
                                    <span className='hide'>Invalid Registration</span>
                                    <span className='hide'>Password Recovery</span>
                                </div>
                            </div>
                            <div className='vertical-centre'>
                                <div className='signInGroup'>
                                    <div><Button variant="contained" className='googleIcon' startIcon={<GoogleIcon />}>SIGN IN WITH GOOGLE</Button></div>
                                    <div><Button variant="contained" className='linkedinIcon' startIcon={<LinkedInIcon />}>SIGN IN WITH LINKEDIN</Button></div>
                                    <div><Button variant="contained" className='microIcon' startIcon={<MicroSoftIcon />}>SIGN IN WITH MICROSOFT</Button></div>
                                    <Divider variant="middle" className='divider'>or use business email</Divider>
                                </div>
                                <div>
                                    <form>
                                        {loginMode === 'login' && <LoginCard setLoginMode={setLoginMode} />}
                                        {loginMode === 'register' && (
                                            <RegistrationProvider>
                                                <RegisterCard setLoginMode={setLoginMode} />
                                            </RegistrationProvider>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='show'>
                            <div className='btHld'>
                                <div className='innerNewText'>
                                    <span className='show' style={{color:'white'}}>{loginMode === 'login' ? "Don't have an account?" : 'Already have an account?'}</span>
                                    <span>
                                        {loginMode === 'login' && <Link
                                            onClick={() => setLoginMode('register')}
                                            className='registerOption'
                                            underline="none"
                                            sx={{cursor:'pointer'}}
                                            >
                                                CREATE ACCOUNT
                                            </Link>
                                        }
                                        {loginMode === 'register' && <Link
                                            onClick={() => setLoginMode('login')}
                                            className='registerOption'
                                            underline="none"
                                            sx={{cursor:'pointer'}}
                                            >
                                                SIGN IN HERE
                                            </Link>
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Login;