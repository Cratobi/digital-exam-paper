import React from 'react'

const Content = ({ padding = 4, className, children }) => {
  return (
    <div
      className={`p-${padding} my-2 overflow-hidden bg-white rounded-md shadow-md hover:shadow active:shadow-xl
      ${className ? ' ' + className : null}`}
    >
      {children}
    </div>
  )
}

export default Content
