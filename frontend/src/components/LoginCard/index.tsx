import React, { useState } from 'react'
import {
  Box,
  TextField,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
  Link
} from '@mui/material'

import { VisibilityOff, Visibility } from '@mui/icons-material';

import { LoginCardProps } from '../../pages/Login'

// import PasswordReset from '../PasswordReset'

import { useAuthContext } from '../../contexts/AuthContext'

import  './styles.css'

const LoginCard: React.FC<LoginCardProps> = (props) => {
  const { setLoginMode } = props

  const [modalOpen, setModalOpen] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false)
  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible)
  }

  const { signIn, resetErrors, emailError, passwordError } = useAuthContext()

  const handleLoginSubmit = () => {
    resetErrors()
    signIn(email, password, rememberMe)
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
          <Button onClick={handleLoginSubmit} variant="contained" color="primary">
            SIGN IN
          </Button>

          <Link
            onClick={() => setLoginMode('forgot_password')}
            className='loginOptions'
            underline="none"
            sx={{ml:'20px', cursor:'pointer'}}
          >
            Forgot password?
          </Link>
        </Box>
    </div>
  )
}

export default LoginCard
