import { FaEdit } from 'react-icons/fa';
import "../styles/profile.styles.css"
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import PromptInfo from "../components/PromptInfo";

// import man from '../assets/sign-up-image.png'

interface RouteData {
  _id: String;
  pickUpStation: String;
  destination: String;
  price: Number;
  createdAt: String
}

const customStyles = {
  content: {
    width: '50%',
    height: '30%',
    margin: 'auto'
  }
};



const dumDriver = {
  accountNumber: "",
  driverStatus: "",
  fullName: "",
  phoneNumber: "",
  photo: "",
  routeOfOperation: ""
}

const Profile = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [ routes, setRoutes ] = useState();
  // const [ adminDetails, setAdminDetails ] = useState<any>(JSON.parse(`${localStorage.getItem('userDetails')}`) || dumAdmin);
  // console.log("Line 61: ", JSON.parse(`${localStorage.getItem('routeDetails')}`))
  // const [ routeDetails, setRouteDetails ] = useState<any>(JSON.parse(`${localStorage.getItem('routeDetails')}`) || dumRoute);
  const [ driverDetails, setDriverDetails ] = useState<any>(JSON.parse(`${localStorage.getItem('driverDetails')}`) || dumDriver);
  
  const driverCompleteDetails = JSON.parse(`${localStorage.getItem('driverDetails')}`);
  
  // console.log("routeDetails: ", routeDetails);
  // console.log("adminDetails: ", adminDetails);
  // console.log("driverDetails: ", driverDetails);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ drivers, setDrivers ] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValueId, setSelectedValueId] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState(driverCompleteDetails.phoneNumber);
  const [ accountNumber, setAccountNumber ] = useState(driverCompleteDetails.accountNumber);
  const [ routeDetails, setRouteDetails ] = useState<any>();
  const [ updateModal, setUpdateModal ] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const phoneRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLInputElement>(null);
  
  // console.log('details: ', driverDetails);
  // console.log('routeDetails: ', routeDetails);
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userDetails = JSON.parse(`${localStorage.getItem('userDetails')}`)
  console.log("userDetails: ",userDetails)
  // const routeDetails = JSON.parse(`${localStorage.getItem('routeDetails')}`)
  const adminDetails = JSON.parse(`${localStorage.getItem('adminDetails')}`)
  console.log("routeDetails: ",routeDetails)
  console.log("adminDetails: ",adminDetails)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const chooseRoute = (id:string) => {
    const route = routeDetails?.filter((route:RouteData) => route._id === id) as RouteData[];
    return `${route[0].pickUpStation} - ${route[0].destination}`;
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
    setRouteDetails(data)
    localStorage.setItem("routeDetails", JSON.stringify(data));
    console.log("routes: ", responseJSON.routes)
  }
  
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
    console.log("setDrivers: ", responseJSON.drivers)
  }
  
  
  
  const handleEdit = () => {
    if(phoneRef.current && accountRef.current && btnRef.current){
      phoneRef.current.readOnly = false;
      accountRef.current.readOnly = false;
      btnRef.current.classList.remove('hide');
    }
  }

  const handleChange = (e:any) => {
    setSelectedValue(e.target.value);
    setSelectedValueId(e.target);
    console.log('routeTEST: ', e.target.value)
    console.log('routeTEST@@@: ', selectedValue)
    // alert(`routeTEST: ${selectedValue}  ${e.target.value}`)
  }
  
  const handlePhoneNumber = (e:any) => {
    setPhoneNumber(e.target.value);
  }
  const handleAccountNumber = (e:any) => {
    setAccountNumber(e.target.value);
  }
  const driverId = `${driverDetails._id}`;
  const token = userDetails.token;
  console.log("allDetails: ", driverId, token);
  

  const updateDriverRecord = async () => {
    setUpdateModal(true);
    const response = await fetch(`http://localhost:3030/v1/users/edit-driver/${driverId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ phoneNumber, accountNumber, routeOfOperation: selectedValue })
    });
    const result = await response.json();
    console.log("update result: ", result);
    setUpdateModal(false);
    if(result.message === "Successful"){
      
      
    }
  }
  
  const closeAndReload = () => {
    setUpdateModal(false);
    navigate("/admin/driver");
    return;
  }
  useEffect(()=>{
    getDrivers();
    getRoutes();
    // window.location.reload();
    // setAdminDetails(JSON.parse(`${localStorage.getItem('userDetails')}`));
    
    // setRouteDetails(JSON.parse(`${localStorage.getItem('routeDetails')}`));
    setDriverDetails(JSON.parse(`${localStorage.getItem('driverDetails')}`));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='profile-card_container'>
      <div className="profile-card_flex">
        <h1>Profile Details</h1>
        {/* <span>
          <FaTimes />
        </span> */}
      </div>
      <div className="profile-card_flex1">
        <img src={driverDetails.photo} alt="..." />
        <h4>{driverDetails.fullName}</h4>
        <span onClick={handleEdit}>
          <FaEdit className="profile-card_edit-icon" />
          Edit
        </span>
      </div>
      <hr />
      <div className='profile-card_info'>
        <div className="profile-card_flex2">
          <h5>Route of Operation</h5>
          <small></small>
          {/* <span>{chooseRoute(driverDetails.routeOfOperation)}</span> */}
          <select className='more-routes-list'
                    value={selectedValueId}
                    
                    onChange={handleChange}
                    
            >
              <option  className='more-routes-list-items' >Choose route</option> 

              
                {routeDetails &&
                  routeDetails.map((route: any, index:number) => (
                    <option className='more-routes-list-items' value={route._id} key={route._id} >
                        {route.pickUpStation} - {route.destination}                     
                    </option>
                  ))}
                  
          </select>
        </div>
        <div className="profile-card_flex2">
          <h5>Phone Number</h5>
          <small></small>
          <input type="text" ref={phoneRef} className="input__edit" value={phoneNumber }  onChange={handlePhoneNumber}/>
        </div>
        <div className="profile-card_flex2">
          <h5>Account Number</h5>
          <small></small>
          <input type="text" ref={accountRef} className="input__edit" value={accountNumber }  onChange={handleAccountNumber}/>
        </div>
        <div className="profile-card_flex2">
          <h5>Upload Valid ID</h5>
          <small></small>
          <input type="text" className="input__edit" value="NIN" readOnly/>
        </div>

      <ReactModal
        isOpen={updateModal}
        shouldCloseOnOverlayClick={true}
        contentLabel={"Fund wallet"}
        style={customStyles}>
        
        <button onClick={closeAndReload}
          className='walletpage-closeModal'>
          X</button>
        <PromptInfo header="Record update successfully." handleClickClose={closeAndReload}/>
      </ReactModal>

        <button className='updateBtn hide' ref={btnRef} onClick={updateDriverRecord}>{updateModal? "Updating...." : "Update"}</button>
      </div>
    </div>
  )
}

export default Profile
