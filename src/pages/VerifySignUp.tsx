import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from '../components/Button'
import { SuccessIcon } from '../assets/SuccessIcon';
import { Card } from '../components/Card';


export const VerifySignUp = () => {
    const navigate = useNavigate();
    const [ state, setState ] = useState(false);
    const { token } = useParams();

    const verify = async () => {
        const status = await fetch(`https://emove-teamc-new.onrender.com/v1/users/verify/${token}`);
        const response = await status.json();
        console.log("response: ", response);
        if(response.message === "Account verified"){
            setState(true);
        }
    }
    const goToHome = () => {
        navigate("/login");
        return;
    }

    useEffect(()=> {
        verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <>
    {
        state && (
            <div style={{ backgroundColor: '#F2F4F7', height: '100vh' }}>
        <Card
          icon={<SuccessIcon />}
          headerText={'Account verified successfully'}
          bodyText={
            ' Congratulations! Your account has been successfully verified. Please login to access your account.'
          }
          
          button={<Button text={'Back to Login'} additionalClasses={'successButton'} handleClick={goToHome}/>}        
        />
      </div>

        )
    }
    </>
  )
}

