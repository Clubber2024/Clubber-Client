import styles from './recruitList.module.css';
import { customAxios } from '../../config/axios-config';
import { useEffect, useState } from 'react';

export default function RecruitList() {
    const [PromoteData, setPromoteData] = useState([]);

    const getPromoteData = async () => {
        try {
            const res = await customAxios.get(`/v1/recruits`);
            if (res.data.success) {
                setPromoteData(res.data.data.content);
                console.log(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getPromoteData();
    }, []);

    return (
        <>
            <div className={styles.title}>모집글</div>
            <div className={styles.recruit_container} key={PromoteData.recruitId}>
                {PromoteData?.map((item) => (
                    <div className={styles.recruit_box}>
                        <img src={item.images} alt="club_logo" className={styles.recruit_logo} />
                        <div className={styles.recruit_div}>
                            <p className={styles.recruit_title}>{item.title}</p>
                            <p className={styles.recruit_text}>{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
