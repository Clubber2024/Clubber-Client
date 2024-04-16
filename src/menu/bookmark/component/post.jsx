import { useState, useEffect } from 'react';
import React from 'react';
import StarButton from './starButton';

const Post = (props) => {
    const [Like, setLike] = useState(false);

    /* db data 필요 	
    useEffect(async () => {
        const fetchData = async ("db에서 데이터") => {
            const res = await axios.get();
            if (res.data.type === 'liked') 
						setLike(true);
        };
        fetchData();
    }, []); 
	
	*/
};
const toggleLike = async (e) => {
    const res = await axios.post(/*db data*/); // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    setLike(!like);
};

return (
    <>
        <StarButton like={like} onClick={toggleLike} />
        ...
        <Detail content={content} />
    </>
);

export default Post;
