import { useState, useEffect } from 'react';
import axios from 'axios';
import './mainRanking.css';

// const rankingData = [
//     {
//         id: 1,
//         name: "유어슈"
//     },
//     {
//         id: 2,
//         name: "UMC"
//     },
//     {
//         id: 3,
//         name: "SCCC"
//     },
//     {
//         id: 4,
//         name: "써밋"
//     },
//     {
//         id: 5,
//         name: "서있는 살암들"
//     },
//     {
//         id: 6,
//         name: "ASC"
//     },
//     {
//         id: 7,
//         name: "두메"
//     },
//     {
//         id: 8,
//         name: "FRAME"
//     },
//     {
//         id: 9,
//         name: "바람개비"
//     },
//     {
//         id: 10,
//         name: "멋사"
//     }
// ]

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
                    )
                })}
            </div>
        </div>
    );
}
