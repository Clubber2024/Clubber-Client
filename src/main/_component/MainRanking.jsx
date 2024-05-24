import { useState, useEffect } from 'react';
import axios from 'axios';
import './mainRanking.css';

export default function MainRanking() {
    const [rankingData, setRankingData] = useState([]);

    const getRankingData = async () => {
        try {
            const res = await axios.get(`http://15.164.211.56:8080/v1/clubs/popular`);
            if (res.data.success) {
                setRankingData(res.data.data);
                console.log(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getRankingData();
    }, []);

    // 메인페이지에 보여줄 동아리 순위
    return (
        <div className="container">
            <div className="ranking_index">조회수</div>
            <div className="ranking_container">
                {rankingData.map((item, index) => {
                    return (
                        <>
                            <div key={index} className="div_ranking">
                                <p>{index + 1}. </p>
                                <p>{item.clubName}</p>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}
