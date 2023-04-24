// import getParam from '../utils/getParams'
import { Button } from '../components/Button'
import { SuccessIcon } from '../assets/SuccessIcon'
import { EmailCard } from '../components/EmailCard';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { query } from 'express';
// import { useJwt } from "react-jwt";
// import jwt from "jsonwebtoken";



const GoogleAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("token");
  const dateOfBirth = queryParams.get("dateOfBirth");
  const driverStatus = queryParams.get("driverStatus");
  const email = queryParams.get("email");
  const firstName = queryParams.get("firstName");
  const gender = queryParams.get("gender");
  const isVerified = queryParams.get("isVerified");
  const lastName = queryParams.get("lastName");
  const password = queryParams.get("password");
  const roles = queryParams.get("roles");
  const wallet_balance = queryParams.get("wallet_balance");
  const routeOfOperation = queryParams.get("routeOfOperation");
  const _id = queryParams.get("_id");
  const __v = 0;

  // const { decode } = useJwt<DecodedToken>(`${secret}`) as unknown as MyUseJwt;
  


  const userDetails = {
    token,
    user: {
      dateOfBirth,
      driverStatus,
      email,
      firstName,
      gender,
      isVerified,
      lastName,
      password,
      roles,
      wallet_balance,
      routeOfOperation,
      __v,
      _id
    }
  }

  
  console.log("userDetails from Google: ", userDetails);
  console.log("userDetails from Google: ", userDetails.token);
  // const email = getParam(window.location.href);
  // const [ loading, setLoading ] = useState(false);

  const goToHome = () => {
    navigate("/login");
    return;
  }

  //https://emove-teamc-new.onrender.com
  const validateUserDetails = async () => {
    //send post request with token to validate
    const user = await fetch(`https://emove-teamc-new.onrender.com/v1/users/verifytoken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({token: token})
    });

    const result = await user.json();
    console.log("result: ", result);
    console.log("result: ", result.validate.email);
    console.log("result: ", result.validate.email === userDetails.user.email);

    if(result.validate.email && (result.validate.email === userDetails.user.email)){
      //success
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      navigate("/user/book_trip");
      return;
    }
    navigate("/login");
    return;
  }

  useEffect(()=>{
    validateUserDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
     

      <div style={{ backgroundColor: '#F2F4F7', height: '80vh', padding: "80px 0" }}>
        <EmailCard
          icon={<SuccessIcon />}
          headerText={'Authorizing with Google'}
          bodyText={
            ' Please wait for a second while we verify your account.'
          }
          
          button={<Button text={'Back to Login'} additionalClasses={'successButton'} handleClick={goToHome}/>}        
        />
      </div>
    </>
  )
}

export default GoogleAuth;
