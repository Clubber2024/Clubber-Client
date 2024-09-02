import '../mypage/review/myReview.css';
import '../detail/review/reviewBox.css';
import KeywordBar from '../detail/review/KeywordBar';
import { useEffect, useState } from 'react';
import { customAxios } from '../../config/axios-config';

export default function ClubReviews() {
    const [clubReviewData, setClubReviewData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const getMyReviews = async (page) => {
            try {
                const res = await customAxios.get(`/v1/admins/reviews`, {
                    params: { page, size: 2 },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log(res);
                if (res.data.success) {
                    // setClubReviewData(res.data.data.clubReviews.content);
                    setClubReviewData((prevData) => [
                        ...prevData,
                        ...res.data.data.clubReviews.content, // 기존 데이터와 새 데이터 병합
                    ]);
                    setHasNextPage(res.data.data.clubReviews.hasNextPage);
                    console.log(clubReviewData);
                }
            } catch (error) {
                console.error('Error fetching my reviews : ', error);
            }
        };
        getMyReviews(page);
    }, [accessToken, page]);

    const loadMoreReviews = () => {
        if (hasNextPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="my_review_container">
            <h3 className='my_review_title'>동아리 리뷰 목록</h3>
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
            {hasNextPage && (
                <button onClick={loadMoreReviews} className="more_button">⌵</button>
            )}
        </div>
    );
}