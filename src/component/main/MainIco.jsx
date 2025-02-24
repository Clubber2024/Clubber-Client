import { useNavigate } from 'react-router-dom';
import styles from './mainIco.module.css';
import React from 'react';
import { useState } from 'react';
import ErrorModal from '../modal/ErrorModal';
import { LinkItem } from '../branch/BranchCentral';

export default function MainIco() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
    };

    const onClickIco = () => {
        setIsModalOpen(true);
        setModalMessage('페이지를 준비 중입니다. 🙌');
    };

    return (
        <>
            <div className={styles.ico_div}>
                <div className={styles.calender_container} onClick={() => navigate('/calendar')}>
                    <img src="/main/icon/CALENDAR.png" alt="calendar_container" className={styles.ico_img} />
                    <p className={styles.ico_text}>
                        숭실대 동아리
                        <br />
                        모집 일정
                    </p>
                    <div className={styles.allow_right_container}>
                        <img src="/main/icon/arrow-right.png" className={styles.allow_right_img} />
                    </div>
                </div>

                <div className={styles.map_container} onClick={() => onClickIco()}>
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
                    <LinkItem to={'/qna'}>
                        <img src="/main/icon/PENCIL.png" className={styles.ico_img_pencil} />
                        <p className={styles.ico_text}>자주 묻는 질문</p>
                        <div className={styles.allow_right_container}>
                            <img src="/main/icon/arrow-right.png" className={styles.allow_right_img} />
                        </div>
                    </LinkItem>
                </div>

                <div className={styles.folder_container} onClick={() => onClickIco()}>
                    <img src="/main/icon/FOLDER.png" className={styles.ico_img} />
                    <p className={styles.ico_text}>서비스 준비 중</p>
                    <div className={styles.allow_right_container}>
                        <img src="/main/icon/arrow-right.png" className={styles.allow_right_img} />
                    </div>
                </div>
            </div>
            {isModalOpen && <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />}
        </>
    );
}
