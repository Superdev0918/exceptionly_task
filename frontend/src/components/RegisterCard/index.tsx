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
    emailConfirmation,
    emailConfirmationError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    passwordConfirmation,
    passwordConfirmationError,
    sendNewUser,
  } = useRegistrationContext()

  const defaultAlert = () => {
    alert('Preencha todos os campos corretamente')
  }

  const handleSubmitButton = () => {
   
      if (
        password &&
        passwordError === '' &&
        passwordConfirmation &&
        passwordConfirmationError === ''
      ) {
        sendNewUser()
      } else defaultAlert()
  }

  const handleValidateFirstName = (e:any) => {
    setFirstName(e.target.value);
    setFirstNameError(validateFirstName(e.target.value));
  }

  const handleValidateLastName = (e:any) => {
    setLastName(e.target.value);
    setLastNameError(validateLastName(e.target.value));
  }

  const handleValidateEmail = (e:any) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  }

  const handleValidatePassword = (e:any) => {
    setPassword(e.target.value)
    setPasswordError(validatePassword(e.target.value));
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
        onChange={(e) => handleValidateFirstName(e)}
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
        onChange={(e) => handleValidateLastName(e)}
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
        onChange={(e) => handleValidateEmail(e)}
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
              onChange={(e) => handleValidatePassword(e)}
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
