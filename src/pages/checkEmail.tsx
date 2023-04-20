import getParam from '../utils/getParams'
import { Button } from '../components/Button'
import { EnvelopeIcon } from '../assets/EnvelopeIcon'
import { Card } from '../components/Card';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CheckEmail = () => {
  const navigate = useNavigate();
  const email = getParam(window.location.href);
  const [ loading, setLoading ] = useState(false);

  const goToHome = () => {
    navigate("/login");
    return;
  }

  const handleClick = async (e: any) => {
    e.preventDefault();
    console.log(email);
    setLoading(true);
    const res = await fetch(`https://emove-teamc-new.onrender.com/v1/users/forgotpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origins': '*',
      },
      body: JSON.stringify({ email }),
    })
    console.log(res)
    if (res.status === 200) {
      console.log('sent');
      setLoading(true);
    }else{
      setLoading(true);
      return;
    }
  }
  return (
    <>
      {/* <StyledForgotPassword>
        <div className='card'>
          <h3 className='h3_text_fp'>Check your email</h3>
          <p>
            We sent a password reset link to your email. Please click the link to reset your
            password.
          </p>
          <p className='login_link'> Didn’t received an email? 
             <Button handleClick={handleClick} text={"Click to Resend"} additionalClasses={"checkEmailButton"}  />
          </p>
        </div>
          </StyledForgotPassword> */}

      <div style={{ backgroundColor: '#F2F4F7', height: '100vh' }}>
        <Card
          icon={<EnvelopeIcon />}
          headerText={'Check your email'}
          bodyText={
            ' We sent a password reset link to your email. Please click the link to reset your password.'
          }
          additionalNode={
            
            <p style={{ color: "#012a4a", fontSize: "14px" }}>
              
              Didn't received an email?
              <Button
                disabled={loading}
                handleClick={handleClick}
                text={'Click to Resend'}
                additionalClasses={'checkEmailButton'}
              />
            </p>
          }
          button={<Button text={'Back to Login'} additionalClasses={'successButton'} handleClick={goToHome}/>}        
        />
      </div>
    </>
  )
}

export default CheckEmail
