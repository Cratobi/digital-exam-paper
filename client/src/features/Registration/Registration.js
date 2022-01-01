import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { state } from '../../store/slice/login/loginSlice'
// import { fetchLogin } from '../../store/slice/login/loginAsync'

import { Form, Row, Col, Card, Button } from 'react-bootstrap'

const Login = () => {
  // Model
  // const { login, status, error } = useSelector(state)

  // Controllers
  // const dispatch = useDispatch()

  // View
  return (
    <Fragment>
      <Row className='h-100 w-100'>
        <Col className='col-3' />
        <Col as='form' className='w-100 d-flex justify-content-center align-items-center'>
          <Card style={{ 'min-width': '20rem' }}>
            <Card.Body>
              <h5 className='p-2 mb-4 text-center'>Login</h5>
              <Form>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Control type='email' placeholder='Enter email' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Control type='password' placeholder='Password' />
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer className='text-end text-muted'>
              <Button variant='outline-secondary' className='me-2' type='submit'>
                Registration
              </Button>
              <Button variant='success' type='submit'>
                Sign in
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col className='col-3' />
      </Row>
      {/* {status === 'loading' ? <b>Loading...</b> : status === 'failed' ? <b>Error: {error}</b> : null}
      <br />
      <br />
      <table border='1'>
        <tr>
          <th>Title</th>
          <th>Body</th>
        </tr>
        {status === 'success' ? (
          login.map(({ id, title, body }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{body}</td>
            </tr>
          ))
        ) : null}
      </table> */}
    </Fragment>
  )
}

export default Login
