import React, { useState } from 'react'
import '../styles/navbar.styles.css'
import { RoadIcon } from '../assets/RoadIcon'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export const UserNavbar = () => {
  const [dropDown, setDropDown] = useState(false)
  const { pathname } = useLocation()
  const userCompleteDetails: string = localStorage.getItem('userDetails') as unknown as string
  const userObject = JSON.parse(userCompleteDetails).user
  const navigate = useNavigate()

  // const ref:any = useRef(null);

  // useEffect(()=>{
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   }
  // })
  const toggleDropDown = () => {
    setDropDown((prev) => !prev)
  }
  // const handleClickOutside = (event: any) => {
  //   if (ref.current && !ref.current.contains(event.target)) {
  //     if(dropDown){
  //       // setDropDown(false);
  //     }
  //   }
  // }
  const logout = () => {
    localStorage.removeItem('userDetails')
    navigate('/login')
  }
  return (
    <>
      <nav className='navigation' style={{ paddingTop: '2rem' }}>
        <div className='logo'>
          <div className='sign-road-icon'>
            <RoadIcon />
            <h2 className='signup-icon-text'>E-Move</h2>
          </div>
        </div>
        <div className='routes-container'>
          <ul className='routes'>
            <li className='route'>
              <Link to='/user/book_trip' className={pathname === "/user/book_trip" ?'link-active':"" }>Book a route</Link>
            </li>
            <li className='route'>
              <Link to='/user/make_payment'  className={pathname === "/user/make_payment" ?'link-active':"" }>Trips</Link>
            </li>
            <li className='route'>
              <Link to='/user/wallet' className={pathname === "/user/wallet" ?'link-active':"" }>Wallet</Link>
            </li>
          </ul>
        </div>
        <div className='user-nav-dropdown' style={{ marginBottom: '' }}>
         <span>Hi, {userObject.firstName}{' '}</span> 
          <button style={{ width: '20px' }} className='user-dropdown-button' type='button' onClick={toggleDropDown}>
            &#8964;
          </button>
          <div style={{ height: '50px' }}>
            {dropDown && (
              <button 
                style={{
                     
                 background: "transparent",
                  padding: '0.5rem',
                  float: 'right',
                  textAlign: 'right',
                  backgroundColor: '#F2903D',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                }}
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
