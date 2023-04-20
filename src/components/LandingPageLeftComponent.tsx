import React from 'react';
import Typical from "react-typical";

const LeftComponent: React.FC = () => {
  return (
    <div className='landingPageBody'>
      <h3 className='landingPageHeader'>Need to go Out?
        </h3>
      <p>You no longer need cash! Make payment to go to your daily routes via E-move.</p>

      <span className='landingPageHowTo'>How to book a trip</span>

      <ul>
        <li>
          <span>Pick a route</span>
        </li>
        <li>
          <span>Make your booking</span>
        </li>
        <li>
          <span>Board a registered vehicle</span>
        </li>
        <li>
          <span>Make payment</span>
        </li>
        <li>
          <span>Arrive at your destination safely</span>
        </li>
      </ul>
    </div>
  )
}

export default LeftComponent
