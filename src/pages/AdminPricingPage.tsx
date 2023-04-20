import React, { useContext, useState } from 'react'
import '../styles/adminpricingpage.styles.css'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import { Layout } from '../Layouts/Layout'
import { Button } from '../components/Button'
import { Sidebar } from '../components/Sidebar'
import { AdminNavbar } from '../components/AdminNavbar'
import { ModalContext } from '../context/admindashContext'
import EditPrice from '../components/EditPage'
import ReactModal from 'react-modal'
import { EditPriceModal } from '../components/EditPriceModal'


export const AdminPricingPage = () => {
  // const { modals, setModals }:any = useContext(ModalContext)
  // const { editPriceModal } = modals
  
  // const handleShow = () => {
  //   setModals({...modals, editPriceModal: true})
  // }

  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
        setShowModal(true)   
    }
  const handleCloseModal = () => {
     setShowModal(false)   
  }
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
        sidebar={<Sidebar  />}
        mainContentWidth='80%'
        sidebarWidth='20%'
        mainContent={
          <Layout
            leftContentWidth='90%'
            rightContentWidth='10%'
            additionalClasses='dashboard-journey-layout'
            leftContent={
              <main>
                {/* {editPriceModal && <EditPrice />} */}
                <div className='top'>
                  <p>You can add a specific route and it's applicable price</p>
                </div>
                <section>
                  <table>
                    <thead>
                      <tr>
                        <th>Routes</th>
                        <th>Pricing</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='tr'>
                        <td>
                          <p>Oshodi - Ikeja</p>
                        </td>
                        <td>
                          <div className='flex'>
                            <p>NGN 300</p>
                            <span>Standard price</span>
                          </div>
                        </td>
                        <td>
                          <button onClick={handleOpenModal} className='edit'>
                            Edit
                          </button>
                              <ReactModal
                      isOpen={showModal}
                      shouldCloseOnOverlayClick={true}
                      contentLabel={"Fund wallet"}>
                      <button onClick={handleCloseModal}
                        className='walletpage-closeModal'>
                        X</button>
                       <EditPriceModal/>
                      </ReactModal>
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
        header={<h1 > Pricing Overview</h1>}
      />
    </>
  )
}
