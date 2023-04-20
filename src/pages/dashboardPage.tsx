import React, { useEffect, useState } from 'react'
import { Layout } from '../Layouts/Layout'
import {  UserNavbar } from '../components/UserNavbar'
import '../styles/dashboard.styles.css'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { DashboardLayout } from '../Layouts/DashboardLayout'
import { Arrow } from '../components/Arrow'
import { FaChevronDown } from 'react-icons/fa'
import { Link, useNavigate, NavigateOptions } from 'react-router-dom'
import { MoreRoutes } from '../components/MoreRoutes'


export const DashboardPage = () => {
  const [more, setMore] = useState<boolean>(false)
  const [routes, setRoutes] = useState([])
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueId, setSelectedValueId] = useState("");
  const navigate = useNavigate();

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
      console.log(responseJSON.routes)
    }
    getRoutes()
  }, [])

  const handleClick = () => {
    // alert(selectedValue)
    if(!selectedValue) {
      alert("Please choose a route");
      return;
    }
    navigate('/user/trip_details', { state: selectedValue });
  }

  const handleMore = () => {
    setMore(!more)
  }

  const handleChange = (e:any) => {
    setSelectedValue(e.target.value);
    setSelectedValueId(e.target);
    console.log("cool: ",selectedValue)
    console.log("target: ",e.target)
  }

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
        mainContent={
          <Layout
            leftContentWidth='65%'
            rightContentWidth='35%'
            additionalClasses='dashboard-journey-layout'
            leftContent={
              <div className='dashboard-card'>
                <div className='dashboard-journey-card'>
                  <p className='dashboard-route-name'>Bariga</p>
                  <span className='dashboard-route-arrow'>
                    {' '}
                    <Arrow />
                  </span>
                  <p className='dashboard-route-name'>Gbagada</p>
                </div>
                 {/* <div className="dashboard-route-options">
                    <p onClick={handleMore}>See more options <FaChevronDown /></p> 
                  </div>  */}
                <div className='dashboard-route-moreoptions'>
                   {/* {more && <MoreRoutes />} 
                   <MoreRoutes />  */}
                  <select className='more-routes-list'
                    value={selectedValueId}
                    
                    onChange={handleChange}
                    
                  >
                    <option  className='more-routes-list-items' >See more options</option> 

                    
                      {routes &&
                        routes.map((route: any, index:number) => (
                          <option className='more-routes-list-items' value={route._id} key={route._id} >
                              {route.pickUpStation} - {route.destination}                     
                          </option>
                        ))}
                  
                  </select>
                </div>
                <div className='dashboard-button'>
                  {<Button text={'Continue'} additionalClasses={'successButton dashboardButton'} handleClick={handleClick} />}
                </div>
              </div>
            }
            customRightContentClasses='dashboard-right-content'
            rightContent={<div className='dashboard-image-container'></div>}
          />
        }
        header={<div className='dashboard-header'>Choose route</div>}
      />
    </>
  )
}
