import React, { useState, useEffect, useRef } from 'react'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import { Layout } from '../Layouts/Layout'
import { Sidebar } from '../components/Sidebar'
import { AdminNavbar } from '../components/AdminNavbar'
// import { ModalContext } from '../context/admindashContext'
import { Actions } from "../components/Actions";
import "../styles/adminViewDriversPage.styles.css";
// import man2 from "../assets/sign-up-image.png"
import Profile from "../components/Profile";
import Prompt from "../components/Prompt";
// import { EditAndDeleteDriverModal } from "../components/EditAndDeleteDriverModal";
import ReactModal from 'react-modal';
import PromptInfo from "../components/PromptInfo";
import { useNavigate } from "react-router-dom";


interface DriverData {
  _id: String;
  fullName: String;
  routeOfOperation: String;
  phoneNumber: String;
  accountNumber: String
  validId: String
  photo: String
}

const dummyDriver = {
  _id: "String",
  fullName: "String",
  routeOfOperation: "String",
  phoneNumber: "String",
  accountNumber: "String",
  validId: "String",
  photo: "String"
}
interface RouteData {
  _id?: String;
  pickUpStation?: String;
  destination?: String;
  price?: Number;
  createdAt?: String
}
const dummyRoute = [{
  _id: "o",
  pickUpStation: "-",
  destination: "-",
  price: 0,
  createdAt: "0"
}]

export const AdminViewDriversPage = () => {

  const [ drivers, setDrivers ] = useState<DriverData[]>();
  const [ routes, setRoutes ] = useState<RouteData[]>();
  const [ deleted, setDeleted ] = useState(false);
  const [ deleteModal, setDeleteModal ] = useState(false);
  const [ deleteIndex, setDeleteIndex ] = useState(0);
  const navigate = useNavigate();

  const userDetails = JSON.parse(`${localStorage.getItem("userDetails")}`);
  const driverDetails = JSON.parse(`${localStorage.getItem("driverDetails")}`);
  console.log("userDetailsGG: ", userDetails)
  console.log("driverDetails: ", driverDetails)
  const token = userDetails.token;
  const divRefs = useRef<HTMLDivElement[]>([]);
  
  const [showModal, setShowModal] = useState(false)
  
  const handleOpenModal = () => {
    setShowModal(true)   
  }
  const handleCloseModal = () => {
    setShowModal(false)   
    
  }
  
  const editDriver = (id:number) => {
    // alert(`Edit driver ${id}`);
    handleOpenModal();
    divRefs.current.forEach(div => div.classList.add('hide'));
    drivers? localStorage.setItem('driverDetails', JSON.stringify(drivers[id])) : localStorage.setItem('driverDetails', JSON.stringify(dummyDriver));
    
  }
  
  const deleteDriver = (id:number) => {
    // alert(`Delete driver ${id}`)
    setDeleteModal(true);
    divRefs.current.forEach(div => div.classList.add('hide'));
    setDeleteIndex(id);
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
      localStorage.setItem("routeDetails", JSON.stringify(routes));
      console.log("routesIN: ", responseJSON.routes);

    }
    
    const chooseRoute = (id:string) => {
      if(routes && routes.length > 0) {
        const route = routes?.filter(route => route._id === id) as RouteData[];
        console.log("routeinFunction: ", route)
        if(route.length === 0){
          return `${dummyRoute[0].pickUpStation} - ${dummyRoute[0].destination}`;

        }

        return `${route[0].pickUpStation} - ${route[0].destination}`;
      }
      return `${dummyRoute[0].pickUpStation} - ${dummyRoute[0].destination}`;
    }
    
    const handleClick = (id:number) => {
      // alert(id);
      // console.log(divRefs.current);
      console.log(divRefs.current[id]);
      console.log("drivers: ", drivers? drivers[id] : "");
      localStorage.setItem("driverDetails", JSON.stringify(drivers? drivers[id] : {}));

      if(divRefs.current[id].classList.contains('hide')){
        divRefs.current.forEach(div => div.classList.add('hide'));
        divRefs.current[id].classList.remove('hide');
      }else{
        divRefs.current.forEach(div => div.classList.add('hide'));
        // divRefs.current[id].classList.remove('hide');
        
      }

    }

    const deleteDriverCall = async () => {
      setDeleteModal(false);
      // alert(`Delete index ${deleteIndex}`);
      const token = userDetails.token;
      if(drivers){
        const routeId = drivers[deleteIndex]._id;
        const res = await fetch(`https://emove-teamc-new.onrender.com/v1/users/delete-driver/${routeId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        console.log("drivers: ", drivers);
        console.log("user: ", userDetails);
        const result = await res.json();
        console.log("result: ", result);
        if(result.message === "Successful"){
          setDeleted(true);
          window.location.href = "https://main--emove-teamc.netlify.app/#/admin/driver";
        }else{
          alert(`Error: ${result.message}`);
        }
      }
      // window.location.reload();
      return;
    }


  useEffect(() => {
    console.log("token: ", token)
    const getDrivers = async () => {
      const response = await fetch(`https://emove-teamc-new.onrender.com/v1/users/drivers`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${token}`
        }        
      })
      const responseJSON = await response.json();
      setDrivers(responseJSON.drivers)
      console.log("setDrivers: ", responseJSON.drivers)
    }
    getDrivers();
    getRoutes();
    // window.location.reload();
    console.log("routesOUT: ", routes)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const customStyles = {
    content: {
      width: '50%',
      height: '30%',
      margin: 'auto'
    }
  };
  const customStylesTwo = {
    content: {
      width: '40%',
      height: '60%',
      margin: 'auto'
    }
  };

  const closeAndReload = () => {
    setDeleted(false);
    navigate("/admin/driver");
    return;
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
                        contentLabel={"Fund wallet"}
                        style={customStylesTwo}>
                        <button onClick={handleCloseModal}
                          className='walletpage-closeModal'>
                          X</button>
                         <Profile/>
                        </ReactModal>

                        <ReactModal
                          isOpen={deleted}
                          shouldCloseOnOverlayClick={true}
                          contentLabel={"Fund wallet"}
                          style={customStyles}>
                          
                          <button onClick={closeAndReload}
                            className='walletpage-closeModal'>
                            X</button>
                          <PromptInfo header="Driver added successfully." handleClickClose={closeAndReload}/>
                      </ReactModal>
                </td>
                <td className="view-drivers_driver">
                  <Actions handleClick={()=>handleClick(index)}/>
                  <div className='dashboard__editDeleteWrapper hide' ref={(el:HTMLDivElement) => divRefs.current[index] = el} id={`${index}`}>
                    <div className='dashboard__editDelete'>
                      <span onClick={()=>editDriver(index)}>Edit</span>
                    </div>
                    <div className='dashboard__editDelete'>
                      <span onClick={()=>deleteDriver(index)}>Delete</span>
                    </div>
                  </div>
                </td>
              </tr>
              
            ))
          :
          (
            <div>No Driver Found</div>
          )}
              <ReactModal
                        isOpen={deleteModal}
                        shouldCloseOnOverlayClick={true}
                        contentLabel={"Fund wallet"}
                        style={customStyles}>
                        
                        <button onClick={()=>setDeleteModal(false)}
                          className='walletpage-closeModal'>
                          X</button>
                <Prompt header="Are you sure you want to delete?" handleClickNo={()=>setDeleteModal(false)} handleClickYes={deleteDriverCall}/>
              </ReactModal>
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
