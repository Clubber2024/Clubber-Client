import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hashtag.css';

const hashtag = [
    { band: '밴드' },
    { game: '게임' },
    { picture: '사진' },
    { programming: '개발' },
    { language: '언어' },
    { sports: '운동' },
    { cooking: '요리' },
    { news: '시사' },
    { dancing: '댄스' },
    { volunteer: '봉사' },
    { religion: '종교' },
];

export default function HashTag() {
    const navigate = useNavigate();
    const onClicked = (hashTagValue) => {
        navigate(`/components/hashtag/branchHashtag`, { state: { hashtag: hashTagValue } });
    };
    return (
        <>
            {hashtag.map((item, index) => {
                const tagName = Object.keys(item)[0];
                const tagVal = item[tagName];
                return (
                    <div className="tag_container" key={index} onClick={() => onClicked(tagVal)}>
                        <img src={`/main/hashtag/${tagName}_icon.png`} alt={`${tagName} icon`} width={48} height={45} />
                        <p className="tag_text"># {tagVal}</p>
                    </div>
                );
            })}
        </>
    );
}
