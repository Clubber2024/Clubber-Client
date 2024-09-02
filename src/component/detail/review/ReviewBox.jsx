import './reviewBox.css';
import KeywordBar from './KeywordBar';
import { useState, useEffect } from 'react';
import { customAxios } from '../../../config/axios-config';

export default function ReviewBox({ clubId }) {
    const [reviewData, setReviewData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        const fetchKeywordData = async (page) => {
            try {
                const res = await customAxios.get(`/v1/clubs/${clubId}/reviews`, {
                    params: { page, size: 2 },
                });
                if (res.data.success) {
                    // setReviewData(res.data.data.reviews.content);
                    setReviewData((prevData) => [
                        ...prevData,
                        ...res.data.data.reviews.content, // 기존 데이터와 새 데이터 병합
                    ]);
                    setHasNextPage(res.data.data.reviews.hasNextPage);
                    console.log(reviewData);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchKeywordData(page);
        // useCallback 사용 . .
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const loadMoreReviews = () => {
        if (hasNextPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="review_box_wrapper">
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
            {hasNextPage && (
                <button onClick={loadMoreReviews} className="more_button">⌵</button>
            )}
        </div>
    );
}
