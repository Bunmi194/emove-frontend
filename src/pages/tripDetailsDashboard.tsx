import React, { useEffect, useState } from 'react'
import '../styles/tripDetailsDashboard.styles.css'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import {  UserNavbar } from '../components/UserNavbar'
import { Layout } from '../Layouts/Layout'
import { Button } from '../components/Button'
import { Sidebar } from '../components/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { response } from 'express'

interface tripDetailsType {
  pickUpStation?: string;
  destination?: string;
  price?: number;
}
// {tripDetails?.route[0].pickUpStation}
export const TripDetailsDashboard = () => {
  const location = useLocation();
  const [ tripDetails, setTripDetails ] = useState<tripDetailsType>({});
  const today = new Date();
  console.log("value:",location.state);
  const date = today.getMonth();
  const date2 = today.getDate();
  // console.log("local: ", JSON.parse(`${localStorage.getItem('userDetails')}`))
  const navigate = useNavigate();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  function getDateSuffix(date: Date) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const day = date.getDate();
    const relevantDigits = (day < 30) ? day % 20 : day % 30;
    const suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return `${day}${suffix}`;
  }

let hours = today.getHours();
const minutes = today.getMinutes();
const amPm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12 || 12;
const formattedTime = `${hours}:${minutes.toLocaleString('en-US', {minimumIntegerDigits: 2})} ${amPm}`;
const formattedDate = `${months[date]}-${getDateSuffix(today)}`
console.log(formattedTime);

//fetch userId
const userId = JSON.parse(`${localStorage.getItem("userDetails")}`).user._id;

// console.log('details: ', JSON.parse(`${localStorage.getItem("userDetails")}`).user._id)

const id = location.state;
const userIdInStorage = JSON.parse(`${localStorage.getItem("userDetails")}`).user._id;


const handleClick = async (e:any) => {
  const response = await fetch(`https://emove-teamc-new.onrender.com/v1/users/booktrip/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      routeId: id,
      userId
    })    
  })
  const result = await response.json();
  if(result.message === "Trip created successfully"){
    //update user's record
    ///user/:id
    // console.log("IID: ", id)
    console.log("userIdInStorage: ", userIdInStorage)
    const userData = await fetch(`https://emove-teamc-new.onrender.com/v1/users/user/${userIdInStorage}`);
    const result = await userData.json();
    console.log("result.user: ", result.user)
    if(result.user){
      const user = {...JSON.parse(`${localStorage.getItem('userDetails')}`), ...result.user}
      console.log("USER: ", user);
      localStorage.setItem("userDetails", JSON.stringify(user));
    }
    alert("Trip booked successfully");
    navigate("/user/book_trip");
    return;
  }
  alert("Failed to book trip");
  navigate("/user/book_trip");
  return;
}

  const getRouteData = () => {
    const getRoute = async (idd:string) => {
      const response = await fetch(`https://emove-teamc-new.onrender.com/v1/routes/getRoute/${id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }        
      })
      const result = await response.json();
      setTripDetails(result.route[0]);
      console.log("fetched One: ", result);
      console.log("fetched BIG: ", result.route[0].pickUpStation);
    };
    const id = location.state;
    getRoute(id);
  }
  
  

  useEffect(getRouteData, []);
  // console.log("tripDetails: ",tripDetails)

  return (
    <>
      <DashboardLayout
        navbar={<UserNavbar />}
        navbarHeight='15%'
        bodyContainerHeight='85%'
        mainContentHeight='85%'
        headerHeight='15%'
        customLeftContentClasses='dashboard-layout-header'
        customRightContentClasses='dashboard-layout-content'
        additionalClasses='dashboard-layout-containers'
        // toggleSidebar
        sidebar={<Sidebar />}
        mainContentWidth='80%'
        sidebarWidth='20%'
        mainContent={
          <Layout
            leftContentWidth='65%'
            rightContentWidth='35%'
            additionalClasses='dashboard-journey-layout'
            leftContent={
              <div className='tripdetails-card'>
                <div className='tripdetails-card-subheader-container'>
                  <h3 className='tripdetails-card-subheader'>Trip Details</h3>
                </div>
                <div className='tripdetails-map-container'> </div>
                <div className='tripdetails-journey-card'>
                  <div className='tripdetails-card-description'>
                    <p className='tripdetails-card-description-header'>Destination</p>
                    <p className='tripdetails-card-description-content'>{tripDetails.pickUpStation} - {tripDetails.destination}</p>
                  </div>
                  <div className='tripdetails-card-description'>
                    <p className='tripdetails-card-description-header'>Amount</p>
                    <p className='tripdetails-card-description-content'>&#8358; {tripDetails.price}</p>
                  </div>
                  <div className='tripdetails-card-description'>
                    <p className='tripdetails-card-description-header'>Date</p>
                    <p className='tripdetails-card-description-content'>{formattedDate} - {formattedTime}</p>
                  </div>
                </div>
                <div className='tripdetails-button'>
                  {<Button text={'Book a Trip'} additionalClasses={'successButton dashboardButton'} handleClick={handleClick}/>}
                </div>
              </div>
            }
            customRightContentClasses='tripdetails-right-content'
            rightContent={<div className='tripdetails-image-container'></div>}
          />
        }
        header={<Link to="/user/book_trip"><div className='tripdetails-header'>&#8592; Book a Trip</div></Link>}
      />
    </>
  )
}
