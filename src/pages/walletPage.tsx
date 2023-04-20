import React, { useEffect, useState } from 'react'
import '../styles/walletPage.styles.css'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import {  UserNavbar } from '../components/UserNavbar'
import { Layout } from '../Layouts/Layout'
import { Button } from '../components/Button'
import { CardBulletPoint } from '../components/CardBulletPoint'
import { FileIcon } from '../components/FileIcon'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { FormModal } from '../components/FormModal'
import { FaTimes } from 'react-icons/fa'
import ReactModal from 'react-modal'



export const WalletPage = () => {
  
  const navigate = useNavigate()
  const details = JSON.parse(`${localStorage.getItem('userDetails')}`);

  

  const [showModal, setShowModal] = useState(false);
  const [ transactions, setTransactions ] = useState( [
        {
            _id: "",
            status: "",
            transactionType: "",
            userId: "",
            amount: 0,
            createdAt: "",
            updatedAt: "",
        }
      ]
  );
  //data.user.wallet_balance
  
  const [ data, setData ] = useState(details);
  const payment = localStorage.getItem("payment");

  useEffect(() =>{
    console.log("Details: ", details)
    if(payment){

      const check = async () => {
        const reference = localStorage.getItem("payment") as string;
        console.log("ref: ", reference);
        const ref = JSON.parse(reference);
        localStorage.removeItem("payment");
        const paymentStatus = verifyPayment(ref.state);
        const status = await paymentStatus;
        if(status){
          //successful payment
          navigate('/user/wallet');
        }
        console.log("paymentStatus: ", await paymentStatus);
        console.log("ref: ", ref);
      }
      check()
    }
    updateUser();
    fetchTransactions()
  }, [payment]);



  console.log("local: ", JSON.parse(`${localStorage.getItem('userDetails')}`))
  console.log("data: ", data);
  console.log("data: ", data.token);


  const userIdInStorage = JSON.parse(`${localStorage.getItem("userDetails")}`).user._id;
  
  const updateUser = async () => {
    console.log("hello")
    const userData = await fetch(`https://emove-teamc-new.onrender.com/v1/users/user/${userIdInStorage}`);
    const result = await userData.json();
    console.log("result.user: ", result.user)
    if(result.user){
      const det = JSON.parse(`${localStorage.getItem('userDetails')}`);
      const user = {...det, user:{
        ...det.user,
        wallet_balance: result.user.wallet_balance
      }};

      console.log("UUSERS: ", user)
      console.log("DDETAILS: ", det)
      localStorage.setItem("userDetails", JSON.stringify(user));
      const newDetails = JSON.parse(`${localStorage.getItem('userDetails')}`);
      setData(newDetails);
      console.log("BOOOP.user: ", JSON.stringify(newDetails))
      console.log("new.ego: ", newDetails.user.wallet_balance)
    }
  }

  

  const fetchTransactions = async () => {
    const transactions = await fetch(`https://emove-teamc-new.onrender.com/v1/users/transaction/${userIdInStorage}`);
    const result = await transactions.json();
    console.log("fetchTransactions: ",result);
    setTransactions(result.transaction)

  }
  // useEffect(updateRecord, [])

  const handleOpenModal = () => {
        setShowModal(true)   
    }
  const handleCloseModal = () => {
     setShowModal(false)   
  }

  const verifyPayment = async (ref:string) => {
    const verify = await fetch(`https://emove-teamc-new.onrender.com/v1/users/paystack/callback?reference=${ref}`);
    const result = await verify.json();
    if(!result || result.message !== "Success"){
      return false;
    }
    if(result.message === "Success"){
      console.log("USER:::::",result.user)
      const user = result.user;
      setData({...details, user});
      return true;
    }
    return false;
  }

  //make verify call
  


  return (
      <>
        <DashboardLayout
          navbar={<UserNavbar />}
          navbarHeight='15%'
          bodyContainerHeight='85%'
          mainContentHeight='85%'
          headerHeight='15%'
          customLeftContentClasses='dashboard-layout-header'
          customRightContentClasses='dashboard-layout-content'
          additionalClasses='dashboard-layout-containers'
          mainContent={
              <Layout
                  useTopBottomLayout
              leftContentWidth='35%'
                rightContentWidth='65%'
                additionalClasses='dashboard-journey-layout'
              leftContent={
                  <div className='walletpage-balance-card' style={{zIndex: `${showModal? "0":"1"}`}}>
                    <div className="walletpage-card-description">
                      <p className='walletpage-card-description-header'>Available Amount</p>
                      <p className='walletpage-card-description-content'>&#8358; {data.user.wallet_balance}</p>
                  </div>
                  <div className="walletpage-fundwallet">
                    <button  onClick={handleOpenModal} >Fund wallet </button>
                    <ReactModal
                      isOpen={showModal}
                      shouldCloseOnOverlayClick={true}
                      contentLabel={"Fund wallet"}>
                      <button onClick={handleCloseModal}
                        className='walletpage-closeModal'>
                        X</button>
                       <FormModal/>
                      </ReactModal>
                     
                   
                  </div>
                  </div>
                  
              }
                customRightContentClasses='walletpage-right-content'
                rightContent={

                    transactions[0]._id ? (
                      <div style={{paddingTop: "1500px", width: "100%", zIndex: "0"}}><table>
                        <thead>
                          <tr>
                            <th>Transaction Type</th>
                            <th>Amount</th>
                            <th>Reference</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((item:any, index:any) => (
                            <tr key={index}>
                              <td>{item.transactionType}</td>
                              <td>{item.amount}</td>
                              <td>{`Emove-${item._id}`}</td>
                              <td>{item.createdAt}</td>
                              <td>{item.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      </div>
                    )
                    :
                    <div className='walletpage-transaction'>
                    <div className="walletpage-transaction-subheaders">
                      <p>Activity</p>
                      <p>Clear all</p>
                    </div>
                    <div className="walletpage-transaction-list">
                      <div className="walletpage-transaction-list-empty">
                      <FileIcon />
                      <p className='walletpage-transaction-list-empty-header'>No Transaction</p>
                      <p className='walletpage-transaction-list-empty-innerText'>You have not made any transaction yet.</p>

                      </div>
                    </div>
                  </div>
                  }
                
            />
          }
          header={<div className="walletpage-header">Wallet</div>}
      />
      </>
  )
}

