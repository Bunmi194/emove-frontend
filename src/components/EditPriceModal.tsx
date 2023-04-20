import React, { useState } from 'react'
import { Card } from './Card'
import '../styles/signup.styles.css'
import { Button } from './Button'
import { FaTimes } from 'react-icons/fa'



export const EditPriceModal = () => {
   
    const [newPrice, setNewPrice] = useState('')
    const [showModal, setShowModal] = useState(false)


    const handleOpenModal = () => {
        setShowModal(true)   
    }
  const handleCloseModal = () => {
     setShowModal(false)   
  }
    
    const onHandleClick = (e:any) => {
        e.preventDefault()
        handleCloseModal()
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
                  
                 <Button text={'Submit'} handleClick={onHandleClick} additionalClasses={'successButton dashboardButton'} />
              </form>
              </>
          }
      />
  )
}
