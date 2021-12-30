import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import { state } from '../../store/slice/user/userSlice'

import Login from '../Login/Login'
import Registration from '../Registration/Registration'
import QuestionMaker from '../QuestionMaker/QuestionMaker'
import QuestionDashboard from '../QuestionDashboard/QuestionDashboard'
import AnswersDashboard from '../AnswersDashboard/AnswersDashboard'
import AnswerScript from '../AnswerScript/AnswerScript'
import TestPaper from '../TestPaper/TestPaper'

import { Header } from '../../components'
import { replace } from '../../store/slice/user/userSlice'
import { Row } from 'react-bootstrap'

const App = () => {
  // Model
  const { user, login_status, status, error } = useSelector(state)

  // Controller
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(
    () => {
      if (login_status !== 'logged_in') {
        navigate('/login')
      }
    },
    [ login_status ]
  )
  const logout = e => {
    e.preventDefault()

    dispatch(replace({ key: 'login_status', value: 'logged_out' }))
    dispatch(replace({ key: 'user', value: {} }))
  }

  // View
  const { name, type } = user

  return (
    <Fragment>
      <main className='vh-100 vw-100'>
        {login_status === 'logged_in' ? <Header logout={logout} name={name} showLogout /> : <Header logout={logout} />}

        <Row className='p-3 overflow-y-auto w-100 scrollbar h-content'>
          <Routes>
            {type === 'Teacher' ? (
              <Fragment>
                <Route exact path='/' element={<QuestionDashboard />} />
                <Route exact path='/question-maker' element={<QuestionMaker />} />
              </Fragment>
            ) : type === 'Student' ? (
              <Fragment>
                <Route exact path='/' element={<AnswersDashboard />} />
                <Route exact path='/test/:code' element={<TestPaper />} />
                <Route exact path='/script/:code' element={<AnswerScript />} />
              </Fragment>
            ) : (
              <Route exact path='/' element={<Navigate to='/login' />} />
            )}
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/registration' element={<Registration />} />
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </Row>
      </main>
    </Fragment>
  )
}

export default App
