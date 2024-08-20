import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReviewBox from './ReviewBox';
import ReviewStatics from './ReviewStatics';
import ErrorModal from '../../modal/ErrorModal';
import './reviewPage.css';

export default function ReviewPage({ clubId, clubName }) {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin');
    const token = localStorage.getItem('accessToken');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    
    const onClickReviewWrite = () => {
        if (!isAdmin && token) {
            navigate(`/clubs/${clubId}/review`, { state: { clubId, clubName } });
        } else if (isAdmin && token){
            setModalMessage('관리자는 리뷰를 작성할 수 없습니다.');
            setIsModalOpen(true);
        } else {
            setModalMessage('리뷰 작성은 로그인 이후 가능합니다.');
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
        navigate(`/clubs/${clubId}`, { state: "Review" });
      };

    return (
        <div className="review_body">
            <div className="statics_container">
                <div className="statics_header">
                    <h3>이런 점이 좋았어요!</h3>
                    <div className="review_write_btn" onClick={onClickReviewWrite}>
                        <img src="/buttons/write_review_icon.png" alt="write review" />
                        <p>리뷰쓰기</p>
                    </div>
                </div>
                <ReviewStatics clubId={clubId} />
            </div>
            <div className="review_divider"></div>
            <ReviewBox clubId={clubId} />
            <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
        </div>
    );
}
