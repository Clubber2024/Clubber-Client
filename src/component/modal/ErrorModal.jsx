import ReactModal from "react-modal";
import "./modal.css";

export default function ErrorModal({ isOpen, message, onClose }) {
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
            width: "80%",
            maxWidth: "410px",
            height: "140px",
            margin: "auto",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -80%)"
        }
    }

    return (
        <div>
            <ReactModal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
                <p>{message}</p>
                <button onClick={onClose} className="ok_button">확인</button>
            </ReactModal>
        </div>
    );
}