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

import { validateEmail, validateLoginPassword } from '../../helpers/validators'

import { useAuthContext } from '../../contexts/AuthContext'

import  './styles.css'

const LoginCard: React.FC<LoginCardProps> = (props) => {
  const { setLoginMode } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, emailError, passwordError, setEmailError, setPasswordError } = useAuthContext()

  const handleLoginSubmit = () => {
    signIn(email, password)
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleValidateEmail = (e:any) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  }

  const handleValidatePassword = (e:any) => {
    setPassword(e.target.value)
    setPasswordError(validateLoginPassword(e.target.value));
  }

  return (
    <div className='signInForm'>
       <TextField
          id="standard-textarea"
          label="Email"
          error={emailError !== ''}
          type="email"
          InputLabelProps={{
            shrink: true,
          }}
          value={email}
          variant="standard"
          className='input-email-field'
          onChange={(e) => handleValidateEmail(e)}
          helperText={emailError}
          autoFocus
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
