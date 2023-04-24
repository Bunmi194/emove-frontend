import React, { useState, useEffect } from 'react'
import '../styles/adminDashboard.styles.css'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import { Layout } from '../Layouts/Layout'
// import { Button } from '../components/Button'
import { Sidebar } from '../components/Sidebar'
import { AdminNavbar } from '../components/AdminNavbar'
// import { ModalContext } from '../context/admindashContext'
// import EditPrice from '../components/EditPage'
import { FaCarSide } from 'react-icons/fa'
// import { BeatLoader } from 'react-spinners'
import BarChart from '../components/Barchart'

export const AdminDashboardPage = () => {

  const [ passengers, setPassengers ] = useState(0);
  const [ drivers, setDrivers ] = useState(0);

  const userDetails = JSON.parse(`${localStorage.getItem("userDetails")}`);
  // console.log("userDetails: ", userDetails)

  const fetchDriversCount = async () => {
    const driversCount = await fetch("https://emove-teamc-new.onrender.com/v1/users/drivers/count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${userDetails.token}`
      }
    });

    const result = await driversCount.json();
    setDrivers(result.countOfDrivers);
  }

  const fetchPassengersCount = async () => {
    const passengersCount = await fetch("https://emove-teamc-new.onrender.com/v1/users/passengers/count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${userDetails.token}`
      }
    });

    const result = await passengersCount.json();
    setPassengers(result.userCount);
    console.log("passengers: ", passengers)
    console.log("result: ", result)
  }

  useEffect(()=>{
    fetchDriversCount();
    fetchPassengersCount();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data: Array<[string, number]> = [
    ['Jan', 15000],
    ['Feb', 18000],
    ['Mar', 20000],
    ['Apr', 10000],
    ['May', 0],
    ['Jun', 0],
    ['Jul', 0],
    ['Aug', 0],
    ['Sep', 0],
    ['Oct', 0],
    ['Nov', 0],
    ['Dec', 0],
  ]
  return (
    <>
      <DashboardLayout
        navbar={<AdminNavbar />}
        navbarHeight='15%'
        bodyContainerHeight='85%'
        mainContentHeight='85%'
        headerHeight='15%'
        customLeftContentClasses='dashboard-layout-header'
        customRightContentClasses='dashboard-layout-content'
        additionalClasses='dashboard-layout-containers'
        toggleSidebar
        sidebar={<Sidebar />}
        mainContentWidth='80%'
        sidebarWidth='20%'
        mainContent={
          <Layout
            leftContentWidth='90%'
            rightContentWidth='10%'
            additionalClasses='dashboard-journey-layout'
            leftContent={
              <main className='admin-dashboard-container'>
                <div>
                  
                </div>
                <div className='admin-dashboard_boxes'>
                  <div className='admin-dashboard_box'>
                    {/* {rides && (
                      <div className='admin-dashboard_left'>
                        <h3>{rides?.length}</h3>
                        <small>rides</small>
                      </div>
                    )} */}
                      {
                      <div className='admin-dashboard_left'>
                        <h3>12</h3>
                        <small>rides</small>
                      </div>
                    }
                    <div className='admin-dashboard_icon'>
                      <FaCarSide />
                    </div>
                  </div>
                  <div className='admin-dashboard_box'>
                    {/* {passengers && (
                      <div className='admin-dashboard_left'>
                        <h3>{passengers?.length}</h3>
                        <small>passengers</small>
                      </div>
                    )} */}
                      {
                      <div className='admin-dashboard_left'>
                        <h3>{passengers}</h3>
                        <small>passengers</small>
                      </div>
                    }
                    <div className='admin-dashboard_icon'>
                      <FaCarSide />
                    </div>
                  </div>
                  <div className='admin-dashboard_box'>
                    {/* {drivers && (
                      <div className='admin-dashboard_left'>
                        <h3>{drivers?.length}</h3>
                        <small>drivers</small>
                      </div>
                    )} */}
                    {
                      <div className='admin-dashboard_left'>
                        <h3>{drivers}</h3>
                        <small>drivers</small>
                      </div>
                    }
                    <div className='admin-dashboard_icon'>
                      <FaCarSide />
                    </div>
                  </div>
                </div>
                <BarChart data={data} title='' />
              </main>
            }
            // customRightContentClasses='tripdetails-right-content'
          />
        }
        header={<h1>Welcome Admin</h1>}
      />
    </>
  )
}
