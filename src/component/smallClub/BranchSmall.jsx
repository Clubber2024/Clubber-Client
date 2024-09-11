import React from 'react';
import { useEffect, useState } from 'react';
import styles from './branchSmall.module.css';
import axios from 'axios';
import SmallClubProps from './SmallClubProps';
import { useLocation } from 'react-router-dom';
import { customAxios } from '../../config/axios-config';

function BranchSmall() {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [departmentTitle, setDepartmentTitle] = useState('');
    const [error, setError] = useState(null);
    const location = useLocation();
    const department = location.state.department;

    const getSmallClubs = async () => {
        try {
            const response = await customAxios.get(`/v1/clubs?department=${department}`);
            setDepartmentTitle(response.data.data.department);
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

    const renderDataInRows = (data) => {
        const rows = [];
        for (let i = 0; i < data.length; i += 4) {
            const rowItems = data.slice(i, i + 4);
            rows.push(
                <div className={styles.container} key={i}>
                    {rowItems.map((club) => (
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
        return rows;
    };

    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <h2 className={styles.header_title}>{departmentTitle}</h2>
                </div>
                {renderDataInRows(clubs)}
            </div>
        </div>
    );
}

export default BranchSmall;
