import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { state } from '../../store/slice/login/loginSlice'
import { replace, add, modify, remove } from '../../store/slice/login/loginSlice'
import { verifyLogin } from '../../store/slice/login/loginAsync'

import { Form, Row, Col, Card, Button, Alert } from 'react-bootstrap'

const Login = () => {
  // Model
  const { loginStatus, status, error } = useSelector(state)
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ failed, setFailed ] = useState(false)

  // Controllers
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(
    () => {
      if (loginStatus === 'loginFailed') {
        setFailed(true)
      } else if (loginStatus === 'loggedIn') {
        navigate('/home')
      }

      return function cleanup() {
        setEmail('')
        setPassword('')
      }
    },
    [ loginStatus ]
  )

  const emailChange = e => {
    setEmail(e.target.value)
  }
  const passwordChange = e => {
    setPassword(e.target.value)
  }
  const submitForm = e => {
    e.preventDefault()

    dispatch(verifyLogin({ email, password }))
  }

  // View
  return (
    <Fragment>
      <Row className='h-100 w-100'>
        <Col className='col-3' />
        <Col as='form' className='w-100 d-flex justify-content-center align-items-center' onSubmit={submitForm}>
          <Card style={{ minWidth: '24rem' }}>
            <Card.Body>
              <h5 className='p-2 mb-4 text-center'>Login</h5>
              {failed && (
                <Alert variant={'warning'}>
                  Your email address or password is wrong. Please try again. <br />
                  <Alert.Link href='#'> If you don't have an account, you can create one</Alert.Link>
                </Alert>
              )}
              <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                <Form.Label column sm={3} className='text-nowrap'>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as='input'
                    onChange={emailChange}
                    value={email}
                    type='email'
                    placeholder='address@mail.com...'
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3' controlId='formHorizontalPassword'>
                <Form.Label column sm={3} className='text-nowrap'>
                  Password
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    onChange={passwordChange}
                    value={password}
                    type='password'
                    placeholder='really-Strong-passw0rd...'
                  />
                </Col>
              </Form.Group>
            </Card.Body>
            <Card.Footer className='text-end text-muted'>
              <Button variant='outline-secondary' className='me-2' type='submit'>
                Registration
              </Button>
              <Button onClick={submitForm} variant='success' type='submit'>
                Sign in
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col className='col-3' />
      </Row>
    </Fragment>
  )
}

export default Login
