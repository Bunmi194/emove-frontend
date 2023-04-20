import React, { useContext } from 'react'
import '../styles/adminDashboard.styles.css'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import { Layout } from '../Layouts/Layout'
import { Button } from '../components/Button'
import { Sidebar } from '../components/Sidebar'
import { AdminNavbar } from '../components/AdminNavbar'
import { ModalContext } from '../context/admindashContext'
import EditPrice from '../components/EditPage'
import { FaCarSide } from 'react-icons/fa'
import { BeatLoader } from 'react-spinners'
import BarChart from '../components/Barchart'

export const AdminDashboardPage = () => {
// const { drivers, passengers, rides, loading, error } = useFetch();

  // if (loading) {
  //   return (
  //     <main>
  //       <div className='loader'>
  //         <BeatLoader color="#F79009" />
  //       </div>
  //   </main>);
  // }
  // if (error) {
  //  return (
  //     <main>
  //      <div className='loader'>
  //        <h1>Internal Server Error</h1>
  //       </div>
  //   </main>);
  // }


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
                        <h3>19</h3>
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
                        <h3>19</h3>
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
                        <h3>19</h3>
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
