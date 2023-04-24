//import Button from "./Button_Dashboard";
import  "../styles/_form.styles.css";
import { Button } from "./Button";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import PromptInfo from "../components/PromptInfo";
import { useNavigate } from "react-router-dom";


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

const Form = () => {
  // const idRef = useRef<HTMLInputElement>(null);
  // const photoRef = useRef<HTMLInputElement>(null);
  const [ imageId, setImageId ] = useState("");
  const [ image, setImage ] = useState("");
  const [ routeId, setRouteId ] = useState("");
  const [ fullName, setFullName ] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ accountNumber, setAccountNumber ] = useState("");
  const [ routes, setRoutes ] = useState<RouteData[]>();
  const [ signedUp, setSignedUp ] = useState(false);
  const navigate = useNavigate();
  const userDetails = JSON.parse(`${localStorage.getItem("userDetails")}`);
  const token = userDetails.token;
  

  const closeAndReload = () => {
    setSignedUp(false);
    navigate("/admin/driver");
    return;
  }

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
    getRoutes()
  }, [])
  
  const uploadImageOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("image directory: ", event.target.files)
    const file = event.target.files?.[0];
    if (file) {
      console.log("file: ", file)
      
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        // setImage1(base64);
        console.log("base64 id: ", base64);
        setImageId(base64);
      };
      reader.readAsDataURL(file);
    } 
  }
  const uploadImageTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("image directory: ", event.target.files)
    const file = event.target.files?.[0];
    console.log("file: ", file)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        // setImage1(base64);
        console.log("base64 photo: ", base64);
        setImage(base64);
      };
      reader.readAsDataURL(file);
    } 
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!fullName || !accountNumber || !routeId || !phoneNumber || !image || !imageId){
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    const res = await fetch(`https://emove-teamc-new.onrender.com/v1/users/add-driver`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origins': '*',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ fullName, routeOfOperation: routeId, phoneNumber,
        accountNumber, validId: imageId, photo: image })
    });
    const result: any = await res.json();
    console.log("result: ", result);
    setLoading(false);
    if(result.message === "Driver added"){
      setSignedUp(true);
      return;
      // window.location.reload();
    }else{
      alert(`Error: ${result.status}`);
      return;
    }
    // if (res.status === 200) {
    //   // navigate(`/checkemail/${email}`)
    //   //go to dashboard- user or admin dashboard
    //   setLoading(false);
    //   const details = JSON.stringify(result);
    //   localStorage.setItem('userDetails', details );
    //   //check for admin
    //   if(result.user.roles.includes('admin')){
    //     navigate('/admin/dashboard');
    //     return;
    //   }
    //   navigate('/user/book_trip');
    //   console.log('sent')
    // }else{
    //   //error
    //   setLoading(false);
    //   const err = result.message;
    //   setError(`Error: ${err}`);
    //   return;
    // }
  }

  return (
     
    <form className="form_Dashboard">
      <div className="form_Dashboard_field">
        <label className="form_Dashboard_label" htmlFor="name">
          Full Name
        </label>
        <div className="form_Dashboard_inputbox">
          <input type="text" placeholder="Enter your full name" onChange={(e)=>setFullName(e.target.value)}/>
        </div>
      </div>
      <div className="form_Dashboard_field">
        <label className="form_Dashboard_label" htmlFor="route">
          Route of operation
        </label>
        <div className="form_Dashboard_inputbox">
          <select className="form_Dashboard_route" onChange={(e)=>{
            setRouteId(e.target.value)
            console.log(e.target.value)
            }}>
            <option>Please select a route</option>
            {
              routes && routes.map(route =>{
                return <option value={`${route._id}`} key={`${route._id}`} >{route.pickUpStation}-{route.destination}</option>
              })
            }
          </select>
        </div>
      </div>
      <div className="form_Dashboard_field">
        <label className="form_Dashboard_label" htmlFor="phone">
          Phone number
        </label>
        <div className="form_Dashboard_inputbox">
          <input
            className="form_Dashboard_phone"
            type="text"
            placeholder="Enter your phone number"
            onChange={(e)=>setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="form_Dashboard_field">
        <label className="form_Dashboard_label" htmlFor="Account">
          Account Nnumber
        </label>
        <div className="form_Dashboard_inputbox">
          <input
            className="account"
            type="number"
            placeholder="Type your account number"
            onChange={(e)=>setAccountNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="ID form_Dashboard_field">
        <label htmlFor="files">Upload valid ID</label>
        <div className="form_Dashboard_field1">
          <div className="form_Dashboard_photobox">
            <label htmlFor="files">Upload file</label>
            <input id="idImage" accept="image/*" type="file" onChange={uploadImageOne}/>
          </div>
        </div>
      </div>
      <div className="pho form_Dashboard_field">
        <label htmlFor="files">Upload photo</label>
        <div className="form_Dashboard_field1">
          <div className="form_Dashboard_photobox">
            <label htmlFor="files" className="btn">
              Upload photo
            </label>
            <input id="photoImage" accept="image/*" type="file" onChange={uploadImageTwo} />
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={signedUp}
        shouldCloseOnOverlayClick={true}
        contentLabel={"Fund wallet"}
        style={customStyles}>
        
        <button onClick={closeAndReload}
          className='walletpage-closeModal'>
          X</button>
        <PromptInfo header="Driver added successfully." handleClickClose={closeAndReload}/>
      </ReactModal>
      {/* <Button bookTrip={""} formText="Sign up driver" text={""} /> */}
     <Button text={`${loading? "Signing up..." : "Sign Up"}`} additionalClasses={'successButton dashboardButton'}  handleClick={handleSubmit}/>
          </form>  

  );
};

export default Form;
