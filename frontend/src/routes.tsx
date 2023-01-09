import React from 'react'
import { BrowserRouter, Route, Navigate } from 'react-router-dom'

import Dashboard from './pages/dashboard'
import Login from './pages/Login'

import { useAuthContext } from './contexts/AuthContext'

const Routes: React.FC = () => {
  const { signed } = useAuthContext()

  return(
    <BrowserRouter>
      <Route path="/" element={<Login />}>
        {signed && (
          <Navigate to="/dashboard" />
        )}
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        {!signed && (
          <Navigate to="/" />
        )}
      </Route>
    </BrowserRouter>
  )
}

export default Routes
