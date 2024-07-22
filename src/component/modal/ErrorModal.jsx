import Modal from "react-modal";

export default function ErrorModal({ isOpen, message, onClose }) {
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
            width: "410px",
            height: "170px",
            margin: "auto",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            padding: "20px"
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
                <p>{message}</p>
                <div>
                    <button onClick={onClose}>확인</button>
                </div>
            </Modal>
        </div>
    );
}