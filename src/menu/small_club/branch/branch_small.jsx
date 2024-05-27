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
                        imageUrl={club.imageUrl}
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
