import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarImg from '../bookmark_image/starYellow.png';
import EmptyStarImg from '../bookmark_image/star.png';

const Star = styled.img`
    width: 18px;
    height: 18px;
`;

const StarButton = ({ Like, onClick }) => {
    return <Star src={Like ? StarImg : EmptyStarImg} onCick={onClick} />;
};

export default StarButton;

//부모 컴포넌트로부터 like과 onClick을 props로 받는다.like은 유저가 좋아요를 눌렀는지를 체크하는 state이다. 만약 좋아요를 눌렀다면 채워진 별을 띄워주고, 좋아요를 누르지 않았다면 빈 별을 띄워준다. onClick은 부모로부터 받은 like의 상태를 바꿔주는 함수.
