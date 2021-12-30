import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Header = ({ showLogout, name, logout }) => {
  return (
    <header className='sticky z-10 px-4 py-2 bg-white shadow-sm align-items-center justify-content-between d-flex'>
      <div className='d-flex align-items-center'>
        <i className='fs-4 pe-2'>
          <m-icon>drive_file_rename_outline</m-icon>
        </i>
        <Link to='/'>
          <h5 className='p-0 m-0 text-black font-monospace'>Digital Exam Paper</h5>
        </Link>
      </div>
      {showLogout ? (
        <div className='d-flex align-items-center justify-content-end'>
          <b className='mx-2 fs-5 font-monospace'>{name}</b>
          <Button
            variant='dark'
            size='sm'
            className='px-3 mx-1 shadow-sm align-items-center rounded-pill d-flex fs-5'
            onClick={logout}
          >
            <m-icon>output</m-icon> <small className='ms-2 fs-6'>Log Out</small>
          </Button>
        </div>
      ) : null}
    </header>
  )
}

export default Header
