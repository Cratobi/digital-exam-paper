import React from 'react'

const Header = () => {
  return (
    <header className='sticky z-10 flex items-center justify-between px-5 py-3 bg-white shadow h-header'>
      <div className='logo'>LOGO</div>
      <div className='flex items-center justify-end'>
        <button className='w-10 h-full p-1 border-0 rounded shadow'>
          <m-icon>people</m-icon>
        </button>
      </div>
    </header>
  )
}

export default Header
