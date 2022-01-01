import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, to, icon, onClick, style, chip, small, white, tabIndex, className }) => {
  if (to)
    return (
      <Link to={to}>
        <button
          className={`inline-flex justify-center mx-1 my-2 text-gray-900 align-middle bg-gray-300 border-none hover:bg-gray-400
            {({ chip }) => (chip ? 'rounded-full' : 'rounded')}
            {({ small }) => (small ? ' ' : '1rem 1.2rem')}
            {className}`}
          style={style}
          onClick={onClick}
          small={small}
          chip={chip}
          tabIndex={tabIndex}
        >
          {icon && <m-icon className='pr-1'>{icon}</m-icon>}
          {children}
        </button>
      </Link>
    )
  else
    return (
      <button
        className={`inline-flex justify-center mx-1 my-2 text-gray-900 align-middle bg-gray-300 border-none hover:bg-gray-400
          {({ chip }) => (chip ? 'rounded-full' : 'rounded')}
          {({ small }) => (small ? ' ' : '1rem 1.2rem')}
          {className}`}
        style={style}
        onClick={onClick}
        small={small}
        chip={chip}
        white={white}
        tabIndex={tabIndex}
      >
        {icon && <m-icon className='pr-1'>{icon}</m-icon>}
        {children}
      </button>
    )
}

export default Button
