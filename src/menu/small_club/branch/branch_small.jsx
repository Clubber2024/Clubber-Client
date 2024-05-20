import React from 'react';
import { useEffect, useState } from 'react';
import styles from './branch_small.module.css';
import axios from 'axios';
import SmallClub from './component/smallClub';
import { useLocation } from 'react-router-dom';

function BranchSmall() {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const department = location.state.department;

    const getSmallClubs = async () => {
        try {
            const response = await axios.get(`http://15.164.211.56:8080/v1/clubs?department=${department}`);
            setClubs(response.data.data.clubs);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSmallClubs();
    }, []);

    if (loading) return <div>Loading...</div>;
    //if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <h2 className={styles.header_title}>{department}</h2>
                </div>
            </div>
            <div className={styles.container}>
                {clubs.map((club) => (
                    <SmallClub
                        key={club.clubId}
                        clubId={club.clubId}
                        clubName={club.clubName}
                        introduction={club.introduction}
                    />
                ))}
            </div>
        </div>
    );
}

export default BranchSmall;

/*
        <div>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <h2 className={styles.header_title}>컴퓨터학부</h2>
                </div>
            </div>
            <div>
                <div className={styles.container}>
                    <div className={styles.rectangle}>
                        <img className={styles.image} alt="club1" src="/branch_image/club1.png" />
                        <h3 className={styles.title}>{name}</h3>
                        <p className={styles.content}>
                            {introduciton}
                        </p>
                    </div>
                    <div className={styles.rectangle}>
                        <img className={styles.image} alt="club2" src="/branch_image/club2.png" />
                        <h3 className={styles.title}>스터디</h3>
                        <p className={styles.content}>
                            공부를 좋아하는 학생들끼리 모인 곳 입니다!<br></br>정기적으로 스터디를 하는 동아리입니다.
                            <br></br>열정만 있으시다면 누구나 환영입니다.
                        </p>
                    </div>
                    <div className={styles.rectangle}>
                        <img className={styles.image} alt="club1" src="/branch_image/club1.png" />
                        <h3 className={styles.title}>더 밴드</h3>
                        <p className={styles.content}>
                            음악을 좋아하는 학생들끼리 모인 곳 입니다!<br></br>
                            정기적으로 밴드 공연을 하는 동아리입니다.
                            <br></br>
                            악기 연주 경험이 없으셔도 괜찮습니다.<br></br>음악을 사랑한다면 누구나 환영입니다.
                        </p>
                    </div>

                    <div className={styles.rectangle}>
                        <img className={styles.image} alt="club2" src="/branch_image/club2.png" />
                        <h3 className={styles.title}>스터디</h3>
                        <p className={styles.content}>
                            공부를 좋아하는 학생들끼리 모인 곳 입니다!<br></br>정기적으로 스터디를 하는 동아리입니다.
                            <br></br>열정만 있으시다면 누구나 환영입니다.
                        </p>
                    </div>
                </div>

               */
