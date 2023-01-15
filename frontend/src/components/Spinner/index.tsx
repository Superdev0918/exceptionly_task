import React from 'react'

import './styles.css'

const Spinner: React.FC = () => {

  return (
    <div className="login-loader">
        <div>
            <img src='spinner.f3699969.gif' alt="loading gif" />
        </div>
    </div>
  )
}

export default Spinner
