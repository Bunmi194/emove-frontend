import React, { useContext, useState } from 'react'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import { Layout } from '../Layouts/Layout'
import { Sidebar } from '../components/Sidebar'
import { AdminNavbar } from '../components/AdminNavbar'
import { ModalContext } from '../context/admindashContext'
import { Actions } from "../components/Actions";
import "../styles/adminViewDriversPage.styles.css";
import man2 from "../assets/sign-up-image.png"
import Profile from "../components/Profile";
import { EditAndDeleteDriverModal } from "../components/EditAndDeleteDriverModal";
import ReactModal from 'react-modal'


export const AdminViewDriversPage = () => {
  // const { modals, setModals }:any = useContext(ModalContext)
  // const { editAndDeleteModal, profileModal } = modals

  
  //   const handleShow = () => {
  //   setModals({...modals, profileModal: true})

    const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
        setShowModal(true)   
    }
  const handleCloseModal = () => {
     setShowModal(false)   
  
  }
  return (
    <>
      {/* {profileModal && <Profile />} */}
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
        sidebar={<Sidebar  />}
        mainContentWidth='80%'
        sidebarWidth='20%'
        mainContent={
          <Layout
            leftContentWidth='90%'
            rightContentWidth='10%'
            additionalClasses='dashboard-journey-layout'
            leftContent={
              <main className="view-drivers-container">
      {/* {profileModal && <Profile />}
      {editAndDeleteModal && <EditAndDeleteDriverModal />} */}
      <div className="view-drivers_top">
       
      </div>
      <section>
        <table className="view-drivers_table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Route of Operation</th>
              <th>Phone Number</th>
              <th>Account Number</th>
              <th>Valid ID</th>
              <th>Photo</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="view-drivers_tbody">
            <tr  className="view-drivers_tr">
              <td>Ifeoluba Obi</td>
              <td>Oshodi - Mile2</td>
              <td>0817747837373</td>
              <td>00074552728782</td>
              <td>NIN Slip</td>
              {/* <td onClick={handleShow} className="view-drivers_flex"> */}
              <td  className="view-drivers_flex">
                          <img onClick={handleOpenModal} src={man2} alt="..." />
                          <ReactModal
                      isOpen={showModal}
                      shouldCloseOnOverlayClick={true}
                      contentLabel={"Fund wallet"}>
                      <button onClick={handleCloseModal}
                        className='walletpage-closeModal'>
                        X</button>
                       <Profile/>
                      </ReactModal>
              </td>
              <td className="view-drivers_driver">
                <Actions />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
               
            }
            customRightContentClasses='tripdetails-right-content'
         
          />
        }
        header={ <h1>All Drivers</h1>}
      />
    </>
  )
}
