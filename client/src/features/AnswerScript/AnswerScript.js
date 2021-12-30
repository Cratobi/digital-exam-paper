import React, { Fragment, useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { state } from '../../store/slice/answer/answerSlice'
import { state as userState } from '../../store/slice/user/userSlice'
import { fetchAnswerByCode } from '../../store/slice/answer/answerAsync'

import { Form, Row, Col, Card, Button, Badge, Container } from 'react-bootstrap'

const AnswerScript = () => {
  const { answer, status, error } = useSelector(state)
  const { login_status } = useSelector(userState)

  // Controllers
  const reducer = (state, { type, payload }) => {
    let newState = [ ...state ]
    console.log(payload)

    switch (type) {
      case 'add':
        newState.answersPaper = [ ...newState, payload.value ]
      case 'init':
        newState = payload
        break
      default:
        throw new Error()
    }

    return newState
  }

  // Model
  const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  const { code, title, subject, description, time, date, questions } = answer
  // const { loginStatus, status, error } = useSelector(state)

  // Controllers
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(
    () => {
      if (login_status !== 'logged_in') {
        navigate('/login')
      }
    },
    [ login_status ]
  )

  useEffect(() => {
    const { code } = params
    console.log(code)
    dispatch(fetchAnswerByCode({ code }))
  }, [])

  // View
  return (
    <Fragment>
      <Row className='h-100 w-100'>
        <Col sm={3} />
        <Col as='form' sm={6} className='flex-column w-100 d-flex justify-content-center align-items-center'>
          <Container className='my-4 text-center'>
            <small className='p-2 text-muted'>{subject}</small>
            <h4>{title}</h4>
            <p>{description}</p>
          </Container>
          <Card className='my-4' style={{ minWidth: '41rem' }}>
            <Card.Body>
              {questions &&
                questions.length !== 0 &&
                questions.map(({ type, question, options, mark, answer, correct_answer }, questionIndex) => (
                  <Fragment key={type + questionIndex}>
                    <Container className='px-0 mb-4'>
                      <h6>
                        {questionIndex + 1}. {question}
                        <small className='float-end text-muted'>Mark: {mark}</small>
                      </h6>
                      <Container className='px-2'>
                        {type === 'mcq' ? (
                          options.map(
                            (option, optionIndex) =>
                              option !== '' ? (
                                <Form.Check
                                  key={option + optionIndex}
                                  type='radio'
                                  label={alphabet[optionIndex] + '. ' + option}
                                  name={`question-${questionIndex}`}
                                  id={`question-${questionIndex}-${optionIndex}`}
                                  value={optionIndex}
                                />
                              ) : null
                          )
                        ) : type === 'sq' ? (
                          <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                              Answer
                            </Form.Label>
                            <Col sm={10}>
                              <Form.Control type='text' defaultValue={answer} disabled />
                            </Col>
                          </Form.Group>
                        ) : type === 'dq' ? (
                          <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                              Answer
                            </Form.Label>
                            <Col sm={10}>
                              <Form.Control as='textarea' />
                            </Col>
                          </Form.Group>
                        ) : null}
                        <p className='mt-2 text-primary'>Correct Answer: {correct_answer}</p>
                      </Container>
                    </Container>
                  </Fragment>
                ))}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3} />
      </Row>
    </Fragment>
  )
}

export default AnswerScript
