import React from 'react'
import '../styles/navbar.styles.css'
import { RoadIcon } from '../assets/RoadIcon'
import { Link, useNavigate } from 'react-router-dom'


export const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className='navigation'>
      <div className='logo'>
        <div className='sign-road-icon'>
          <RoadIcon />
           <Link className='navbar-icon-text' to=""> E-Move</Link>
        </div>
      </div>
      <div className='dropdown'>
        <div className='navbar__adminName'>
          Hi, Admin
        </div>  
        <div>
          <button className='navBar__logout' onClick={handleClick}>Logout</button>
        </div>
      </div>
    </nav>
  )
}
