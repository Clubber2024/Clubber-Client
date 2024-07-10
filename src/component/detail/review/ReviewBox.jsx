import './reviewBox.css';
import KeywordBar from './KeywordBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
