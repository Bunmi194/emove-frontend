import React from 'react'
import '../styles/navbar.styles.css'
import { RoadIcon } from '../assets/RoadIcon'
import { Link } from 'react-router-dom'


export const AdminNavbar = () => {
  return (
    <nav className='navigation'>
      <div className='logo'>
        <div className='sign-road-icon'>
          <RoadIcon />
           <Link className='navbar-icon-text' to=""> E-Move</Link>
        </div>
      </div>
      <div className='dropdown'>Hi, Admin | <Link to={"/login"}>Logout</Link></div>
    </nav>
  )
}
