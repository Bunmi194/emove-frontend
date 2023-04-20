import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from '../Layouts/Layout'
import { RoadIcon } from '../assets/RoadIcon'
import '../styles/signup.styles.css'
import SignUpImage from '../assets/sign-up-image.png'

export const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(gender, dateOfBirth);
    if(!email || !firstName || !lastName || !phoneNumber || !password || !confirmPassword || !gender || !dateOfBirth) {
      alert(`Please fill all fields`);
      return;
    };
    if(password !== confirmPassword) {
      alert(`Passwords do not match`);
      return;
    };

    setLoading(true);

    const res = await fetch(`https://emove-teamc-new.onrender.com/v1/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origins': '*',
      },
      body: JSON.stringify({ email, password, phoneNumber, firstName, lastName, dateOfBirth, gender }),
    })
    const result = await res.json();
    console.log("result: ", result)
    if (res.status === 200 || res.status === 201) {
      setLoading(false);
      navigate(`/checkemail/${email}`)
      console.log('sent');
    }else{
      setLoading(false);
      console.log('error: ', result.errors[0])
      setError(`Error: ${result.errors[0].msg}`);

    }
  }
  return (
    <div className='signup-container'>
      <Layout
        leftContent={
          <Layout
            leftContentWidth='40%'
            rightContentWidth='60%'
            additionalClasses='signup-custom-layout'
            leftContent={
              <div className='left-content-container'>
                <div className='signup-icon-container'>
                  <div className='sign-road-icon'>
                    <RoadIcon />
                    <h2 className='signup-icon-text'>E-Move</h2>
                  </div>
                </div>
                <div className='signup-form-items'>
                  {/* <div className='signup-icon-container'>
                <div className='sign-road-icon'>
                  <RoadIcon />
                  <h2 className='signup-icon-text'>E-Move</h2>
                </div>
              </div> */}
                  <p className='signup-header-text'>Create your account</p>
                  {error && (<span className="error">{error}</span>)}
                  <label htmlFor="signUp__firstName">First Name:</label>
                  <input
                    id="signUp__firstName"
                    type='text'
                    required
                    onChange={(e: any) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                  <label htmlFor="signUp__lastName">Last Name:</label>
                  <input
                    id="signUp__lastName"
                    type='text'
                    required
                    onChange={(e: any) => setLastName(e.target.value)}
                    value={lastName}
                  />
                  <label htmlFor="signUp__gender">Gender:</label>
                  <select name="gender" id="signUp__gender" onChange={(e:any) => setGender(e.target.value)}>
                    <option value="male" >Male</option>
                    <option value="female" selected={Boolean(gender === "female")}>Female</option>
                  </select>
                  <label htmlFor="signUp__dateOfBirth">Last Name:</label>
                  <input
                    id="signUp__dateOfBirth"
                    type='date'
                    required
                    onChange={(e: any) => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                  />
                  <label htmlFor="signUp__email">Email:</label>
                  <input
                    id="signUp__email"
                    type='email'
                    required
                    onChange={(e: any) => setEmail(e.target.value)}
                    value={email}
                  />
                  <label htmlFor="signUp__phoneNumber">Phone Number:</label>
                  <input
                    id="signUp__phoneNumber"
                    type='text'
                    required
                    onChange={(e: any) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                  />
                  <label htmlFor="signUp__password">Password:</label>
                  <input
                    id="signUp__password"
                    type='password'
                    required
                    onChange={(e: any) => setPassword(e.target.value)}
                    value={password}
                  />
                  <label htmlFor="signUp__confirmPassword">Confirm Password:</label>
                  <input
                    id="signUp__confirmPassword"
                    type='password'
                    required
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />

                  {loading ? (
                    <button className='signup-form-btn'>Just a Sec...</button>
                  ) : (
                    <button className='signup-form-btn' onClick={handleSubmit}>
                      Sign up
                    </button>
                  )}
                  <p className='sign-login-link'>
                    Already an account?
                    <Link to='/login'>Login</Link>
                  </p>
                </div>
              </div>
            }
            rightContent={
              <div className='signup-image-container'>
                {/* <img src= {SignUpImage} alt='Sign up' />      */}
              </div>
            }
          />
        }
      />
    </div>
  )
}
