import React from 'react';
import { useEffect, useState } from 'react';
import styles from './brnachCentral.module.css';
import axios from 'axios';
import CentralClub from './CentralClub';
import { useLocation } from 'react-router-dom';

function BranchCentral() {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const division = location.state.division;

    const getCentralClubs = async () => {
        try {
            const response = await axios.get(`http://13.125.141.171:8080/v1/clubs?division=${division}`);
            setClubs(response.data.data.clubs);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCentralClubs();
    }, []);

    if (loading) return <div>Loading...</div>;
    //if (error) return <div>Error: {error.message}</div>;

    const renderDataInRows = (data) => {
        const rows = [];
        for (let i = 0; i < data.length; i += 4) {
            const rowItems = data.slice(i, i + 4);
            rows.push(
                <div className={styles.container} key={i}>
                    {rowItems.map((club) => (
                        <CentralClub
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
                    <h2 className={styles.header_title}>{division}</h2>
                </div>
                {renderDataInRows(clubs)}
            </div>
        </div>
    );
}

export default BranchCentral;
