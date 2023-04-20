import React, { useState } from 'react'
import { Card } from './Card'
import '../styles/signup.styles.css'
import { Button } from './Button'
import { FaTimes } from 'react-icons/fa'
import { Navigate, useNavigate } from 'react-router-dom'



export const FormModal = () => {

    const data = JSON.parse(`${localStorage.getItem('userDetails')}`);
    const [selectedValue, setSelectedValue] = useState('')
    const [fullName, setFullName] = useState(`${data.user.firstName} ${data.user.lastName}`);
    const [email, setEmail] = useState(`${data.user.email}`);
    const [amount, setAmount] = useState("1000");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();


    const handleOpenModal = () => {
        setShowModal(true)   
    }
  const handleCloseModal = () => {
     setShowModal(false)   
  }

 
    
    const onHandleClick = async (e:any) => {
        e.preventDefault();
        handleCloseModal();
        const response = await fetch(`https://emove-teamc-new.onrender.com/v1/users/paystack/pay`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            email,
            full_name: fullName,
            amount,
          })      
        })
        const result = await response.json();
        console.log("Pay result: ", result);
        if(result.status){
          localStorage.setItem('payment', JSON.stringify({ state: `${result.data.reference}`}));
          window.location.href = `${result.data.authorization_url}`;
          
          return;
        }
        alert(`Error: ${result.message} `);
        return;
  }  
    
  return (
      <Card
          headerText='Fund Wallet'
        //    button={<Button text={'Submit'} additionalClasses={'successButton'} />}
          additionalNode={
              <>
              {/* <FaTimes onClick={handleCloseModal} className="close" />  */}
              <form className='signup-form-items' >
                  <div className="choose-bank">
                    <label>Fullname:</label>
                    <input
                        type='text'
                        required
                        onChange={(e: any) => setFullName(e.target.value)}
                        value={fullName}
                    /> 
                  </div>
                  <div className="account-number">
                    <label>Email:</label>
                    <input
                        type='text'
                        required
                        onChange={(e: any) => setEmail(e.target.value)}
                        value={email}
                    />    
                  </div>
                  <div className="amount">
                    <label>Amount:</label>
                    <input
                        type='text'
                        required
                        onChange={(e: any) => setAmount(e.target.value)}
                        value={amount}
                    />    
                  </div>
                 <Button text={'Submit'} handleClick={onHandleClick} additionalClasses={'successButton dashboardButton'} />
              </form>
              </>
          }
      />
  )
}
