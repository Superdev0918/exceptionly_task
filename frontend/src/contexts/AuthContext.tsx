import React, { createContext, useContext, useState, useEffect } from "react"

import { apolloClient } from "../graphql/client";

import { SignIn } from "../graphql/mutations";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../services/api'

interface AuthContextData {
    signed: boolean
    loading: boolean
    token: string
    user: user
    emailError: string
    passwordError: string
    signIn(email: string, password: string): Promise<void>
    signOut(): void
    setEmailError: React.Dispatch<React.SetStateAction<string>>
    setPasswordError: React.Dispatch<React.SetStateAction<string>>
}

interface user {
    email: string
    password: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface IAuthProviderProp {
    children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProp> = ({ children }) => {
    const [token, setToken] = useState('')
    const [user, setUser] = useState<user>({} as user)
    const [signed, setSigned] = useState(false)
    const [loading, setLoading] = useState(false)

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useEffect(() => {
        if(localStorage.getItem('userEmail')) {
            const email = localStorage.getItem('userEmail')
            const token = localStorage.getItem('userToken')

            api.defaults.headers.Authorization = `Bearer ${token}`

            setUser({
                email
            } as user)
            setToken(token as string)
            setSigned(true)
        }
    }, [])
    
    function signOut() {
        localStorage.clear()
        api.defaults.headers.Authorization = ''
        setSigned(false)
    }

    async function signIn(email: string, password: string) {
        setLoading(true)
        
        apolloClient.mutate({
            mutation: SignIn,
            variables: {
                email: email,
                password: password
            }
        })
        .then((response:any) => {
            if (response.data !== null) {
                const token = response.data.login
                api.defaults.headers.Authorization = `Bearer ${token}`
                localStorage.setItem('userToken', token)
                localStorage.setItem('userEmail', email.toString())
                setUser(user)
                setToken(token)
                setSigned(true)
                setLoading(false)
            }
        })
        .catch((error:any) => {
            setLoading(false)
            const stringError = JSON.stringify(error)
            const jsonError = JSON.parse(stringError)
            const message = jsonError.graphQLErrors[0].message
            
            toast(message);
    
            // setEmailError(errors.Email[0])
            // setPasswordError(errors.Password[0])
            // setEmailError(message)
        })
        
    }

    return (
        <AuthContext.Provider
            value={{
                signed,
                loading,
                token,
                user,
                emailError,
                passwordError,
                signIn,
                signOut,
                setEmailError,
                setPasswordError,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    const {
        signed,
        loading,
        token,
        user,
        emailError,
        passwordError,
        signIn,
        signOut,
        setEmailError,
        setPasswordError
    } = context
    return {
        signed,
        loading,
        token,
        user,
        emailError,
        passwordError,
        signIn,
        signOut,
        setEmailError,
        setPasswordError
    }
  }
  
  export default AuthContext
