import '../detail/review/reviewBox.css';
import KeywordBar from '../detail/review/ReviewBox';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MyReview() {
    const [myReviewData, setMyReviewData] = useState([]);

    useEffect(() => {
        const getMyReviews = async () => {
            try {
                const res = await axios.get(`http://13.125.141.171:8080/v1/users/review`);
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
        <div>
            <h2>내가 쓴 리뷰</h2>
            {myReviewData.map(myReview)}
        </div>
    );
}