import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './search.module.css';
import axios from 'axios';
import SearchClub from './component/searchClub';

function Search() {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [department, setDepartment] = useState([]);
    const [division, setDivision] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const clubName = location.state.clubName;

    const filterByDivision = (club) => club.division != null;
    const filterByDepartment = (club) => club.department != null;

    const getSearchClubs = async () => {
        try {
            const response = await axios.get(`
				http://13.125.141.171:8080/v1/clubs?clubName=${clubName}`);
            const data = response.data.data.clubs;
            setClubs(data);
            setDepartment(data.filter(filterByDepartment));
            setDivision(data.filter(filterByDivision));
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (clubName) {
            getSearchClubs();
        }
    }, [clubName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>해당하는 동아리가 없습니다</div>;

    const renderData = (data) => {
        const rows = [];
        for (let i = 0; i < data.length; i += 4) {
            const rowItems = data.slice(i, i + 4);
            rows.push(
                <div className={styles.container} key={i}>
                    {rowItems.map((club) => (
                        <SearchClub
                            key={club.clubId}
                            clubId={club.clubId}
                            imageUrl={club.imageUrl}
                            clubName={club.clubName}
                            introduction={club.introduction}
                            division={club.division}
                            department={club.department}
                        />
                    ))}
                </div>
            );
        }
        return rows;
    };

    const renderDataDivision = () => {
        const result = renderData(division);
        console.log(`devision: ${result}`);
        return result;
    };
    const renderDataDepartment = (data) => {
        const result = renderData(department);
        console.log(`department: ${result}`);
        return result;
    };

    return (
        <div>
            {department.length > 0 && (
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.header_title}>중앙동아리</h2>
                    </div>
                    {renderDataDepartment(clubs)}
                </div>
            )}

            {division.length > 0 && (
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.header_title}>단과대</h2>
                    </div>
                    {renderDataDivision(clubs)}
                </div>
            )}
        </div>
    );
}

export default Search;
