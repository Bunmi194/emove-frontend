import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { Layout } from '../Layouts/Layout'
import "../styles/forgotPassword.styles.css"



const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(email)
    const res = await fetch(`https://emove-teamc-new.onrender.com/v1/users/forgotpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origins': '*',
      },
      body: JSON.stringify({ email }),
    })
    console.log(res)
    const result = await res.json();
    console.log('result: ', result);
    if (res.status === 200) {
      setLoading(false);
      navigate(`/checkemail/${email}`)
      console.log('sent')
    }else{
      setLoading(false);
      alert(result.message);
      return;
    }
  }
  return (
    <>
      <Layout
        leftContentWidth='100%'
        leftContent={
          <div className='cover-div'>
            <Card
          headerText='Forgot Password'
          additionalNode={ 
            // <form className='signup'>
              <div className="form-items">
                <p>
                 Enter the email associated with your account and we'll send an email with
                 instructions to reset your password
               </p>
               <label>Email:</label>
                 <input
                   type='email'
                   required
                   onChange={(e: any) => setEmail(e.target.value)}
                   value={email}
               />
                {loading ? (
                 <button className='signup-btn'>Just a Sec...</button>
               ) : (
                 <button className='signup-btn' onClick={handleSubmit}>Reset Password</button>
              )}
              <p className='login_link'>
            <Link to='/login'>Back to Login</Link>
          </p>
            </div>
            
          //  </form>
          }
        />
          </div>
        } />
      {/* <StyledForgotPassword> */}
        {/* <div className='card'>
          <h3 className='h3_text_fp'>Forgot Password</h3>
          <form className='signup' onSubmit={handleSubmit}>
            <div className="form-items">
               <p>
                Enter the email associated with your account and we'll send an email with
                instructions to reset your password
              </p>
              <label>Email:</label>
                <input
                  type='email'
                  required
                  onChange={(e: any) => setEmail(e.target.value)}
                  value={email}
              />
               {loading ? (
                <button className='signup-btn'>Just a Sec...</button>
              ) : (
                <button className='signup-btn'>SUBMIT</button>
              )}
            </div>
          </form>
            <p className='login_link'>
            <Link to='/login'>Back to Login</Link>
          </p>
        </div> */}
      {/* </StyledForgotPassword> */}
    </>
  )
}

export default ForgotPassword


//  <div className='card'>
//           <h3 className='h3_text_fp'>Forgot Password</h3>
//           <form className='signup' onSubmit={handleSubmit}>
//             <div className="form-items">
//                <p>
//                 Enter the email associated with your account and we'll send an email with
//                 instructions to reset your password
//               </p>
//               <label>Email:</label>
//                 <input
//                   type='email'
//                   required
//                   onChange={(e: any) => setEmail(e.target.value)}
//                   value={email}
//               />
//                {loading ? (
//                 <button className='signup-btn'>Just a Sec...</button>
//               ) : (
//                 <button className='signup-btn'>SUBMIT</button>
//               )}
//             </div>
//           </form>
//             <p className='login_link'>
//             <Link to='/login'>Back to Login</Link>
//           </p>
//         </div>