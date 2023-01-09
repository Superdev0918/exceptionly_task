import React, { useState } from 'react'
import useStyles from './styles'

import { Paper, Box, Grid, Hidden } from '@mui/material'

export interface LoginCardProps {
    setLoginMode: React.Dispatch<React.SetStateAction<string>>
}
  

const Login: React.FC = () => {
    const classes = useStyles()

    const [loginMode, setLoginMode] = useState('login')

    return (
        <div className={classes.loginPageMainBkg}></div>
    )
}

export default Login;