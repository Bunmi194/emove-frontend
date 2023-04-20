import "../styles/actions.styles.css"
import { useContext } from "react";
//import { ModalContext } from "../../context/dashboardContext";

export const Actions = () => {
//     const { modals, setModals }:any = useContext(ModalContext);
//     const handleShow = () => {
//     setModals({...modals, editAndDeleteModal: true})
//   }
    return (
       // <div className="actions_container" onClick={handleShow}>
        <div className="actions_container" >
            <span className="actions_dot"></span>
            <span className="actions_dot"></span>
            <span className="actions_dot"></span>
        </div>
    );
}