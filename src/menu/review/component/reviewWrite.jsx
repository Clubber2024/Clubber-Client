import React from 'react';
import './reviewWrite.css';
import { useState } from 'react';

function ReviewWrite() {
    const btns = [
        {
            type: 'smile',
            title: '"분위기가 좋아요"',
            image: '/review/smile.png',
        },
        {
            type: 'money',
            title: '"회비가 적당해요"',
            image: '/review/money.png',
        },
        {
            type: 'people',
            title: '"활동 참여가 자유로워요"',
            image: '/review/people.png',
        },
        {
            type: 'trophy',
            title: '"대외활동에 좋아요"',
            image: '/review/trophy.png',
        },
        {
            type: 'good',
            title: '"운영진들이 일을 잘해요"',
            image: '/review/good.png',
        },
    ];

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

    const handleSubmit = () => {
        console.log(btnActive);
        //db연결 전 콘솔에 출력
        setBtnActive({}); //제출 후 버튼 초기화
    };

    const submitButtonClass = Object.values(btnActive).includes(true) ? 'submit-active' : 'submit';

    return (
        <div>
            <h2 className="title">써밋에 대한 키워드를 골라주세요!</h2>

            {btns.map((item) => (
                <button
                    key={item.type}
                    onClick={() => handleClick(item.type)}
                    className={btnActive[item.type] ? 'button-active' : 'button'}
                >
                    <div className="div_style">
                        <img className="img" src={item.image} alt={item.title} />
                    </div>
                    <p className="button_text">{item.title}</p>
                </button>
            ))}
            <button type="button" onClick={handleSubmit} className={submitButtonClass}>
                작성하기
            </button>
        </div>
    );
}
export default ReviewWrite;
