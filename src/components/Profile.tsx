import { FaEdit, FaTimes } from 'react-icons/fa'
import "../styles/profile.styles.css"

import man from '../assets/sign-up-image.png'

const Profile = () => {
  return (
    <div className='profile-card_container'>
      <div className="profile-card_flex">
        <h1>Profile Details</h1>
        {/* <span>
          <FaTimes />
        </span> */}
      </div>
      <div className="profile-card_flex1">
        <img src={man} alt="..." />
        <h4>Ifeoluba Obi</h4>
        <span>
          <FaEdit className="profile-card_edit-icon" />
          Edit
        </span>
      </div>
      <hr />
      <div className='profile-card_info'>
        <div className="profile-card_flex2">
          <h5>Route of Operation</h5>
          <small></small>
          <span>Oshodi - Mile 2</span>
        </div>
        <div className="profile-card_flex2">
          <h5>Phone Number</h5>
          <small></small>
          <span>09177373737736</span>
        </div>
        <div className="profile-card_flex2">
          <h5>Account Number</h5>
          <small></small>
          <span>007327829278</span>
        </div>
        <div className="profile-card_flex2">
          <h5>Upload Valid ID</h5>
          <small></small>
          <span>NIN</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
