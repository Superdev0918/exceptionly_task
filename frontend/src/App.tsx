import React from 'react'

import Routes from './routes'

import { AuthProvider } from './contexts/AuthContext'

// import { ThemeProvider } from '@mui/material/styles'
// import CssBaseline from '@mui/material/CssBaseline'
// import theme from './assets/style/theme'

function App() {
  return (
    // <ThemeProvider theme={theme}>
      // <CssBaseline />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    // </ThemeProvider>
  )
}

export default App;
