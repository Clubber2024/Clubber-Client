import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import HashTagClub from './hashTagClub';
import styles from '../../../menu/central_club/branch/branchCentral.module.css';

function BranchHashTag() {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const hashtag = location.state?.hashtag;

    const getHashTagClubs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://15.164.211.56:8080/v1/clubs?hashtag=${hashtag}`);
            setClubs(response.data.data.clubs);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hashtag) {
            getHashTagClubs();
        }
    }, [hashtag]); // hashtag 값이 변경될 때마다 호출

    if (loading) return <div>Loading...</div>;
    //if (error) return <div>Error: {error.message}</div>;

    const renderDataInRows = (data) => {
        const rows = [];
        for (let i = 0; i < data.length; i += 4) {
            const rowItems = data.slice(i, i + 4);
            rows.push(
                <div className={styles.container} key={i}>
                    {rowItems.map((club) => (
                        <HashTagClub
                            key={club.clubId}
                            clubId={club.clubId}
                            imageUrl={club.imageUrl}
                            clubName={club.clubName}
                            introduction={club.introduction}
                        />
                    ))}
                </div>
            );
        }
        return rows;
    };

    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <h2 className={styles.header_title}># {hashtag}</h2>
                </div>
                {renderDataInRows(clubs)}
            </div>
        </div>
    );
}

export default BranchHashTag;
