import React from 'react'
import { BrowserRouter, Route, Navigate, Routes as Router } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

import { useAuthContext } from './contexts/AuthContext'

const Routes: React.FC = () => {
  const { signed } = useAuthContext()

  return(
    <BrowserRouter>
        <Router>
            <Route path="/" element={signed ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/dashboard" element={signed ? <Dashboard /> : <Navigate to="/" />} />
        </Router>    
    </BrowserRouter>
  )
}

export default Routes
