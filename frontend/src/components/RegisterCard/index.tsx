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

import { validateFirstName, validateLastName, validateEmail, validatePassword } from '../../helpers/validators'

import { LoginCardProps } from '../../pages/Login'

import { useRegistrationContext } from '../../contexts/RegistrationContext'

import './styles.css'

const RegisterCard: React.FC<LoginCardProps> = (props) => {
  const { setLoginMode } = props

  const [step, setStep] = useState(1)

  const {
    legalPerson,
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
  } = useRegistrationContext()

  const defaultAlert = () => {
    alert('Preencha todos os campos corretamente')
  }

  const handleSubmitButton = () => {
   
      if (
        password &&
        passwordError === ''
      ) {
        sendNewUser()
      } else defaultAlert()
  }

  const handleValidateFirstName = (event:React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
    setFirstNameError(validateFirstName(event.target.value));
  }

  const handleValidateLastName = (event:React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
    setLastNameError(validateLastName(event.target.value));
  }

  const handleValidateEmail = (event:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(validateEmail(event.target.value));
  }

  const handleValidatePassword = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setPasswordError(validatePassword(event.target.value));
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className='signUpForm'>
        <TextField
        id="standard-textarea"
        label="First name"
        error={firstNameError !== ''}
        InputLabelProps={{
            shrink: true,
        }}
        value={firstName}
        onChange={handleValidateFirstName}
        helperText={firstNameError}
        variant="standard"
        className='input-email-field'
        />
        <TextField
        id="standard-textarea"
        label="Last name"
        error={lastNameError !== ''}
        InputLabelProps={{
            shrink: true,
        }}
        value={lastName}
        onChange={handleValidateLastName}
        helperText={lastNameError}
        variant="standard"
        className='input-email-field'
        />
        <TextField
        id="standard-textarea"
        label="Email"
        error={emailError !== ''}
        InputLabelProps={{
            shrink: true,
        }}
        value={email}
        onChange={handleValidateEmail}
        helperText={emailError}
        variant="standard"
        className='input-email-field'
        />
        <FormControl className='input-password-field' variant="standard">
          <FormHelperText id="standard-weight-helper-text" error={passwordError !== ''}>Password</FormHelperText>
          <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleValidatePassword}
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
          {passwordError !=='' && <FormHelperText id="standard-weight-helper-text" error>{passwordError}</FormHelperText>}
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
