import './reviewBox.css';
import KeywordBar from './KeywordBar';
import { useState, useEffect } from 'react';
import { customAxios } from '../../../config/axios-config';

export default function ReviewBox({ clubId }) {
    const [reviewData, setReviewData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        const fetchKeywordData = async (page) => {
            try {
                const res = await customAxios.get(`/v1/clubs/${clubId}/reviews`, {
                    params: { page },
                });
                if (res.data.success) {
                    const newReviews = res.data.data.reviews;
                    setReviewData((prevReviews) => [...prevReviews, ...newReviews]);
                    setHasNextPage(res.data.data.reviews.hasNextPage);
                    // setReviewData(res.data.data.reviews);
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
                <button onClick={loadMoreReviews} className="load_more_button">
                    더 불러오기
                </button>
            )}
        </div>
    );
}
