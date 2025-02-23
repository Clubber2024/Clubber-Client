import styles from './mainIco.module.css';
import React from 'react';

export default function MainIco() {
    return (
        <div className={styles.ico_div}>
            <div className={styles.calender_container}>
                <img src="/main/icon/CALENDAR.png" className={styles.ico_img} />
                <p className={styles.ico_text}>
                    숭실대 동아리
                    <br />
                    모집 일정
                </p>
                <div className={styles.allow_right_container}>
                    <img src="/main/icon/arrow-right.png" className={styles.allow_right_img} />
                </div>
            </div>
            <div className={styles.map_container}>
                <img src="/main/icon/MAP.png" className={styles.ico_img} />
                <p className={styles.ico_text}>
                    동아리방
                    <br />
                    지도 조회{' '}
                </p>
                <div className={styles.allow_right_container}>
                    <img src="/main/icon/arrow-right.png" className={styles.allow_right_img} />
                </div>
            </div>

            <div className={styles.pencil_container}>
                <img src="/main/icon/PENCIL.png" className={styles.ico_img} />
                <p className={styles.ico_text}>자주 묻는 질문</p>
                <div className={styles.allow_right_container}>
                    <img src="/main/icon/arrow-right.png" className={styles.allow_right_img} />
                </div>
            </div>
            <div className={styles.folder_container}>
                <img src="/main/icon/FOLDER.png" className={styles.ico_img} />
                <p className={styles.ico_text}>서비스 준비 중</p>
                <div className={styles.allow_right_container}>
                    <img src="/main/icon/arrow-right.png" className={styles.allow_right_img} />
                </div>
            </div>
        </div>
    );
}
