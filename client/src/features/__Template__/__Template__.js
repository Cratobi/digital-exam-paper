import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { state } from '../../store/slice/__template__/__template__Slice'
import { fetch__Template__ } from '../../store/slice/__template__/__template__Async'

const __Template__ = () => {
  // Model
  const { __template__, status, error } = useSelector(state)

  // Controllers
  const dispatch = useDispatch()

  // View
  return (
    <Fragment>
      <button onClick={() => dispatch(fetch__Template__({ _limit: 10 }))}> Test Dispatcher </button>{' '}
      {status === 'loading' ? <b>Loading...</b> : status === 'failed' ? <b>Error: {error}</b> : null}
      <br />
      <br />
      <table border='1'>
        <tr>
          <th>Title</th>
          <th>Body</th>
        </tr>
        {status === 'success' ? (
          __template__.map(({ id, title, body }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{body}</td>
            </tr>
          ))
        ) : null}
      </table>
    </Fragment>
  )
}

export default __Template__
