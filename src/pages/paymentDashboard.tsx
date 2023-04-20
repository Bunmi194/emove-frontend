import React, { useEffect, useState } from 'react'
import '../styles/paymentDashboard.styles.css'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import { UserNavbar } from '../components/UserNavbar'
import { Layout } from '../Layouts/Layout'
import { Button } from '../components/Button'
import { CardBulletPoint } from '../components/CardBulletPoint'


export const PaymentDashboard = () => {
  
  const [ tripData, setTripData ] = useState([{
    route: [
      {
        pickUpStation: "",
        destination: ""
      }
    ],
    price: "",
    status: "",
    createdAt: ""
  }])


  const details = JSON.parse(`${localStorage.getItem('userDetails')}`);

  const fetchTripDetails = async () => {
    const data = await fetch(`https://emove-teamc-new.onrender.com/v1/users/trips`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${details.token}`
      }
    });
    const result = await data.json();
    console.log("result: ", result);
    console.log("RT: ", result.data[0].route[0]);
    console.log("status: ", result.data[0].status);
    setTripData(result.data);
  }

  useEffect(()=> {
    fetchTripDetails()
  }, [])

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
                  <div className='paymentdashboard-body'>
                      {
                        tripData && (
                          <table>
                            <thead>
                              <tr>
                                <th>Pick Up</th>
                                <th>Destination</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Date Created</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tripData.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.route[0].pickUpStation}</td>
                                  <td>{item.route[0].destination}</td>
                                  <td>{item.price}</td>
                                  <td>{!item.status ? "Pending" : "Completed"}</td>
                                  <td>{item.createdAt}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )
                      }
                  </div>
              }
                customRightContentClasses='paymentdashboard-right-content'
                rightContent={
                    ""
                }
            />
          }
          header={<div className="paymentdashboard-header">Trip Details</div>}
      />
      </>
  )
}

