import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../styles/moreroutes.styles.css"

 interface IRoute{
  destination: string;
  pickup: string;
  price: number;
  __v: number;
  _id: string;
}

export const MoreRoutes = () => {
    const [routes, setRoutes] = useState<IRoute[]>([]);
    const [selectedValue, setSelectedValue] = useState("")
    useEffect(() => {
        const getRoutes = async() => {
            const response = await fetch(`https://emove-teamc-new.onrender.com/v1/routes/getAllRoutes`)
            const responseJSON = await response.json()
            const data = responseJSON.routes
            setRoutes(data)
            console.log(responseJSON.routes)
        }
        getRoutes()     
    },[])
    return ( 
        <select className='more-routes-list' value={selectedValue}>
            <option className='more-routes-list-items'>
                See more options
            </option>
            
            <>
                {routes && routes.map((route: any) => (<option className='more-routes-list-items' key={route._id}><Link  to={`/user/trip-details/${route._id}`}>{route.pickUpStation} - { route.destination}</Link></option>))}
            </>
        </select>
     );
}
