import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div style={headerContainer} className='landingPage__headerContainer'>
      <div className='landingPage__logo'>
        <div>
          <img src='/emove-logo.png' alt='logo' className='landingPage__logoImage' />
        </div>
        <div>
          <span className='landingPage__appName'>E-Move</span>
        </div>
      </div>
      <div className='landingPage__rightHeader'>
        <Link to='/about' style={{ textDecoration: 'none' }}>
          <span className='landingPage__navItem'>About</span>
        </Link>
        <span className='landingPage__pipe'></span>
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <span className='landingPage__navItem'>Login</span>
        </Link>
        <Link to='/signup' style={{ textDecoration: 'none' }}>
          <button className='landingPage__navItemButton'>Get Started</button>
        </Link>
      </div>
    </div>
  )
}

const headerContainer = {
  display: 'flex',
  width: '100%',
  margin: 'auto',
}

export default Header
