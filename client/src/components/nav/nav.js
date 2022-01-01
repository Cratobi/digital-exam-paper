import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ({ tabs = [] }) => {
  return (
    <section className='nav'>
      {tabs.map(
        ({ title, icon, path, badge, is_label, is_active }) =>
          is_label ? (
            <div className='label'>{title}</div>
          ) : (
            <NavLink to={path} className='tab' activeClassName='active'>
              <m-icon>{icon}</m-icon> {title}{' '}
              {badge > 0 && (
                <div className='flex items-center justify-center w-4 h-4 ml-2 text-xs text-white bg-red-400 rounded-md'>
                  {badge}
                </div>
              )}
            </NavLink>
          )
      )}
    </section>
  )
}

export default Nav
