import React, { useState } from 'react';
import '../styles/navbar.styles.css'
import { RoadIcon } from '../assets/RoadIcon'
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [ dropDown, setDropDown ] = useState(false);
  const userCompleteDetails: string = localStorage.getItem('userDetails') as unknown as string;
  const userObject = JSON.parse(userCompleteDetails).user;
  const navigate = useNavigate();
  // const ref:any = useRef(null);

  // useEffect(()=>{
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   }
  // })
  const toggleDropDown = () => {
    setDropDown((prev)=> !prev);
  }
  // const handleClickOutside = (event: any) => {
  //   if (ref.current && !ref.current.contains(event.target)) {
  //     if(dropDown){
  //       // setDropDown(false);
  //     }
  //   }
  // }
  const logout = () => {
    localStorage.removeItem('userDetails');
    navigate("/login");
  }
  return (
    <>
        <nav className='navigation' style={{paddingTop: "2rem"}}>
          <div className='logo'>
            <div className='sign-road-icon'>
              <RoadIcon />
              <h2 className='signup-icon-text'>E-Move</h2>
            </div>
          </div>
          <div className='routes-container'>
            <ul className='routes'>
              <li className='route'>Book a route</li>
              <li className='route'>Payment</li>
              <li className='route'>Wallet</li>
            </ul>
          </div>
          <div className='dropdown' style={{marginBottom: ""}}>Hi, {userObject.firstName}  <button style={{width: "20px"}} type='button' onClick={toggleDropDown}>&#8964;</button>
            <div style={{height: "50px"}}>
                { dropDown && (
                  <button style={{padding: "0.5rem", float: "right", textAlign: "right", backgroundColor: "#F2903D", color: "#fff", border: "none", borderRadius: "5px", fontWeight: "bold"}} onClick={logout} >Logout</button>
                )}
            </div>
          </div>
        </nav>
      </>
  )
}
