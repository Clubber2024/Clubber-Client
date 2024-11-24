import React, { useState } from "react";
import "./reviewStatics.css";
import { useEffect } from "react";
import { customAxios } from "../../../config/axios-config";

// 데이터 예시
// 각 bar마다 color 다르게
const labels = {
  ACTIVITY: '🕺🏻 "활동 참여가 자유로워요"',
  CAREER: '🏆 "대외활동에 좋아요"',
  CULTURE: '😃 "분위기가 좋아요"',
  FEE: '💵 "회비가 적당해요"',
  MANAGE: '👍🏻 "운영진이 일을 잘해요"',
};

export default function ReviewStatics({ clubId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviewsSortedByCount = async () => {
      try {
        const res = await customAxios.get(
          `/v1/clubs/${clubId}/reviews/keyword-stats`
        );
        if (res.data.success) {
          //console.log(res.data.data);
          const reviews = res.data.data.keywordStats;

          const sortedReviews = Object.entries(reviews)
            .sort(([, countA], [, countB]) => countB - countA) // value 값 내림차순
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}); // Convert back to object
          console.log("sorted:", sortedReviews);
          setReviews(sortedReviews);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    getReviewsSortedByCount();
  }, [clubId]);

  // const sortedReviews = Object.entries(reviews);
  // console.log(sortedReviews);
  // const reviewsWithKoreanLabels = sortedReviews.map(([text, count]) => [
  //   labels[text],
  //   count,
  // ]);
  // console.log(reviewsWithKoreanLabels);

  const PercentageBar = ({ text, count, total }) => {
    const percentage = (count / total) * 100;
    return (
      <div className="bar-container">
        <div className="bar" style={{ width: `${percentage}%` }}>
          <span className="bar_text">{text}</span>
          <p className="bar_count">{count}</p>
        </div>
      </div>
    );
  };
  const ReviewStats = ({ data }) => {
    // reduce -> acc + curr.count (누적값) , 0 (초기값)
    const total = data.reduce((acc, curr) => acc + curr[1], 0);

    console.log("total: ", total);
    console.log("data: ", data);
    return (
      <div className="review-stats">
        {data.map((item) => (
          <PercentageBar
            key={item[0]}
            text={item[0]}
            count={item[1]}
            total={total}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <ReviewStats data={Object.entries(reviews)} />
    </>
  );
}
