import { Link } from 'react-router-dom';
import ReviewStatics from './ReviewStatics';
import './reviewTab.css';
import ReviewBox from './ReviewBox';

export default function ReviewTab() {
    return (
        <div className="review_body">
            <div className="statics_container">
                <div className="statics_header">
                    <h3>이런 점이 좋았어요!</h3>
                    <Link
                        className="review_write_btn"
                        to="/menu/detail/review_write"
                        style={{ textDecoration: 'none' }}
                    >
                        <img src="/buttons/write_review_icon.png" alt="write review" />
                        <p>리뷰쓰기</p>
                    </Link>
                </div>
                <ReviewStatics />
            </div>
            <div className="divider"></div>
            <ReviewBox />
        </div>
    );
}
