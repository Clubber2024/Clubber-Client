import { useNavigate } from 'react-router-dom';
import styles from './mainIco.module.css';
import React from 'react';

export default function MainIco() {
    const navigate = useNavigate();

    return (
        <div className={styles.ico_div}>
            <div className={styles.calender_container} onClick={() => navigate('/calendar')}>
                <img src="/main/icon/CALENDAR.png" alt="calendar_container" className={styles.ico_img} />
                <p className={styles.ico_text}>
                    숭실대 동아리
                    <br />
                    모집 일정
                </p>
                <div className={styles.allow_right_container}>
                    <img src="/main/icon/arrow-right.png" alt="arrow_right" className={styles.allow_right_img} />
                </div>
            </div>
            <div className={styles.map_container}>
                <img src="/main/icon/MAP.png" alt="map_container" className={styles.ico_img} />
                <p className={styles.ico_text}>
                    동아리방
                    <br />
                    지도 조회{' '}
                </p>
                <div className={styles.allow_right_container}>
                    <img src="/main/icon/arrow-right.png" alt="arrow_right" className={styles.allow_right_img} />
                </div>
            </div>

            <div className={styles.pencil_container}>
                <img src="/main/icon/PENCIL.png" alt="pencil_container" className={styles.ico_img} />
                <p className={styles.ico_text}>자주 묻는 질문</p>
                <div className={styles.allow_right_container}>
                    <img src="/main/icon/arrow-right.png" alt="arrow_right" className={styles.allow_right_img} />
                </div>
            </div>
            <div className={styles.folder_container}>
                <img src="/main/icon/FOLDER.png" alt="folder_container" className={styles.ico_img} />
                <p className={styles.ico_text}>서비스 준비 중</p>
                <div className={styles.allow_right_container}>
                    <img src="/main/icon/arrow-right.png" alt="arrow_right" className={styles.allow_right_img} />
                </div>
            </div>
        </div>
    );
}
