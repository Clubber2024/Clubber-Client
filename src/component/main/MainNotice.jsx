import { useState, useEffect } from 'react';
import styles from './mainNotice.module.css';
import { customAxios } from '../../config/axios-config';
import { LinkItem } from '../branch/BranchCentral';

export default function MainNotice() {
    const [noticeData, setNoticeData] = useState([]);

    const getNoticeData = async () => {
        try {
            const res = await customAxios.get(`/v1/notices/main-page`);
            if (res.data.success) {
                setNoticeData(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getNoticeData();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    }

    // 메인 페이지에 보여줄 공지사항
    return (
        <div className={styles.container}>
            <LinkItem to={'/notices'}>
                <div className={styles.notice_index}>공지사항</div>
            </LinkItem>
            <div className={styles.notice_container}>
                {noticeData.map((item) => (
                    <div key={item.noticeId} className={styles.div_notice}>
                        <LinkItem
                            to={`/notices/${item.noticeId}`}
                            className={styles.notice_div}
                            style={{ textDecoration: 'none' }}
                        >
                            <p className={styles.notice_title}>{item.title}</p>
                            <p className={styles.notice_line}>|</p>
                            <p className={styles.notice_date}>{formatDate(item.createdAt)}</p>
                        </LinkItem>
                    </div>
                ))}
            </div>
        </div>
    );
}
