import './myReview.css';
import '../../detail/review/reviewBox.css';
import KeywordBar from '../../detail/review/KeywordBar';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MyReview() {
    const [myReviewData, setMyReviewData] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const getMyReviews = async () => {
            try {
                const res = await axios.get(`http://13.125.141.171:8080/v1/users/review`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log(res);
                if (res.data.success) {
                    setMyReviewData(res.data.data.userReviews);
                    console.log(myReviewData);
                }
            } catch (error) {
                console.error('Error fetching my reviews : ', error);
            }
        };
        getMyReviews();
    }, []);

    return (
        <div className="my_review_container">
            <h2>내가 쓴 리뷰</h2>
            {myReviewData.map((myReview) => (
                <div key={myReview.reviewId} className="my_review_box">
                    <div className="review_box_header">
                        <p className="club_name">{myReview.clubName}</p>
                        <span>{myReview.dateTime}</span>
                        {myReview.approvedStatus === 'APPROVED' ? (
                            <div className="review_approved">승인완료</div>
                        ) : myReview.approvedStatus === 'PENDING' ? (
                            <div className="review_pending">승인대기</div>
                        ) : myReview.approvedStatus === 'REJECTED' ? (
                            <div className="review_rejected">승인거절</div>
                        ) : null}
                    </div>
                    <div className="review_box_contents">
                        {myReview.keywords.map((item, index) => (
                            <KeywordBar key={index} text={item} />
                        ))}
                    </div>
                    <p className="review_comment">{myReview.content}</p>
                </div>
            ))}
        </div>
    );
}