import React from 'react';
import { useEffect, useState } from 'react';
import { customAxios } from '../../config/axios-config';
import styles from '../branch/branchCentral.module.css';
import SmallClubProps from '../smallClub/SmallClubProps';

function BranchOfficalClub() {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [clubType, setClubType] = useState('');

    const getOfficialClubs = async () => {
        try {
            const response = await customAxios.get(`/v1/clubs/official`);
            console.log(response.data);
            setClubs(response.data.data.clubs);
            setClubType(response.data.data.clubType);
            // console.log(clubType);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOfficialClubs();
    }, []);

    if (loading) return <div>Loading...</div>;

    const renderDataInRows = (data) => {
        const rows = [];
        if (window.innerWidth <= 768) {
            for (let i = 0; i < data.length; i += 2) {
                const rowItems = data.slice(i, i + 2);
                rows.push(
                    <div className={styles.container} key={i}>
                        {rowItems?.map((club) => (
                            <SmallClubProps
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
        } else {
            for (let i = 0; i < data.length; i += 4) {
                const rowItems = data.slice(i, i + 4);
                rows.push(
                    <div className={styles.container} key={i}>
                        {rowItems?.map((club) => (
                            <SmallClubProps
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
        }
        return rows;
    };

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <h2 className={styles.header_title}>{clubType}</h2>
                </div>
                {renderDataInRows(clubs)}
            </div>
        </>
    );
}

export default BranchOfficalClub;
