import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './summary.module.css';
import { customAxios } from '../../config/axios-config';

function Summary() {
    const [summaryData, setSummaryData] = useState([]);
    const navigate = useNavigate();

    const getSummaryData = async () => {
        try {
            const res = await customAxios.get(`/v1/clubs/summary`);

            if (res.data.success) {
                console.log(res);
                setSummaryData(res.data.data);
                console.log(summaryData);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSummaryData();
    }, [])

    const onClickClubName = (clubId) => {
        navigate(`/clubs/${clubId}`);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.summary_container}>
                <img src="/summary/summary1.png" alt="summary" className={styles.summary_logo} />
                {summaryData.map((item) => (
                    <div key={item.division} className={styles.division_container}>
                        <h3 className={styles.division_name}>{item.division}</h3>
                        <ul>
                            {item.clubs.map((item) => (
                                <li className={styles.club_name} onClick={() => onClickClubName(item.clubId)}>{item.clubName}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Summary;
