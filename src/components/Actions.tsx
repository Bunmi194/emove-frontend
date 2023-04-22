import "../styles/actions.styles.css";
//import { ModalContext } from "../../context/dashboardContext";

export const Actions = ({handleClick}:any) => {
//     const { modals, setModals }:any = useContext(ModalContext);
//     const handleShow = () => {
//     setModals({...modals, editAndDeleteModal: true})
//   }
    return (
       // <div className="actions_container" onClick={handleShow}>
        <div className="actions_container" onClick={handleClick}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    );
}