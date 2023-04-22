import { FaEdit } from 'react-icons/fa'
import "../styles/profile.styles.css"
import { useState, useRef } from "react";

import man from '../assets/sign-up-image.png'

interface RouteData {
  _id: String;
  pickUpStation: String;
  destination: String;
  price: Number;
  createdAt: String
}

const Profile = () => {
  const driverDetails = JSON.parse(`${localStorage.getItem('driverDetails')}`);
  const routeDetails = JSON.parse(`${localStorage.getItem('routeDetails')}`);
  const adminDetails = JSON.parse(`${localStorage.getItem('userDetails')}`);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueId, setSelectedValueId] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState(driverDetails.phoneNumber);
  const [ accountNumber, setAccountNumber ] = useState(driverDetails.accountNumber);
  const btnRef = useRef<HTMLButtonElement>(null);

  const phoneRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLInputElement>(null);

  console.log('details: ', driverDetails);
  console.log('routeDetails: ', routeDetails);

  const chooseRoute = (id:string) => {
    const route = routeDetails?.filter((route:RouteData) => route._id === id) as RouteData[];
    return `${route[0].pickUpStation} - ${route[0].destination}`;
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
  }

  const handlePhoneNumber = (e:any) => {
    setPhoneNumber(e.target.value);
  }
  const handleAccountNumber = (e:any) => {
    setAccountNumber(e.target.value);
  }
  const driverId = `${driverDetails._id}`;
  const token = adminDetails.token;
  console.log("allDetails: ", driverId, token);

  const updateDriverRecord = async () => {
    const response = await fetch(`http://localhost:3030/v1/users/edit-driver/${driverId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ phoneNumber, accountNumber })
    });
    const result = await response.json();
    console.log("result: ", result);
  }

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
          <input type="text" ref={phoneRef} className="input__edit" value={phoneNumber} readOnly onChange={handlePhoneNumber}/>
        </div>
        <div className="profile-card_flex2">
          <h5>Account Number</h5>
          <small></small>
          <input type="text" ref={accountRef} className="input__edit" value={accountNumber} readOnly onChange={handleAccountNumber}/>
        </div>
        <div className="profile-card_flex2">
          <h5>Upload Valid ID</h5>
          <small></small>
          <input type="text" className="input__edit" value="NIN" readOnly/>
        </div>
        <button className='updateBtn hide' ref={btnRef} onClick={updateDriverRecord}>Update</button>
      </div>
    </div>
  )
}

export default Profile
