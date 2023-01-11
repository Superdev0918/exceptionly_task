import React, { useState, createContext, ReactNode, useContext } from 'react'

import api from '../services/api'

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
  setEmailConfirmation: React.Dispatch<React.SetStateAction<string>>
  setEmailConfirmationError: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  setPasswordError: React.Dispatch<React.SetStateAction<string>>
  setPasswordConfirmation: React.Dispatch<React.SetStateAction<string>>
  setPasswordConfirmationError: React.Dispatch<React.SetStateAction<string>>

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
  const [emailConfirmation, setEmailConfirmation] = useState('')
  const [emailConfirmationError, setEmailConfirmationError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('')

  async function sendNewUser() {
    api.post("users", {
      email,
      password,
      firstName,
      lastName
    }).then((response) => {
      if (response.status === 200) window.location.reload()
    }).catch((error) => {
      alert(error)
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
    emailConfirmation,
    setEmailConfirmation,
    emailConfirmationError,
    setEmailConfirmationError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    passwordConfirmation,
    setPasswordConfirmation,
    passwordConfirmationError,
    setPasswordConfirmationError,
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
    emailConfirmation,
    setEmailConfirmation,
    emailConfirmationError,
    setEmailConfirmationError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    passwordConfirmation,
    setPasswordConfirmation,
    passwordConfirmationError,
    setPasswordConfirmationError,
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
    emailConfirmation,
    setEmailConfirmation,
    emailConfirmationError,
    setEmailConfirmationError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    passwordConfirmation,
    setPasswordConfirmation,
    passwordConfirmationError,
    setPasswordConfirmationError,
    sendNewUser,
  }
}

export default RegistrationProvider
