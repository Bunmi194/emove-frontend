import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import { Layout } from '../Layouts/Layout'
import { Sidebar } from '../components/Sidebar'
import { AdminNavbar } from '../components/AdminNavbar'
// import { ModalContext } from '../context/admindashContext'
import { Actions } from "../components/Actions";
import "../styles/adminViewDriversPage.styles.css";
// import man2 from "../assets/sign-up-image.png"
import Profile from "../components/Profile";
// import { EditAndDeleteDriverModal } from "../components/EditAndDeleteDriverModal";
import ReactModal from 'react-modal';


interface DriverData {
  _id: String;
  fullName: String;
  routeOfOperation: String;
  phoneNumber: String;
  accountNumber: String
  validId: String
  photo: String
}

interface RouteData {
  _id: String;
  pickUpStation: String;
  destination: String;
  price: Number;
  createdAt: String
}

export const AdminViewDriversPage = () => {

  const [ drivers, setDrivers ] = useState<DriverData[]>();
  const [ routes, setRoutes ] = useState<RouteData[]>();
  const userDetails = JSON.parse(`${localStorage.getItem("userDetails")}`);
  const token = userDetails.token;
  // const popDivRef = useRef<HTMLDivElement[]>(null);

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

    const chooseRoute = (id:string) => {
      const route = routes?.filter(route => route._id === id) as RouteData[];
      return `${route[0].pickUpStation} - ${route[0].destination}`;
    }
    
    const handleClick = (id:number) => {
      alert(id);

    }


  useEffect(() => {
    console.log("token: ", token)
    const getDrivers = async () => {
      const response = await fetch(`http://localhost:3030/v1/users/drivers`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${token}`
        }        
      })
      const responseJSON = await response.json();
      setDrivers(responseJSON.drivers)
      console.log("routesHERE: ", responseJSON.drivers)
    }
    getDrivers();
    getRoutes();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="view-drivers_tbody">
            { drivers ? drivers.map((driver: DriverData, index:number) => (
              
                <tr  className="view-drivers_tr">
                <td>{driver.fullName}</td>
                <td>{chooseRoute(`${driver.routeOfOperation}`)}</td>
                <td>{driver.phoneNumber}</td>
                <td>{driver.accountNumber}</td>
                <td>NIN Slip</td>
                {/* <td onClick={handleShow} className="view-drivers_flex"> */}
                <td  className="view-drivers_flex">
                            <img onClick={handleOpenModal} src={`${driver.photo}`} alt="driver" className="driverImg" />
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
                  <Actions handleClick={()=>handleClick(index)}/>
                  <div className='dashboard__editDeleteWrapper'  >
                    <div className='dashboard__editDelete'>
                      <span style={{marginBottom: "5px"}}>Edit</span>
                    </div>
                    <div className='dashboard__editDelete'>
                      <span>Delete</span>
                    </div>
                  </div>
                </td>
              </tr>
              
            ))
          :
          (
            <div>No Driver Found</div>
          )}
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
