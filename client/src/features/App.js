import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './Login/Login'

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </Fragment>
  )
}

export default App
