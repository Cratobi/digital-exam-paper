import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { state } from '../../store/slice/user/userSlice'
import { verify } from '../../store/slice/user/userAsync'

import { Form, Row, Col, Card, Button, Alert } from 'react-bootstrap'

const Login = () => {
  // Model
  const { login_status, status, error } = useSelector(state)
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ filled, setFilled ] = useState(false)
  const [ failed, setFailed ] = useState(false)

  // Controllers
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(
    () => {
      if (login_status === 'login_failed') {
        setFailed(true)
        setPassword('')
      }
    },
    [ login_status ]
  )
  useEffect(
    () => {
      if (login_status === 'logged_in') {
        navigate('/')
      }

      return function cleanup() {
        setEmail('')
        setPassword('')
      }
    },
    [ login_status ]
  )
  useEffect(
    () => {
      if (email !== '' && password !== '') {
        setFilled(true)
      } else {
        setFilled(false)
      }

      return function cleanup() {
        setFilled(false)
      }
    },
    [ email, password ]
  )

  const emailChange = e => {
    setEmail(e.target.value)
  }
  const passwordChange = e => {
    setPassword(e.target.value)
  }
  const submitForm = e => {
    e.preventDefault()

    setFailed(false)
    dispatch(verify({ email, password }))
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
                  <Alert.Link as={Link} to='/registration'>
                    If you don't have an account, you can create one
                  </Alert.Link>
                </Alert>
              )}
              <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                <Form.Label column sm={3} className='text-nowrap'>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control as='input' onChange={emailChange} value={email} type='email' />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={3} className='text-nowrap'>
                  Password
                </Form.Label>
                <Col sm={9}>
                  <Form.Control onChange={passwordChange} value={password} type='password' />
                </Col>
              </Form.Group>
            </Card.Body>
            <Card.Footer className='text-end text-muted'>
              <Button as={Link} to='/registration' variant='outline-secondary' className='me-2' type='submit'>
                Registration
              </Button>
              <Button onClick={submitForm} variant='success' type='submit' disabled={!filled}>
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
