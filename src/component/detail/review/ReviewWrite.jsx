import React from 'react';
import './reviewWrite.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function ReviewWrite() {
    const btns = [
        {
            type: 'CULTURE',
            title: '"분위기가 좋아요"',
            image: '/review/smile.png',
        },
        {
            type: 'FEE',
            title: '"회비가 적당해요"',
            image: '/review/money.png',
        },
        {
            type: 'ACTIVITY',
            title: '"활동 참여가 자유로워요"',
            image: '/review/people.png',
        },
        {
            type: 'CAREER',
            title: '"대외활동에 좋아요"',
            image: '/review/trophy.png',
        },
        {
            type: 'MANAGE',
            title: '"운영진들이 일을 잘해요"',
            image: '/review/good.png',
        },
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const clubId = location.state.clubId;
    const clubName = location.state.clubName;
    console.log(clubId);
    console.log(clubName);

    const [btnActive, setBtnActive] = useState({});

    const handleClick = (type) => {
        setBtnActive((prevActive) => {
            return {
                ...prevActive,
                [type]: !prevActive[type],
            };
        });
    };
    //이전 버튼상태(prevActive)를 가져와 반전시켜 type값에 저장 후 리턴.

    const onClickNext = async () => {
        const selectedKeywords = Object.keys(btnActive).filter((key) => btnActive[key]);
        console.log(selectedKeywords);
        navigate(`/clubs/${clubId}/review/comment`, { state: { clubId, selectedKeywords } });
    };

    const submitButtonClass = Object.values(btnActive).includes(true) ? 'next-active' : 'next-button';

    return (
        <div className="write-container">
            <h2 className="title">{clubName}에 대한 키워드를 골라주세요!</h2>

            {btns.map((item) => (
                <button
                    key={item.type}
                    onClick={() => handleClick(item.type)}
                    className={btnActive[item.type] ? 'button-active' : 'button-original'}
                >
                    <div className="div_style">
                        <img className="img" src={item.image} alt={item.title} />
                    </div>
                    <p className="button_text">{item.title}</p>
                </button>
            ))}
            <button onClick={onClickNext} className={submitButtonClass}>
                다음
            </button>
        </div>
    );
}
export default ReviewWrite;
