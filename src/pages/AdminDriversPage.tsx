import React, { useContext } from 'react'
import '../styles/adminpricingpage.styles.css'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import { Layout } from '../Layouts/Layout'
import { Button } from '../components/Button'
import { Sidebar } from '../components/Sidebar'
import { AdminNavbar } from '../components/AdminNavbar'
import { ModalContext } from '../context/admindashContext'
import EditPrice from '../components/EditPage'
import { Link } from 'react-router-dom'
import Form_ from '../components/Form_'

export const AdminDriversPage = () => {
  // const { modals, setModals }:any = useContext(ModalContext)
  // const { editPriceModal } = modals

  // const handleShow = () => {
  //   setModals({...modals, editPriceModal: true})
  // }
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
              <main>
             
                <div className='bottom'>
                  <Form_ />
                </div>
              </main>
            }
            customRightContentClasses='tripdetails-right-content'
          />
        }
        header={   <div className='flex'>
                  <h1>Register a driver</h1>
                  <Link className='view-drivers' to='/admin/driver'>View all drivers</Link>
                </div>}
      />
    </>
  )
}
