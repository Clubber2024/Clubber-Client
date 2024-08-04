import React from 'react';
import styles from './AdminIntroductionPage.module.css';
export default function AdminIntroductionPage({
    clubName,
    college,
    department,
    introduction,
    instagram,
    //imgUrl,
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

    return (
        <>
            <div className={styles.detailBody}>
                <h3 className={styles.h3_style}>{'<<INTRODUCTION>>'}</h3>
                {/* 타이틀이랑 내용이랑 css 차이를 어떻게 주면 좋을지 ? */}
                <strong>{college === null ? '📌 소속분과' : '📌 단과대 / 학과'}</strong>
                <p className={styles.p_style}>
                    {college === null ? '중앙동아리' : college} / {department === null ? division : department}
                </p>
                <br></br>
                <strong>📌 소개</strong>
                <p className={styles.p_style}>{introduction}</p>
                <br></br>
                <strong>📌 인스타</strong>
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                    <img className={styles.InstaIcon} src="/buttons/instagram_icon.png" alt="instagram" />
                </a>
                <br></br>
                <strong>📌 대표 활동</strong>
                <p className={styles.p_style}>
                    <NewLines text={activity} />
                </p>
                <br></br>
                <strong>📌 동아리장</strong>
                <p className={styles.p_style}>{leader}</p>
                <br></br>
                <strong>📌 동아리실</strong>
                <p className={styles.p_style}>{room}</p>
            </div>
        </>
    );
}
/*
<img className="detail_image" src={imgUrl} alt="club detail image" />
*/
