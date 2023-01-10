import React, { useState } from 'react'
import {
    Box,
    TextField,
    FormControl,
    Input,
    InputAdornment,
    IconButton,
    FormHelperText,
    Button
  } from '@mui/material'
  
  import { VisibilityOff, Visibility } from '@mui/icons-material';

import { LoginCardProps } from '../../pages/Login'

import { useRegistrationContext } from '../../contexts/RegistrationContext'

import './styles.css'

const RegisterCard: React.FC<LoginCardProps> = (props) => {
  const { setLoginMode } = props

  const [step, setStep] = useState(1)

  const {
    legalPerson,
    name,
    nameError,
    cpf,
    cpfError,
    cnpj,
    cnpjError,
    email,
    emailError,
    emailConfirmation,
    emailConfirmationError,
    password,
    passwordError,
    passwordConfirmation,
    passwordConfirmationError,

    sendNewUser,
  } = useRegistrationContext()

  const defaultAlert = () => {
    alert('Preencha todos os campos corretamente')
  }

  const handleSubmitButton = () => {
    if (step === 1) {
      if (legalPerson === 'physical') {
        if (name && nameError === '' && cpf && cpfError === '') setStep(2)
        else defaultAlert()
      } else if (legalPerson === 'juridical') {
        if (name && nameError === '' && cnpj && cnpjError === '') setStep(2)
        else defaultAlert()
      }
    } else if (step === 2) {
      if (
        email &&
        emailError === '' &&
        emailConfirmation &&
        emailConfirmationError === ''
      )
        setStep(3)
      else defaultAlert()
    } else if (step === 3) {
      if (
        password &&
        passwordError === '' &&
        passwordConfirmation &&
        passwordConfirmationError === ''
      ) {
        sendNewUser()
      } else defaultAlert()
    }
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className='signInForm'>
        <TextField
        id="standard-textarea"
        label="First name"
        InputLabelProps={{
            shrink: true,
        }}
        variant="standard"
        className='input-email-field'
        />
        <TextField
        id="standard-textarea"
        label="Last name"
        InputLabelProps={{
            shrink: true,
        }}
        variant="standard"
        className='input-email-field'
        />
        <TextField
        id="standard-textarea"
        label="Email"
        InputLabelProps={{
            shrink: true,
        }}
        variant="standard"
        className='input-email-field'
        />
        <FormControl className='input-password-field' variant="standard">
        <FormHelperText id="standard-weight-helper-text">Password</FormHelperText>
        <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
            }
        />
        </FormControl>
        <Box className='signInForm__buttons'>
        <Button onClick={handleSubmitButton} variant="contained" color="primary">
            SIGN UP
        </Button>
        </Box>
 </div>
  )
}

export default RegisterCard
