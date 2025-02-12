import { useEffect, useState } from 'react';
import styles from './summary.module.css';
import { customAxios } from '../../config/axios-config';
function Summary() {
    const [summaryData, setSummaryData] = useState([]);

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

    return (
        <div className={styles.wrapper}>
            <div className={styles.summary_container}>
                <img src="/summary/summary1.png" alt="summary" className={styles.summary_logo} />
                {summaryData.map((item) => (
                    <div key={item.division} className={styles.categoryBox}>
                        <h3 className={styles.categoryTitle}>{item.division}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Summary;
