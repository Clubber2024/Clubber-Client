import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './mainNotice.module.css';

// const noticeData = [
//     {
//         id: 1,
//         title: "중앙 동아리 최신 정보 업데이트 안내",
//         date: "2024.05.14"
//     },
//     {
//         id: 2,
//         title: "해시태그 기반 검색 오류 해결 안내",
//         date: "2024.05.14"
//     },
//     {
//         id: 3,
//         title: "구글 로그인 기능 추가 완료 안내",
//         date: "2024.05.14"
//     },
//     {
//         id: 4,
//         title: "해시태그 기반 검색 오류 해결 안내",
//         date: "2024.05.14"
//     },
//     {
//         id: 5,
//         title: "카카오 로그인 하기실타 ~~!",
//         date: "2024.05.14"
//     }
// ]

export default function MainNotice() {
    const [noticeData, setNoticeData] = useState([]);

    const getNoticeData = async () => {
        try {
            const res = await axios.get(`http://15.164.211.56:8080/v1/notices`);
            if (res.data.success) {
                setNoticeData(res.data.data);
                console.log(res.data.data);
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
            <div className={styles.notice_index}>공지사항</div>
            <div className={styles.notice_container}>
                {noticeData.map((item) => (
                    <div key={item.noticeId} className={styles.div_notice}>
                        <div>{item.content}</div>
                        <p>|</p>
                        <p>{formatDate(item.createdAt)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
