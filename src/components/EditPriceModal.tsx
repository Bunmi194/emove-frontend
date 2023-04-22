import React, { useState } from 'react'
import { Card } from './Card'
import '../styles/signup.styles.css'
import { Button } from './Button'



export const EditPriceModal = ({showModal, setShowModal}:any) => {
   
    const [newPrice, setNewPrice] = useState('')


    
  const handleCloseModal = () => {
     setShowModal(false);
    
     return showModal
  }
    
  const userDet = JSON.parse(`${localStorage.getItem('userDetails')}`);
  // console.log("userDet: ", userDet);

    const onHandleClick = async (e:any) => {
        e.preventDefault();
        setShowModal(false)
        
        const id = localStorage.getItem('tripId');
        console.log("tripId: ", id);
        console.log("token: ", userDet.token);

        handleCloseModal();
        //fix close modal
        //s://emove-teamc-new.onrender.com
        const res = await fetch(`https://emove-teamc-new.onrender.com/v1/routes/edit/${id}`, {
          method: "POST",
          headers: {
            "authorization": `Bearer ${userDet.token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({price: newPrice})
        })
        const result = await res.json();
        console.log("resultEDITTRIPFARE: ", result);
        
  }  
    
  return (
      <Card
          headerText='Edit Price'
        //    button={<Button text={'Submit'} additionalClasses={'successButton'} />}
          additionalNode={
              <>
              {/* <FaTimes onClick={handleCloseModal} className="close" />  */}
              <form className='signup-form-items'>
                  
                  <div className="account-number">
                    <label>New Price:</label>
                    <input
                        type='text'
                              required
                              placeholder='NGN 0.00'
                        onChange={(e: any) => setNewPrice(e.target.value)}
                        value={newPrice}
                    />    
                  </div>
                  
                 <Button text={'Submit'} handleClick={(e)=>onHandleClick(e)} additionalClasses={'successButton dashboardButton'} />
              </form>
              </>
          }
      />
  )
}
