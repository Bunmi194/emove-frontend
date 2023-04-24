import React, { useState } from 'react'
import { EditPriceCard } from './EditPriceCard'
import '../styles/signup.styles.css'
import { Button } from './Button'
import ReactModal from 'react-modal';
import PromptInfo from "../components/PromptInfo";
import { useNavigate } from 'react-router-dom';


const customStyles = {
  content: {
    width: '50%',
    height: '30%',
    margin: 'auto'
  }
};


export const EditPriceModal = ({showModal, setShowModal}:any) => {
   
    const [newPrice, setNewPrice] = useState('')
    const [ priceLoading, setPriceLoading] = useState(false);
    const [ updated, setUpdated ] = useState(false);
    const navigate = useNavigate();


    
  const handleCloseModal = () => {
     setShowModal(false);
    
     return showModal
  }
    
  const userDet = JSON.parse(`${localStorage.getItem('userDetails')}`);
  // console.log("userDet: ", userDet);

    const onHandleClick = async (e:any) => {
        e.preventDefault();
        setShowModal(false)
        setPriceLoading(true)
        
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
        if(result.message === "Route updated successfully"){
          setPriceLoading(false);
          alert("Route updated successfully");
          window.location.href = "https://main--emove-teamc.netlify.app/#/admin/pricing";
          // window.location.reload();
          //modal
          setUpdated(true);
          return;
        }
        setPriceLoading(false);
        return;
        
  }  

  const closeAndReload = () => {
    setUpdated(false);
    navigate("/admin/driver");
    return;
  }
    
  return (
      <EditPriceCard
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
                  <ReactModal
                    isOpen={updated}
                    shouldCloseOnOverlayClick={true}
                    contentLabel={"Fund wallet"}
                    style={customStyles}>
                    
                    <button onClick={closeAndReload}
                      className='walletpage-closeModal'>
                      X</button>
                    <PromptInfo header="Price updated successfully." handleClickClose={closeAndReload}/>
                  </ReactModal>
                  
                 <Button text={priceLoading? "Updating": "Update"} handleClick={(e)=>onHandleClick(e)} additionalClasses={'successButton dashboardButton'} />
              </form>
              </>
          }
      />
  )
}
