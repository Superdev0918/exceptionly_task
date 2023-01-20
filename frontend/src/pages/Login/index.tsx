import React, { useState, useRef, useCallback } from 'react'


import LoginCard from '../../components/LoginCard'
import RegisterCard from '../../components/RegisterCard';
import PasswordReset from '../../components/PasswordReset';
import Spinner from '../../components/Spinner';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import RegistrationProvider from '../../contexts/RegistrationContext'
import { useAuthContext } from '../../contexts/AuthContext'


import './styles.css';

import { Divider, Button, Link } from '@mui/material'


import { apolloClient } from "../../graphql/client";

import { SignUp } from "../../graphql/mutations";

import 'react-toastify/dist/ReactToastify.css';

import { 
    LoginSocialGoogle,
    LoginSocialLinkedin,
    LoginSocialMicrosoft,
    TypeCrossFunction,
    IResolveParams
} from '../../components/Social';

export interface LoginCardProps {
    setLoginMode: React.Dispatch<React.SetStateAction<string>>
}

const REDIRECT_URI = 'http://localhost:3000/'

const Login: React.FC = () => {
    const { loading, setSigned } = useAuthContext()

    const [loginMode, setLoginMode] = useState('login')

    const linkedinRef = useRef<TypeCrossFunction>(null!)

    const onLoginStart = useCallback(() => {
        console.log('login start')
    }, [])

    const onLogoutSuccess = useCallback(() => {
        alert('logout success')
    }, [])

    const onLogout = useCallback(() => {}, []);

    const handleSocialLogin = ({ provider, data }: IResolveParams) => {
        const stringData = JSON.stringify(data)
        const jsonData = JSON.parse(stringData)
        console.log(data);
        apolloClient.mutate({
            mutation: SignUp,
            variables: {
                firstName: jsonData.localizedFirstName,
                lastName: jsonData.localizedLastName,
                email: jsonData.id,
                password: "password",
                provider: provider
            }
        })
        .then((response:any) => {
            if (response.data !== null) {
                setSigned(true);
                const token = response.data.createUser
                localStorage.setItem('userToken', token)
                localStorage.setItem('userEmail', 'email')
            }
        })
        .catch((error:any) => {
          const stringError = JSON.stringify(error)
          const jsonError = JSON.parse(stringError)
          const message = jsonError.graphQLErrors[0].message
          toast(message);
        })
    }

    return (
        <div className='signup'>
            <div className='MainBkg'>
                <div className='contentWrap'>
                    <div className='leftWrap'>
                        {loading === true && <Spinner />}
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
                                    <LoginSocialGoogle
                                        // client_id={process.env.REACT_APP_GG_APP_ID || ''}
                                        client_id='exceptionly-375109'
                                        onLoginStart={onLoginStart}
                                        redirect_uri={REDIRECT_URI}
                                        scope="openid profile email"
                                        discoveryDocs="claims_supported"
                                        access_type="offline"
                                        onResolve={({ provider, data }: IResolveParams) => {
                                            handleSocialLogin({ provider, data });
                                        }}
                                        onReject={err => {
                                            console.log(err);
                                        }}
                                    />
                                    <LoginSocialLinkedin
                                        ref={linkedinRef}
                                        // client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ''}
                                        // client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ''}
                                        client_id='78jz14o7ftvtd3'
                                        client_secret='9gcxWxUTJjMThBa6'
                                        redirect_uri={REDIRECT_URI}
                                        onLoginStart={onLoginStart}
                                        onLogoutSuccess={onLogoutSuccess}
                                        onResolve={({ provider, data }: IResolveParams) => {
                                            handleSocialLogin({ provider, data });
                                        }}
                                        onReject={(err: any) => {
                                            console.log(err)
                                        }}
                                    />
                                    <LoginSocialMicrosoft
                                        client_id={'da630e6a-2932-475d-bf34-c33b8a05c03e' || ''}
                                        redirect_uri={REDIRECT_URI}
                                        onLoginStart={onLoginStart}
                                        onResolve={({ provider, data }: IResolveParams) => {
                                            handleSocialLogin({ provider, data });
                                        }}
                                        onReject={(err: any) => {
                                            console.log(err);
                                        }}
                                    />
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
                        <div>
                        <ToastContainer />
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