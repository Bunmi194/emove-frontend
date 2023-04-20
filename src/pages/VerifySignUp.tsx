import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export const VerifySignUp = () => {
    const navigate = useNavigate();
    const [ state, setState ] = useState(false);
    const { token } = useParams();

    const verify = async () => {
        const status = await fetch(`https://emove-teamc-new.onrender.com/v1/users/verify/${token}`);
        const response = await status.json();
        console.log("response: ", response);
        if(response.message === "Account verified"){
            setState(true);
        }
    }

    useEffect(()=> {
        verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <>
    {
        state && (
            <div className="successDiv">
                <img src="/checked.png" alt="cancel" className="imgPage"/>
                <h1 style={{color: "green"}}>Success</h1>
                <p style={{color: "green"}}>Congratulations, Sign up successful</p>
                <button onClick={()=> navigate(`/login`)} className="btnPageDivSuccess">Login</button>
                {/* <Link to="/login">Login</Link> */}
            </div>

        )
    }
    </>
  )
}

