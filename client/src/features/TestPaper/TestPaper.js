import React, { Fragment, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Countdown from 'react-countdown'

import { state as questionState } from '../../store/slice/question/questionSlice'
import { fetchQuestionByCode } from '../../store/slice/question/questionAsync'
import { createAnswer } from '../../store/slice/answer/answerAsync'

import { Form, Row, Col, Card, Button, Badge, Container } from 'react-bootstrap'

import { state } from '../../store/slice/question/questionSlice'
import { state as userState } from '../../store/slice/user/userSlice'

const TestPaper = () => {
  // Controllers
  const reducer = (state, { type, payload }) => {
    let newState = [ ...state ]

    switch (type) {
      case 'change_answer':
        newState[payload.questionIndex].answer = payload.value
        break
      case 'init':
        newState = JSON.parse(JSON.stringify(payload))
        break
      default:
        throw new Error()
    }
    return newState
  }

  // Model
  const { question, status, error } = useSelector(state)
  const { login_status, user } = useSelector(userState)

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

  const { code, title, subject, description, time, date, questions, created_by } = question
  const [ questionsPaper, setQuestionsPaper ] = useReducer(reducer, [])

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

  const params = useParams()
  useEffect(() => {
    const { code } = params
    dispatch(fetchQuestionByCode({ code }))
  }, [])
  useEffect(
    () => {
      setQuestionsPaper({ type: 'init', payload: questions })
    },
    [ questions ]
  )
  // useEffect(
  //   () => {
  //     // // const datenow =

  //     setInterval(() => {
  //       let startTime = time
  //       const min = Math.floor(startTime / 60)
  //       let sec = startTime - min * 60

  //       if (sec < 10) {
  //         sec = '0' + sec
  //       }

  //       // setTimeRemaining(`${min}:${sec}`)
  //       setTimeRemaining(time)
  //       // startTime
  //     }, 1000)
  //     // console.log(new Date().getSeconds())
  //     // return () => setTimeRemaining('')
  //   },
  //   [ time ]
  // )
  // useEffect(
  //   () => {
  //     if (title !== '' && subject !== '' && description !== '' && time !== '' && date !== '' && questions.lenth !== 0) {
  //       setFilled(true)
  //     } else {
  //       setFilled(false)
  //     }
  //     console.log(title, subject, description, time, date, questions)

  //     return  () => {
  //       setFilled(false)
  //     }
  //   },
  //   [ title, subject, description, time, date, questions ]
  // )
  const submitForm = e => {
    dispatch(
      createAnswer({
        code,
        answered_by : user.id,
        title,
        subject,
        description,
        time,
        date,
        questions   : questionsPaper,
        created_by,
      })
    )
    // navigate('/')
  }
  const changeAnswer = ({ e, questionIndex }) => {
    setQuestionsPaper({ type: 'change_answer', payload: { questionIndex, value: e.target.value } })
  }

  // View
  return (
    <Fragment>
      <Row className='h-100 w-100'>
        <Col className='col-3' />
        <Col
          as='form'
          className='flex-column w-100 d-flex justify-content-center align-items-center'
          onSubmit={submitForm}
        >
          <Container className='my-4 text-center'>
            <h4>{title}</h4>
            <p>{description}</p>
          </Container>
          <Card className='my-4' style={{ minWidth: '41rem' }}>
            <Card.Body>
              {questionsPaper.length !== 0 &&
                questionsPaper.map(({ type, question, options, mark }, questionIndex) => (
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
                                  onChange={e => changeAnswer({ e, questionIndex })}
                                />
                              ) : null
                          )
                        ) : type === 'sq' ? (
                          <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                              Answer
                            </Form.Label>
                            <Col sm={10}>
                              <Form.Control type='text' onChange={e => changeAnswer({ e, questionIndex })} />
                            </Col>
                          </Form.Group>
                        ) : type === 'dq' ? (
                          <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                              Answer
                            </Form.Label>
                            <Col sm={10}>
                              <Form.Control as='textarea' onChange={e => changeAnswer({ e, questionIndex })} />
                            </Col>
                          </Form.Group>
                        ) : null}
                      </Container>
                    </Container>
                  </Fragment>
                ))}
            </Card.Body>
            <Card.Footer className='text-end text-muted'>
              <Button variant='success' type='submit' onClick={submitForm}>
                End Exam
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col className='sticky py-4 flex-column d-flex align-items-end col-3'>
          <b className='p-2 text-center'>{subject}</b>
          <h2>
            <Countdown
              date={Date.now() + 5 * 60000}
              renderer={({ hours, minutes, seconds, completed }) => {
                if (seconds < 10) seconds = '0' + seconds
                if (minutes < 10) minutes = '0' + minutes

                if (completed) {
                  return <Badge bg='danger'>Times up!</Badge>
                } else {
                  if (hours === 0) {
                    return (
                      <Badge bg='primary'>
                        {minutes}:{seconds} Min
                      </Badge>
                    )
                  } else {
                    return (
                      <Badge bg='primary'>
                        {hours}:{minutes}:{seconds} Hour
                      </Badge>
                    )
                  }
                }
              }}
            />
            {/*  */}
          </h2>
        </Col>
      </Row>
    </Fragment>
  )
}

export default TestPaper
