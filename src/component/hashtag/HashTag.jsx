import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../../config/axios-config';
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
    const [imgUrls, setImgUrls] = useState([]);

    const getHashtagImg = async () => {
        try {
            const res = await customAxios.get(`/v1/clubs/hashtags`);

            if (res.data.success) {
                const imageUrls = res.data.data.map(item => item.imageUrl);
                setImgUrls(imageUrls);
                console.log(imgUrls);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getHashtagImg();
    }, [])

    const onClicked = (hashTagValue) => {
        console.log(hashTagValue);

        navigate(`/hashtag?tag=${hashTagValue}`, { state: { hashtag: hashTagValue } });
    };
    return (
        <>
            {hashtag.map((item, index) => {
                const tagName = Object.keys(item)[0];
                const tagVal = item[tagName];
                const imgUrl = imgUrls[index];
                return (
                    <div className="tag_container" key={index} onClick={() => onClicked(tagName)}>
                        <div className="tag_circle">
                        {imgUrl ? (
                            <img src={imgUrl} alt={`${tagName} icon`} width={42} height={42}/>
                        ) : (
                            <div className="placeholder_image" style={{ width: 48, height: 45 }}></div>
                        )}
                        </div>
                        <p className="tag_text"># {tagVal}</p>
                    </div>
                );
            })}
        </>
    );
}
