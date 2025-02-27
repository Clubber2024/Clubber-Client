import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../../config/axios-config';
import './hashtag.css';

// const hashtag = [
//     { MUSIC: '음악' },
//     { GAME: '게임' },
//     { PICTURE: '사진' },
//     { PROGRAMMING: '개발' },
//     { LANGUAGE: '언어' },
//     { SPORTS: '스포츠' },
//     { DANCE: '댄스' },
//     { VOLUNTEER: '봉사' },
//     { RELIGION: '종교' },
//     { STUDY: '학술' },
//     { ETC: '기타' },
// ];

export default function HashTag() {
    const navigate = useNavigate();
    const [imgUrls, setImgUrls] = useState([]);
    const [titles, setTitles] = useState([]);
    const [codes, setCodes] = useState([]);

    const getHashtagImg = async () => {
        try {
            const res = await customAxios.get(`/v1/clubs/hashtags`);

            if (res.data.success) {
                const imageUrls = res.data.data.map((item) => item.imageUrl);
                const titles = res.data.data.map((item) => item.title);
                const code = res.data.data.map((item) => item.code);
                setImgUrls(imageUrls);
                setTitles(titles);
                setCodes(code);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getHashtagImg();
    }, []);

    const onClicked = (hashTagValue) => {
        navigate(`/hashtag?tag=${hashTagValue}`, { state: { hashtag: hashTagValue } });
    };
    return (
        <>
            {titles?.map((item, index) => {
                const imgUrl = imgUrls[index];
                return (
                    <div className="tag_container" key={index} onClick={() => onClicked(codes[index])}>
                        <div className="tag_circle">
                            {imgUrl ? (
                                <img src={imgUrl} alt={`$icon`} width={42} height={42} />
                            ) : (
                                <div className="placeholder_image" style={{ width: 48, height: 45 }}></div>
                            )}
                        </div>
                        <p className="tag_text"># {titles[index]}</p>
                    </div>
                );
            })}
        </>
    );
}
