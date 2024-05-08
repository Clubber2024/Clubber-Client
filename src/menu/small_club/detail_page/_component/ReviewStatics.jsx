
import React from 'react';
import "./reviewStats.css";

// 데이터 예시
// 각 bar마다 color 다르게
const reviewData = [
    { text: '😃 "분위기가 좋아요"', count: 72 },
    { text: '💵 "회비가 적당해요"', count: 47 },
    { text: '🕺🏻 "활동 참여가 자유로워요"', count: 30 },
    { text: '🏆 "대외활동에 좋아요"', count: 7 },
    { text: '👍🏻 "운영진이 일을 잘해요"', count: 2 }
];

const PercentageBar = ({ text, count, total }) => {
    const percentage = (count / total) * 100;
    return (
        <div className="bar-container">
            <div className="bar" style={{ width: `${percentage}%` }}>
                <span className="text">{text}</span>
            </div>
        </div>
    );
};

const ReviewStats = ({ data }) => {
    // reduce -> acc + curr.count (누적값) , 0 (초기값)
    const total = data.reduce((acc, curr) => acc + curr.count, 0);
    return (
        <div className="review-stats">
            {data.map((item) => (
                <PercentageBar
                    key={item.text}
                    text={item.text}
                    count={item.count}
                    total={total}
                />
            ))}
        </div>
    );
};

export default function ReviewStatics() {
    return (
        <ReviewStats data={reviewData} />
    );
};
