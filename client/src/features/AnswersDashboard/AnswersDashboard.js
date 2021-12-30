import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { state } from '../../store/slice/answer/answerSlice'
import { state as userState } from '../../store/slice/user/userSlice'
import { fetchAnswer, fetchAnswerByCode } from '../../store/slice/answer/answerAsync'

import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap'

const AnswerDashboard = () => {
  // Model
  const { answers, status, error } = useSelector(state)
  const { login_status, user } = useSelector(userState)
  const [ code, setCode ] = useState('')

  // Controllers
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(
    () => {
      // if (login_status !== 'logged_in')
      //   navigate('/login')
    },
    [ login_status ]
  )

  useEffect(() => {
    dispatch(fetchAnswer({ answered_by: user.id }))
  }, [])

  const searchQuestion = e => {
    e.preventDefault()

    navigate(`/test/${code}`)
  }
  const changeCode = e => setCode(e.target.value)
  const fetchAnswerScript = code => navigate(`/script/${code}`)

  // View
  return (
    <Fragment>
      <Row className='h-100 w-100'>
        <Col className='w-100'>
          <Container className='px-5 py-2 mb-3 text-muted d-flex justify-content-between align-items-center'>
            <h4>Answer Scripts ({answers.length})</h4>
            <InputGroup className='w-auto mb-3'>
              <FormControl
                placeholder='Enter Question Code'
                aria-label='Recipient&#39;s username'
                aria-describedby='basic-addon2'
                value={code}
                onChange={changeCode}
              />
              <Button
                variant='primary'
                id='button-addon2'
                size='sm'
                className='align-items-center d-flex fs-5'
                onClick={searchQuestion}
              >
                <m-icon>search</m-icon>
              </Button>
            </InputGroup>
          </Container>
          <Container className='flex-wrap-reverse w-100 d-flex justify-content-start align-items-start'>
            {answers.slice(0).reverse().map(({ code, title, subject, date }) => (
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
                        onClick={() => fetchAnswerScript(code)}
                        variant='primary'
                        className='px-3 py-0 d-flex rounded-pill fs-5'
                        size='sm'
                      >
                        <m-icon>task</m-icon>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Container>
        </Col>
      </Row>
    </Fragment>
  )
}

export default AnswerDashboard
