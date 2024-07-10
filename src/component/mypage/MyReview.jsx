import "../detail/review/reviewBox.css";
import KeywordBar from "../detail/review/ReviewBox";
import axios from "axios";
import { useEffect, useState } from "react";
import "../detail/review/reviewBox.css";
import { customAxios } from "../../config/axios-config";

export default function MyReview() {
  const [myReviewData, setMyReviewData] = useState([]);

  useEffect(() => {
    const getMyReviews = async () => {
      try {
        const res = await customAxios.get(`/v1/users/review`);
        if (res.data.success) {
          setMyReviewData(res.data.data.userReviews);
          console.log(myReviewData);
        }
      } catch (error) {
        console.error("Error fetching my reviews : ", error);
      }
    };
    getMyReviews();
  }, []);

  return (
    <div>
      <h2>내가 쓴 리뷰</h2>
      {myReviewData.map((myReview) => (
        <div className="review_box_container">
          <div key={myReview.reviewId} className="review_box">
            <div className="review_box_header">
              <p>{myReview.clubName}</p>
              <span>{myReview.dateTime}</span>
            </div>
            <div className="review_box_contents">
              {myReview.keywords.map((item, index) => (
                <KeywordBar key={index} text={item} />
              ))}
            </div>
            <p>{myReview.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
