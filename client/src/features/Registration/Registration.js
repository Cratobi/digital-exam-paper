import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { state } from '../../store/slice/user/userSlice'
import { createUser } from '../../store/slice/user/userAsync'

import { Form, Row, Col, Card, Button, Alert } from 'react-bootstrap'

const Registration = () => {
  // Model
  const { login_status, status, error } = useSelector(state)
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ gender, setGender ] = useState('')
  const [ birthDate, setBirthDate ] = useState('')
  const [ bloodGroup, setBloodGroup ] = useState('')
  const [ type, setType ] = useState('')
  const [ subject, setSubject ] = useState('')
  const [ institution, setInstitution ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ terms, setTerms ] = useState('')
  const [ filled, setFilled ] = useState(false)

  // Controllers
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(
    () => {
      if (login_status === 'logged_in') {
        navigate('/')
      }
    },
    [ login_status ]
  )

  useEffect(
    () => {
      if (
        name !== '' &&
        email !== '' &&
        gender !== '' &&
        birthDate !== '' &&
        bloodGroup !== '' &&
        type !== '' &&
        institution !== '' &&
        password !== '' &&
        terms
      ) {
        setFilled(true)
      } else {
        setFilled(false)
      }

      return function cleanup() {
        setFilled(false)
      }
    },
    [ name, email, gender, birthDate, bloodGroup, type, subject, institution, password, terms ]
  )

  const nameChange = e => {
    setName(e.target.value)
  }
  const emailChange = e => {
    setEmail(e.target.value)
  }
  const genderChange = e => {
    setGender(e.target.value)
  }
  const birthDateChange = e => {
    setBirthDate(e.target.value)
  }
  const bloodGroupChange = e => {
    setBloodGroup(e.target.value)
  }
  const typeChange = e => {
    setType(e.target.value)
  }
  const subjectChange = e => {
    setSubject(e.target.value)
  }
  const institutionChange = e => {
    setInstitution(e.target.value)
  }
  const passwordChange = e => {
    setPassword(e.target.value)
  }
  const termsChange = e => {
    setTerms(!terms)
  }
  const submitForm = e => {
    e.preventDefault()

    dispatch(
      createUser({
        name,
        email,
        gender,
        birthDate,
        bloodGroup,
        type,
        institution,
        password,
      })
    )
    if (status === 'success') navigate('/login')
  }

  // View
  return (
    <Fragment>
      <Row className='h-100 w-100'>
        <Col className='col-3' />
        <Col as='form' className='w-100 d-flex justify-content-center align-items-center' onSubmit={submitForm}>
          <Card style={{ minWidth: '28rem' }}>
            <Card.Body>
              <h5 className='p-2 mb-4 text-center'>Registration</h5>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={3} className='text-nowrap'>
                  Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control as='input' onChange={nameChange} value={name} type='text' />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={3} className='text-nowrap'>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control as='input' onChange={emailChange} value={email} type='email' />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={3} className='text-nowrap'>
                  Gender
                </Form.Label>
                <Col sm={9}>
                  <Form.Select onChange={genderChange} value={gender} defaultValue=''>
                    <option value='' disabled>
                      Pick your gender
                    </option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Others'>Other</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={3} className='text-nowrap'>
                  Birth Date
                </Form.Label>
                <Col sm={9}>
                  <Form.Control as='input' onChange={birthDateChange} value={birthDate} type='date' />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={3} className='text-nowrap'>
                  Blood Group
                </Form.Label>
                <Col sm={9}>
                  <Form.Select onChange={bloodGroupChange} value={bloodGroup} defaultValue=''>
                    <option value='' disabled>
                      Pick your blood group
                    </option>
                    <option value='A+'>A+ (A positive) </option>
                    <option value='A-'>A- (A negative) </option>
                    <option value='B+'>B+ (B positive) </option>
                    <option value='B-'>B- (B negative) </option>
                    <option value='O+'>O+ (O positive) </option>
                    <option value='O-'>O- (O negative) </option>
                    <option value='AB+'>AB+ (AB positive) </option>
                    <option value='AB-'>AB- (AB negative) </option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={3} className='text-nowrap'>
                  What are you?
                </Form.Label>
                <Col sm={9}>
                  <Form.Select onChange={typeChange} value={type} defaultValue=''>
                    <option value='' disabled>
                      Pick your type
                    </option>
                    <option value='Teacher'>Teacher</option>
                    <option value='Student'>Student</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              {type === 'Teacher' && (
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label column sm={3} className='text-nowrap'>
                    Subject
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control as='input' onChange={subjectChange} value={subject} type='email' />
                  </Col>
                </Form.Group>
              )}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={3} className='text-nowrap'>
                  Institution
                </Form.Label>
                <Col sm={9}>
                  <Form.Control as='input' onChange={institutionChange} value={institution} type='email' />
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
              <Form.Group className='mb-3'>
                <Form.Check
                  onChange={termsChange}
                  value={terms}
                  id='term'
                  type='checkbox'
                  label='You read and acknowledge the Terms of Service'
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer className='text-end text-muted'>
              <Button as={Link} to='/login' variant='outline-secondary' className='me-2' type='submit'>
                Sign in
              </Button>
              <Button onClick={submitForm} variant='success' type='submit' disabled={!filled}>
                Register
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col className='col-3' />
      </Row>
    </Fragment>
  )
}

export default Registration
