import React from 'react';
import parse from 'html-react-parser';

export default function IntroductionPage({
    clubName,
    college,
    department,
    introduction,
    instagram,
    youtube,
    imgUrl,
    leader,
    activity,
    room,
    division,
}) {
    // 컴포넌트 내부에서 줄바꿈 처리를 위한 함수
    const handleNewLines = (text) => {
        if (!text) return null;
        return text.split('\n').map((str, index) => (
            <React.Fragment key={index}>
                {str}
                <br />
            </React.Fragment>
        ));
    };

    // 줄바꿈이 적용된 텍스트를 렌더링하는 컴포넌트 예시
    const NewLines = ({ text }) => {
        return <div>{handleNewLines(text)}</div>;
    };
    //링크 텍스트 존재 시 하이퍼링크 자동처리 컴포넌트
    const transformContent = (text) => {
        return text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    };

    return (
        <>
            <div className="detail_body">
                <h3>{'<<INTRODUCTION>>'}</h3>
                {/* 타이틀이랑 내용이랑 css 차이를 어떻게 주면 좋을지 ? */}
                <strong>{college === null ? '📌 소속분과' : '📌 단과대 / 학과'}</strong>
                <p>
                    {college === null ? '중앙동아리' : college} / {department === null ? division : department}
                </p>
                <br></br>
                <strong>📌 소개</strong>
                <p>{introduction ? parse(transformContent(introduction)) : ''}</p>
                <br></br>
                <strong>📌 SNS</strong>
                <div>
                    {instagram ? (
                        <a href={instagram} target="_blank" rel="noopener noreferrer">
                            <img className="insta_icon" src="/buttons/instagram_icon.png" alt="instagram" />
                        </a>
                    ) : (
                        ''
                    )}
                    {youtube ? (
                        <a href={youtube} target="_blank" rel="noopener noreferrer">
                            <img className="youtube_icon" src="/buttons/youtube.png" alt="youtube" />
                        </a>
                    ) : (
                        ''
                    )}
                </div>
                <br></br>

                <strong>📌 대표 활동</strong>
                <p>
                    <NewLines text={activity} />
                </p>
                <br></br>
                {/* <strong>📌 동아리장</strong>
                <p>{leader}</p>
                <br></br> */}
                <strong>📌 동아리실</strong>
                <p>{room}</p>
            </div>
        </>
    );
}
/*
<img className="detail_image" src={imgUrl} alt="club detail image" />
*/
