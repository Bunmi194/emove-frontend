import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SuccessIcon } from '../assets/SuccessIcon'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import '../styles/button.styles.css'

export const SuccessPage = () => {

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
    return;
  }
  return (
    <div style={{ backgroundColor: '#F2F4F7', height:"100vh" }}>
      <Card
        icon={<SuccessIcon />}
        headerText={'Success'}
        bodyText={'Your password has been changed successfully. Login to access your account'}
        button={<Button text={'Continue to Login'} additionalClasses={'successButton'} handleClick={goToLogin} />}
      />
    </div>
  )
}
