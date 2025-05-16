import { Maximize } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TimerStyled = styled.p`
    font-family: Noto Sans KR;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #fd3c56;

    @media screen and (max-width: 768px) {
        font-size: 15px;
        font-weight: 600;
    }
`;

export default function Timer() {
    const MINUTES_IN_MS = 5 * 60 * 1000;
    const INTERVAL = 1000;
    const [count, setCount] = useState(MINUTES_IN_MS);
    //한자리 숫자일 때 앞에 0을 붙여서 두자리를 유지시키기 위해
    // padStart 사용
    const minutes = String(Math.floor((count / (1000 * 60)) % 60)).padStart(2, '0');
    const second = String(Math.floor((count / 1000) % 60)).padStart(2, '0');

    useEffect(() => {
        const id = setInterval(() => {
            setCount((prev) => {
                if (prev <= 0) {
                    clearInterval(id);
                    return 0;
                }
                return prev - INTERVAL;
            });
        }, INTERVAL);

        if (count === 0) {
            clearInterval(id);
            //타이머 종료될 시, 어떤 기능 추가??
        }
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <TimerStyled>
                {minutes}: {second}
            </TimerStyled>
        </>
    );
}
