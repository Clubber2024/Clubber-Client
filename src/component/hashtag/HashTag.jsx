import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hashtag.css';

const hashtag = [
    { MUSIC: '음악' },
    { GAME: '게임' },
    { PICTURE: '사진' },
    { PROGRAMMING: '개발' },
    { LANGUAGE: '언어' },
    { SPORTS: '스포츠' },
    // { cooking: '요리' },
    // { NEWS: '시사' },
    { DANCE: '댄스' },
    { VOLUNTEER: '봉사' },
    { RELIGION: '종교' },
    { STUDY: '학술' },
    { ETC: '기타' },
];

export default function HashTag() {
    const navigate = useNavigate();

    const onClicked = (hashTagValue) => {
        console.log(hashTagValue);

        navigate(`/hashtag?tag=${hashTagValue}`, { state: { hashtag: hashTagValue } });
    };
    return (
        <>
            {hashtag.map((item, index) => {
                const tagName = Object.keys(item)[0];
                const tagVal = item[tagName];
                return (
                    <div className="tag_container" key={index} onClick={() => onClicked(tagName)}>
                        <div className="tag_circle"></div>
                        {/* <img src={`/main/hashtag/${tagName}_icon.png`} alt={`${tagName} icon`} width={48} height={45} /> */}
                        <p className="tag_text"># {tagVal}</p>
                    </div>
                );
            })}
        </>
    );
}
