import React from 'react'
import '../styles/viewPaymentMethod.styles.css'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import {  UserNavbar } from '../components/UserNavbar'
import { Layout } from '../Layouts/Layout'
import { Button } from '../components/Button'
import { DeleteIcon } from '../components/DeleteIcon'
import { EditButtonIcon } from '../components/EditButtonIcon'


export const ViewPaymentMethod = () => {
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
              leftContentWidth='65%'
                rightContentWidth='35%'
                additionalClasses='dashboard-journey-layout'
              leftContent={
                  <div className='viewpayment-body'>
                      <div className="viewpayment-header-payment-choice">Mastercard</div>  
                      <div className="viewpayment-viewcard">
                          <div className="viewpayment-carddetails">
                           <p className='viewpayment-carddetails-content'> **** **** **** 9825</p>    
                          </div>
                          <div className="viewpayment-carddetails">
                            <p className='viewpayment-carddetails-head'> Expiry Date</p>   
                            <p className='viewpayment-carddetails-content'> 05/25</p>   
                          </div>
                          <div className="viewpayment-carddetails">
                             <p className='viewpayment-carddetails-head'> Expiry Date</p>   
                            <p className='viewpayment-carddetails-content'> 05/25</p>   
                          </div>
                      </div>
                      <div className="viewpayment-editbutton">
                          <EditButtonIcon/> <span>Edit</span>
                      </div>
                      <div className="viewpayment-deletebutton">
                          <DeleteIcon/> <span>Remove payment method</span>
                      </div>
                      
                      {/* <div className="viewpayment-payment-choice">
                        <CardBulletPoint/> <span>Card</span>
                      </div>   */}
                  </div>
              }
                customRightContentClasses='viewpayment-right-content'
                rightContent={
                     <div className="viewpayment-card">
                         
                      </div>
                }
            />
          }
          header={<div className="viewpayment-header">&#8592; Go Back</div>}
      />
      </>
  )
}

