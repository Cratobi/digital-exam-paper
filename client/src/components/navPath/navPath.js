import React, { Fragment } from 'react'
import { useHistory, Link } from 'react-router-dom'

const NavPath = ({ paths = [], children }) => {
  const history = useHistory()

  return (
    <div className='flex mb-2 ml-1 text-xs align-middle'>
      <button
        onClick={() => history.goBack()}
        className='inline-flex px-2 py-1 align-middle bg-gray-200 rounded-full hover:bg-gray-300 active:bg-gray-900'
      >
        <m-icon>navigate_before</m-icon>
        Back
      </button>
      {paths.map(({ title, link }) => (
        <Fragment>
          <span className='p-1'>
            <m-icon>navigate_next</m-icon>
          </span>
          <Link to={link}>
            <button className='inline-flex my-1 text-blue-400 align-middle hover:border hover:underline'>
              {title}
            </button>
          </Link>
        </Fragment>
      ))}
      <span className='p-1'>
        <m-icon>navigate_next</m-icon>
      </span>
      <button className='inline-flex my-1 align-middle hover:border'>{children}</button>
    </div>
  )
}

export default NavPath
