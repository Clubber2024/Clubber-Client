import { useNavigate } from 'react-router-dom';
import ReviewStatics from './ReviewStatics';
import './reviewTab.css';
import ReviewBox from './ReviewBox';

export default function ReviewTab({ clubId, clubName }) {
    const navigate = useNavigate();

    const onClickReviewWrite = () => {
        navigate('/menu/detail/review_write', { state: { clubId, clubName } });
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
            <div className="divider"></div>
            <ReviewBox clubId={clubId} />
        </div>
    );
}
