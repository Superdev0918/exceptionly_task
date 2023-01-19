import React, { useState, createContext, ReactNode, useContext } from 'react'

import api from '../services/api'

import { apolloClient } from "../graphql/client";

import { SignUp } from "../graphql/mutations";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type RegistrationContextData = {
  legalPerson: string
  firstName: string
  firstNameError: string
  lastName: string
  lastNameError: string
  email: string
  emailError: string
  emailConfirmation: string
  emailConfirmationError: string
  password: string
  passwordError: string
  passwordConfirmation: string
  passwordConfirmationError: string
  setLegalPerson: React.Dispatch<React.SetStateAction<string>>
  setFirstName: React.Dispatch<React.SetStateAction<string>>
  setFirstNameError: React.Dispatch<React.SetStateAction<string>>
  setLastName: React.Dispatch<React.SetStateAction<string>>
  setLastNameError: React.Dispatch<React.SetStateAction<string>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setEmailError: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  setPasswordError: React.Dispatch<React.SetStateAction<string>>

  sendNewUser(): Promise<void>
}

interface Props {
  children: ReactNode
}

const RegistrationContext = createContext<any>(void 0)

const RegistrationProvider: React.FC<Props> = ({ children }) => {
  const [legalPerson, setLegalPerson] = useState('physical')
  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  async function sendNewUser() {
      apolloClient.mutate({
          mutation: SignUp,
          variables: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password
          }
      })
      .then((response:any) => {
          if (response.data !== null) {
            window.location.reload()
            toast("Sign in Success!");
          }
      })
      .catch((error:any) => {
        const stringError = JSON.stringify(error)
        const jsonError = JSON.parse(stringError)
        const message = jsonError.graphQLErrors[0].message
        toast(message);
      })
  }

  const values = {
    legalPerson,
    setLegalPerson,
    firstName,
    setFirstName,
    firstNameError,
    setFirstNameError,
    lastName,
    setLastName,
    lastNameError,
    setLastNameError,
    email,
    setEmail,
    emailError,
    setEmailError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    sendNewUser,
  }

  return (
    <RegistrationContext.Provider
      value={values}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistrationContext() {
  const context = useContext(RegistrationContext)
  const {
    legalPerson,
    setLegalPerson,
    firstName,
    setFirstName,
    firstNameError,
    setFirstNameError,
    lastName,
    setLastName,
    lastNameError,
    setLastNameError,
    email,
    setEmail,
    emailError,
    setEmailError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    sendNewUser,
  } = context
  return {
    legalPerson,
    setLegalPerson,
    firstName,
    setFirstName,
    firstNameError,
    setFirstNameError,
    lastName,
    setLastName,
    lastNameError,
    setLastNameError,
    email,
    setEmail,
    emailError,
    setEmailError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    sendNewUser,
  }
}

export default RegistrationProvider
