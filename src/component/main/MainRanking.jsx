import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './mainRanking.module.css';
import { customAxios } from '../../config/axios-config';
import { Link } from 'react-router-dom';

export default function MainRanking() {
    const [rankingData, setRankingData] = useState([]);

    const getRankingData = async () => {
        try {
            const res = await customAxios.get(`/v1/clubs/popular`);
            if (res.data.success) {
                setRankingData(res.data.data);
                //console.log(res.data.data);
            }
        } catch (error) {
            //console.error("Error fetching data : ", error);
        }
    };

    useEffect(() => {
        getRankingData();
    }, []);

    // 메인페이지에 보여줄 동아리 순위
    return (
        <div className={styles.container}>
            <div className={styles.ranking_index}>조회수</div>
            <div className={styles.ranking_container}>
                {rankingData.map((item, index) => {
                    return (
                        <div key={item.clubId} className={styles.div_ranking_hover}>
                            <div key={index} className={styles.div_ranking}>
                                <p>{index + 1}. </p>
                                <Link
                                    to={`/clubs/${item.clubId}`}
                                    className={styles.clubName}
                                    style={{ textDecoration: 'none' }}
                                >
                                    {item.clubName}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
