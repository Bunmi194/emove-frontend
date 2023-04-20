import React from 'react'
import "../styles/sidebar.styles.css"
import { Tab } from './Tab'
import { DashboardIcon } from './DashboardIcon'
import { AddDriverIcon } from './AddDriverIcon'
import { MoneyBillIcon } from './MoneyBillIcon'
import { Link, useLocation } from 'react-router-dom'

interface ISidebar{
  page?: string
}

export const Sidebar: React.FC<ISidebar> = (props: ISidebar) => {
  const { pathname } = useLocation()
  console.log(pathname)
  return (
    <div className='sidebar-container'>
          <ul className='sidebar-list'>
              {/* <li className='sidebar-list-item'>Main</li> */}
        <li className='sidebar-list-item'>
           <Link  to="/admin/dashboard"> 
                  <Tab
            icon={<DashboardIcon />}
            text="Dashboard"
            customClasses={pathname === "/admin/dashboard" ?'tab-active':""}
                  />
             </Link>      
              </li>
        <li className='sidebar-list-item'>
          <Link to="/admin/drivers">
                  <Tab
                      icon={<AddDriverIcon/>}
            text="Add Driver" 
            customClasses={pathname === "/admin/drivers" ?'tab-active':""}
                  />

          </Link>
                  </li>
        <li className='sidebar-list-item'>
           <Link to="/admin/pricing">
                  <Tab
                    icon={<MoneyBillIcon/>}
            text="Pricing"
            customClasses={pathname === "/admin/pricing" ?'tab-active':""}
            />
            </Link>
              </li>
          </ul>      
    </div>
  )
}

