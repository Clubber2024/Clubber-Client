import ReactModal from 'react-modal';
import { useState, useEffect } from 'react';
import './modal.css';

export default function ConfirmModal({ isOpen, message, onClickOk, onClose }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 480);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
        },
        content: {
            width: isMobile ? '250px' : '410px',
            height: isMobile ? '110px' : '150px',
            margin: 'auto',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Noto Sans KR',
            fontSize: isMobile ? '14px' : '18px',
            fontWeight: '500',
        },
    };

    return (
        <div>
            <ReactModal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
                <p>{message}</p>
                <div className="button_wrapper">
                    <button onClick={onClickOk} className="ok_button">
                        확인
                    </button>
                    <button onClick={onClose} className="cancel_button">
                        취소
                    </button>
                </div>
            </ReactModal>
        </div>
    );
}
