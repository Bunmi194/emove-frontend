import { MouseEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { Layout } from '../Layouts/Layout'
import { StyledForgotPassword } from '../styles/forgotPassword.styles'
import getParam from '../utils/getParams'

export const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const href = window.location.href
  const token = getParam(href)

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (confirmPassword !== password) {
      setLoading(false);
      alert('Passwords do not match');
      return setError(true);
    }
    try {
      //https://emove-teamc-new.onrender.com
      const res = await fetch(`https://emove-teamc-new.onrender.com/v1/users/resetpassword/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origins': '*',
        },
        body: JSON.stringify({ password, confirmPassword }),
      })
      const result = await res.json();
      if (res.status === 200) {
        setLoading(false);
        console.log('OK');
        navigate('/success');
        return;
      }else{
        setLoading(false);
        alert(`Error: ${result.message}`);
        console.log("result: ", result);
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
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
              headerText='Reset Password'
              additionalNode={
                <div className='form-items'>
                  <div className='password-field'>
                    <label>Password:</label>
                    <input
                      type='password'
                      onChange={(e: any) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div className='password-field'>
                    <label>Confirm Password:</label>
                    <input
                      type='password'
                      onChange={(e: any) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                  </div>

                  <button className='signup-btn' onClick={handleSubmit}>
                    {loading ? "Just a Sec..." : "Reset Password"}
                  </button>
                </div>
              }
            />
          </div>
        }
      />
    </>
  )
}

//  <StyledForgotPassword>
//         <div className='card'>
//           <form className='signup'>
//             <h3 className='h3_text_fp'>Reset Password</h3>
//             {error && <p>Password and Confirm Password must be the same</p>}
//             <div className='password-field field'>
//               <label>Password:</label>
//               <input
//                 type='password'
//                 onChange={(e: any) => setPassword(e.target.value)}
//                 value={password}
//               />
//             </div>
//             <div className='password-field field'>
//               <label>Confirm Password:</label>
//               <input
//                 type='password'
//                 onChange={(e: any) => setConfirmPassword(e.target.value)}
//                 value={confirmPassword}
//               />
//             </div>
//             <button className='signup-btn' onClick={handleSubmit}>
//               SUBMIT
//             </button>
//           </form>
//         </div>
//       </StyledForgotPassword>
