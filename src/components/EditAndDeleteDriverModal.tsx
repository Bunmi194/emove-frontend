import "../styles/editAndDeleteDriverModal.styles.css"
import { FaEdit, FaTrash } from "react-icons/fa";

export const EditAndDeleteDriverModal = () => {
    return (
        <div className="editdelete_modal">
            <ul>
                <li>
                    <FaEdit className="editdelete_m-icon" />
                    Edit
                </li>
                <li>
                    <FaTrash className="editdelete_m-icon" />
                    Delete
                </li>
            </ul>
        </div>
    );
}
