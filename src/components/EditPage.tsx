import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { Button } from "./Button";
import { ModalContext } from "../context/admindashContext";

const EditPrice = () => {
  const { modals, setModals }:any = useContext(ModalContext)
  const handleClose = () => {
    setModals({...modals, editPriceModal: false})
  }
  
  return (
    <form>
      <div className="newPriceModal">
        <h1>Edit Price</h1>
        <FaTimes onClick={handleClose} className="close" />
      </div>
      <div className="field">
        <label className="label" htmlFor="name">
          New Price
        </label>
        <div className="inputbox">
          <input type="text" placeholder="NGN 0.00" />
        </div>
      </div>
      {/* <Button  bookTrip={""}  text="Set New Price" formText={""} /> */}
    </form>
  );
};

export default EditPrice;
