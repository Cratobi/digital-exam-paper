import React, { Fragment, useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { state as userState } from '../../store/slice/user/userSlice'
import { createQuestion } from '../../store/slice/question/questionAsync'

import { Form, Row, Col, Card, Button, Container } from 'react-bootstrap'

const QuestionMaker = () => {
  // Controllers
  const reducer = (state, { type, payload }) => {
    let newState = [ ...state ]

    switch (type) {
      case 'add':
        newState = [ ...newState, payload ]
        break
      case 'remove':
        newState = newState.filter((e, i) => i !== payload)
        break
      case 'change_question':
        newState[payload.questionIndex].question = payload.value
        break
      case 'change_correct_answer':
        newState[payload.questionIndex].correct_answer = payload.value
        break
      case 'change_mark':
        newState[payload.questionIndex].mark = payload.value
        break
      case 'change_option':
        newState[payload.questionIndex].options[payload.optionIndex] = payload.value

        if (
          newState[payload.questionIndex].options.length !== 26 &&
          newState[payload.questionIndex].options[newState[payload.questionIndex].options.length - 1] !== ''
        ) {
          newState[payload.questionIndex].options = [ ...newState[payload.questionIndex].options, '' ]
        }
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
  const { user, status, error } = useSelector(userState)
  const [ title, setTitle ] = useState('')
  const [ subject, setSubject ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ time, setTime ] = useState('')
  const [ date, setDate ] = useState('')
  const [ questiontype, setQuestiontype ] = useState('')
  const [ questions, setQuestions ] = useReducer(reducer, [])
  const [ filled, setFilled ] = useState(false)

  // Controllers
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect(
  //   () => {
  //     if (loginStatus === 'login_failed') {
  //       setFailed(true)
  //     } else if (loginStatus === 'logged_in') {
  //       navigate('/home')
  //     }

  //     return function cleanup() {
  //       setEmail('')
  //       setPassword('')
  //     }
  //   },
  //   [ loginStatus ]
  // )
  useEffect(
    () => {
      if (title !== '' && subject !== '' && description !== '' && time !== '' && date !== '' && questions.lenth !== 0) {
        setFilled(true)
      } else {
        setFilled(false)
      }

      return function cleanup() {
        setFilled(false)
      }
    },
    [ title, subject, description, time, date, questions ]
  )

  const changeTitle = e => setTitle(e.target.value)
  const changeSubject = e => setSubject(e.target.value)
  const changeDescription = e => setDescription(e.target.value)
  const changeTime = e => setTime(e.target.value)
  const changeDate = e => setDate(e.target.value)
  const changeQuestiontype = e => setQuestiontype(e.target.value)
  const removeQuestion = questionIndex => setQuestions({ type: 'remove', payload: questionIndex })
  const changeQuestion = (e, questionIndex) =>
    setQuestions({ type: 'change_question', payload: { questionIndex, value: e.target.value } })
  const changeCorrectAnswer = (e, questionIndex) =>
    setQuestions({ type: 'change_correct_answer', payload: { questionIndex, value: e.target.value } })
  const changeMark = (e, questionIndex) =>
    setQuestions({ type: 'change_mark', payload: { questionIndex, value: e.target.value } })
  const changeOption = (e, questionIndex, optionIndex) =>
    setQuestions({ type: 'change_option', payload: { questionIndex, optionIndex, value: e.target.value } })
  const addQuestion = () => {
    if (questiontype === 'mcq')
      setQuestions({
        type    : 'add',
        payload : { type: 'mcq', question: '', mark: '', answer: '', correct_answer: '', options: [ '' ] },
      })
    else if (questiontype === 'sq')
      setQuestions({ type: 'add', payload: { type: 'sq', question: '', mark: '', answer: '', correct_answer: '' } })
    else if (questiontype === 'dq')
      setQuestions({ type: 'add', payload: { type: 'dq', question: '', mark: '', answer: '', correct_answer: '' } })
  }
  const submitForm = e => {
    e.preventDefault()

    dispatch(createQuestion({ created_by: user.id, title, subject, description, time, date, questions }))
    navigate('/')
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
          <Card className='my-4 ' style={{ minWidth: '41rem' }}>
            <Card.Body>
              <h5 className='p-2 mb-4 text-center'>QuestionMaker</h5>
              <Form.Group className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='text' onChange={changeTitle} value={title} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Subject</Form.Label>
                <Form.Control type='text' onChange={changeSubject} value={subject} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control as='textarea' onChange={changeDescription} value={description} />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label>Time (Minitues)</Form.Label>
                    <Form.Control type='number' onChange={changeTime} value={time} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type='datetime-local' onChange={changeDate} value={date} />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className='my-4' style={{ minWidth: '41rem' }}>
            <Card.Body>
              {questions.length !== 0 ? (
                questions.map(({ type, question, correct_answer, options, mark }, questionIndex) => (
                  <Fragment>
                    <Form.Group as={Row} className='mb-3'>
                      <Form.Group className='mb-3'>
                        <Row className='p-2'>
                          <Col sm={8} className='d-flex align-items-end'>
                            <Form.Label>{questionIndex + 1}. Question</Form.Label>
                          </Col>
                          <Col sm={4} className='d-flex justify-content-end'>
                            <Button variant='danger' className='d-flex' onClick={() => removeQuestion(questionIndex)}>
                              <m-icon>remove_circle_outline</m-icon>
                              <span className='ms-2'>Delete</span>
                            </Button>
                          </Col>
                        </Row>
                        <Form.Control as='textarea' onChange={e => changeQuestion(e, questionIndex)} value={question} />
                      </Form.Group>
                    </Form.Group>
                    {type === 'mcq' &&
                      options.map((option, optionIndex) => (
                        <Form.Group as={Row} className='mb-3'>
                          <Form.Label column sm={1} className='text-end'>
                            {alphabet[optionIndex]}
                          </Form.Label>
                          <Col sm={11}>
                            <Form.Control
                              onChange={e => changeOption(e, questionIndex, optionIndex)}
                              value={option}
                              type='text'
                            />
                          </Col>
                        </Form.Group>
                      ))}
                    <Container>
                      <Form.Group as={Row} className='py-2 rounded bg-light text-muted'>
                        <Form.Label column sm={2}>
                          Answer
                        </Form.Label>
                        <Col sm={6} className='text-end'>
                          {type === 'mcq' ? (
                            <Form.Select
                              onChange={e => changeCorrectAnswer(e, questionIndex)}
                              value={correct_answer}
                              defaultValue=''
                            >
                              <option value=''>Answer not Set</option>
                              {options.map(
                                (option, optionIndex) =>
                                  option !== '' ? (
                                    <option value={optionIndex}>
                                      {alphabet[optionIndex]}. {option}
                                    </option>
                                  ) : null
                              )}
                            </Form.Select>
                          ) : type === 'sq' ? (
                            <Form.Control
                              onChange={e => changeCorrectAnswer(e, questionIndex)}
                              value={correct_answer}
                              type='text'
                            />
                          ) : (
                            <Form.Control
                              as='textarea'
                              onChange={e => changeCorrectAnswer(e, questionIndex)}
                              value={correct_answer}
                            />
                          )}
                        </Col>
                        <Form.Label column sm={2} className='text-end'>
                          Mark
                        </Form.Label>
                        <Col sm={2} className='text-end'>
                          <Form.Control onChange={e => changeMark(e, questionIndex)} value={mark} type='number' />
                        </Col>
                      </Form.Group>
                    </Container>
                    <hr />
                  </Fragment>
                ))
              ) : (
                <h6 className='py-3 text-center text-muted'>Add a question</h6>
              )}
              <Col className='d-flex justify-content-end'>
                <Form.Select className='w-auto' onChange={changeQuestiontype} value={questiontype}>
                  <option value='' disabled>
                    Pick Question Type
                  </option>
                  <option value='mcq'>Multiple Choice Question</option>
                  <option value='sq'>Short Question</option>
                  <option value='dq'>Descriptive Question</option>
                </Form.Select>
                <Button className='text-nowrap ms-2' onClick={addQuestion} disabled={questiontype === ''}>
                  + Add Question
                </Button>
              </Col>
            </Card.Body>
            <Card.Footer className='text-end text-muted'>
              <Button onClick={submitForm} variant='success' type='submit' disabled={!filled}>
                Schedule Exam
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col className='col-3' />
      </Row>
    </Fragment>
  )
}

export default QuestionMaker
