import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { state } from '../../store/slice/question/questionSlice'
import { state as userState } from '../../store/slice/user/userSlice'
import { fetchQuestion } from '../../store/slice/question/questionAsync'

import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const Login = () => {
  // Model
  const { questions, status, error } = useSelector(state)
  const { login_status, user } = useSelector(userState)

  // Controllers
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

  useEffect(() => {
    dispatch(fetchQuestion({ created_by: user.id }))
  }, [])

  // View
  return (
    <Fragment>
      <Col sm={12} className='w-100 d-flex flex-column'>
        <Container className='px-5 py-2 mb-3 text-muted d-flex justify-content-between align-items-center'>
          <h4>Questions ({questions.length})</h4>
          <Link to='/question-maker'>
            <Button
              variant='primary'
              size='sm'
              className='px-3 mx-1 shadow-sm align-items-center rounded-pill d-flex fs-5'
            >
              <m-icon>output</m-icon> <small className='ms-2 fs-6'>Make Question</small>
            </Button>
          </Link>
        </Container>
        <Container className='flex-wrap w-100 d-flex justify-content-start align-items-start'>
          {questions.slice(0).reverse().map(({ code, title, subject }) => (
            <Card key={code} style={{ maxWidth: '26rem' }} className='m-2 shadow-sm'>
              <Card.Body>
                <Row>
                  <Col sm={8}>
                    <div className='d-flex'>
                      <b>{code}</b>
                      <i className='text-muted ms-2'>{subject}</i>
                    </div>
                    <small className='d-block text-truncate'>{title}</small>
                  </Col>
                  <Col sm={4} className='d-flex align-items-center justify-content-end'>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(code)
                      }}
                      variant='primary'
                      className='px-3 py-0 d-flex rounded-pill fs-5 mx-1'
                      size='sm'
                    >
                      <m-icon>vpn_key</m-icon>
                    </Button>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(`localhost:3000/test/${code}`)
                      }}
                      variant='primary'
                      className='px-3 py-0 d-flex rounded-pill fs-5 mx-1'
                      size='sm'
                    >
                      <m-icon>link</m-icon>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </Col>
    </Fragment>
  )
}

export default Login
