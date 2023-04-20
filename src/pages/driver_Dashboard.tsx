import Form from "../components/Form_";
import "../styles/_driverDashboard.styles.css"
import rec from "../assets/rec.png";
import { Link } from "react-router-dom";

const Drivers = () => {
  return (
      <main className="_driver_dashboard">
      <div className="flex">
        <h1>Register a driver</h1>
        <Link to="/admin/driver">View all drivers</Link>
      </div>
      <div className="bottom">
        <Form />
        <div className="img">
          <img src={rec} alt="..." />
          <h2>Board our vehicles anywhere in Lagos at regular rates</h2>
        </div>
        </div>
        </main>
  );
};


export default Drivers;
