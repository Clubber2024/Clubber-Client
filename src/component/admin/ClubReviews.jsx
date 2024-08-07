import '../mypage/review/myReview.css';
import '../detail/review/reviewBox.css';
import KeywordBar from '../detail/review/KeywordBar';
import { useEffect, useState } from 'react';
import { customAxios } from '../../config/axios-config';

export default function ClubReviews() {
    const [clubReviewData, setClubReviewData] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const getMyReviews = async () => {
            try {
                const res = await customAxios.get(`/v1/admins/reviews`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log(res);
                if (res.data.success) {
                    setClubReviewData(res.data.data.clubReviews);
                    console.log(clubReviewData);
                }
            } catch (error) {
                console.error('Error fetching my reviews : ', error);
            }
        };
        getMyReviews();
    }, [accessToken]);

    return (
        <div className="club_review_container">
            <h2>동아리 리뷰 목록</h2>
            {clubReviewData.map((cReview) => (
                <div key={cReview.reviewId} className="my_review_box">
                    <div className="review_box_header">
                        <p className="club_name">익명 {cReview.reviewId}</p>
                        <span>{cReview.dateTime}</span>
                        {cReview.approvedStatus === 'APPROVED' ? (
                            <div className="review_approved">승인완료</div>
                        ) : cReview.approvedStatus === 'PENDING' ? (
                            <div className="review_pending">승인대기</div>
                        ) : cReview.approvedStatus === 'REJECTED' ? (
                            <div className="review_rejected">승인거절</div>
                        ) : null}
                    </div>
                    <div className="review_box_contents">
                        {cReview.keywords.map((item, index) => (
                            <KeywordBar key={index} text={item} />
                        ))}
                    </div>
                    <p className="review_comment">{cReview.content}</p>
                </div>
            ))}
        </div>
    );
}