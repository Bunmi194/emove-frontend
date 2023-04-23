import React, { useState, useEffect } from 'react'
import '../styles/adminpricingpage.styles.css'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import { Layout } from '../Layouts/Layout'
// import { Button } from '../components/Button'
import { Sidebar } from '../components/Sidebar'
import { AdminNavbar } from '../components/AdminNavbar'
// import { ModalContext } from '../context/admindashContext'
// import EditPrice from '../components/EditPage'
import ReactModal from 'react-modal'
import { EditPriceModal } from '../components/EditPriceModal'

interface RouteData {
  _id: String;
  pickUpStation: String;
  destination: String;
  price: Number;
  createdAt: String
}

export const AdminPricingPage = () => {

  const [ routes, setRoutes ] = useState<RouteData[]>();

  // const userDet = JSON.parse(`${localStorage.getItem('userDetails')}`);
  // console.log("userDet: ", userDet);

  useEffect(() => {
    const getRoutes = async () => {
      const response = await fetch(`https://emove-teamc-new.onrender.com/v1/routes/getAllRoutes`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }        
      })
      const responseJSON = await response.json();
      const data = responseJSON.routes
      setRoutes(data)
      console.log("routes: ", responseJSON.routes)
    }
    getRoutes();
    // window.location.reload();
  }, [])


  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = (id:string) => {
    localStorage.setItem("tripId", id);
    setShowModal(true)   
  }
  const handleCloseModal = () => {
     setShowModal(false)   
  }

  const customStyles = {
    content: {
      width: '50%',
      height: '30%',
      margin: 'auto'
    }
  };


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
                      { routes? routes[0]._id && routes?.map(route => (
                       <tr className='tr'>
                      <td>
                        <p>{route.pickUpStation} - {route.destination}</p>
                      </td>
                      <td>
                        <div className='flex'>
                          <p>{`NGN ${route.price}`}</p>
                          <span>Standard price</span>
                        </div>
                      </td>
                      <td>
                        <button onClick={()=> handleOpenModal(`${route._id}`)} className='edit'>
                          Edit
                        </button>
                            <ReactModal
                    isOpen={showModal}
                    shouldCloseOnOverlayClick={true}
                    contentLabel={"Fund wallet"}
                    style={customStyles}>
                    <button onClick={handleCloseModal}
                      className='walletpage-closeModal'>
                      X</button>
                     <EditPriceModal showModal={showModal} setShowModal={setShowModal}/>
                    </ReactModal>
                      </td>
                    </tr>
                      ))
                      :
                      <div>
                        No Pricing details available.
                      </div>
                    }
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
