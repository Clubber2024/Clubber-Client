import ReactModal from "react-modal";
import "./modal.css";

export default function ConfirmModal({ isOpen, message, onClickOk, onClose }) {
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
            width: "410px",
            height: "150px",
            margin: "auto",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        }
    }

    return (
        <div>
            <ReactModal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
                <p>{message}</p>
                <div className="button_wrapper">
                <button onClick={onClickOk} className="ok_button">확인</button>
                <button onClick={onClose} className="cancel_button">취소</button>
                </div>
            </ReactModal>
        </div>
    );
}