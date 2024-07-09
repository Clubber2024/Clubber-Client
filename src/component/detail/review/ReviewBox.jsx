import './reviewBox.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const KeywordBar = ({ text }) => {
    if (text === 'CULTURE') {
        text = '😃 "분위기가 좋아요"';
    } else if (text === 'FEE') {
        text = '💵 "회비가 적당해요"';
    } else if (text === 'ACTIVITY') {
        text = '🕺🏻 "활동 참여가 자유로워요"';
    } else if (text === 'CAREER') {
        text = '🏆 "대외활동에 좋아요"';
    } else if (text === 'MANAGE') {
        text = '👍🏻 "운영진이 일을 잘해요"';
    }
    return <div className="keyword_container">{text}</div>;
};

export default function ReviewBox({ clubId }) {
    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        const fetchKeywordData = async () => {
            try {
                const res = await axios.get(`http://13.125.141.171:8080/v1/clubs/${clubId}/reviews/v2`);
                if (res.data.success) {
                    setReviewData(res.data.data.reviews);
                    console.log(reviewData);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchKeywordData();
    }, [clubId]);

    return (
        <>
            {reviewData.map((review) => (
                <div className="review_box_container">
                    <div key={review.reviewId} className="review_box">
                        <div className="review_box_header">
                            <p>익명 {review.reviewId}</p>
                            <span>{review.dateTime}</span>
                        </div>
                        <div className="review_box_contents">
                            {review.keywords.map((item, index) => (
                                <KeywordBar key={index} text={item} />
                            ))}
                        </div>
                        <p>{review.content}</p>
                    </div>
                </div>
            ))}
        </>
    );
}
