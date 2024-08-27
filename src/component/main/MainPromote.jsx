import { useState, useEffect } from 'react';
import styles from './mainPromote.module.css';
import { customAxios } from '../../config/axios-config';
import { LinkItem } from '../branch/BranchCentral';
import { useNavigate } from 'react-router-dom';

export default function MainPromote() {
    const [PromoteData, setPromoteData] = useState([]);
    const navigate = useNavigate();

    const getPromoteData = async () => {
        try {
            const res = await customAxios.get(`/v1/recruits/main-page`);
            if (res.data.success) {
                setPromoteData(res.data.data.recruits);
                // console.log(res.data.datae);
            }
        } catch (error) {
            // console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getPromoteData();
    }, []);

    const onClickRecruit = (recruitId) => {
        navigate(`/recruit/${recruitId}`, {
            state: { recruitId: recruitId },
        });
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }

    // 메인 페이지에 보여줄 모집글
    return (
        <div className={styles.container}>
            <LinkItem to={'/recruit'}>
                <div className={styles.promote_index}>모집글</div>
            </LinkItem>
            <div className={styles.promote_container}>
                {PromoteData?.map((item) => (
                    <div
                        key={item.recruitId}
                        className={styles.div_promote}
                        onClick={() => onClickRecruit(item.recruitId)}
                    >
                        <div className={styles.div_promote_content}>
                            <div>{item.title}</div>
                            <p className={styles.promote_line}>|</p>
                            <p className={styles.promote_date}>{formatDate(item.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/*

*/
