import React, { useEffect, useState } from 'react';
import styles from './smallClub.module.css';
import { useNavigate } from 'react-router-dom';

function SmallClub() {
    const navigate = useNavigate();

    const onClicked = (departmentValue) => {
        navigate('/small/colleges', { state: { department: departmentValue } });
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <h2 className={styles.header_title}>단과대</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.rectangle}>
                    <h3 className={styles.title}>IT대학</h3>

                    <h5 className={styles.text} onClick={() => onClicked('컴퓨터학부')}>
                        컴퓨터학부
                    </h5>

                    <h5 className={styles.text} onClick={() => onClicked('글로벌미디어학부')}>
                        글로벌미디어학부
                    </h5>
                    <h5 className={styles.text} onClick={() => onClicked('AI융합학부')}>
                        AI융합학부
                    </h5>
                    <h5 className={styles.text} onClick={() => onClicked('전자정보공학부')}>
                        전자정보공학부
                    </h5>
                    <h5 className={styles.text} onClick={() => onClicked('소프트웨어학부')}>
                        소프트웨어학부
                    </h5>
                </div>
                <div className={styles.rectangle}>
                    <h3 className={styles.title}>경영대학</h3>
                    <div className={styles.scrollBar}>
                        <h5 className={styles.text} onClick={() => onClicked('회계학과')}>
                            회계학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('벤처경영학과')}>
                            벤처경영학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('복지경영학과')}>
                            복지경영학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('벤처중소기업학과')}>
                            벤처중소기업학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('금융학부')}>
                            금융학부
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('혁신경영학과')}>
                            혁신경영학과
                        </h5>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <h3 className={styles.title}>경제통상대학</h3>
                    <h5 className={styles.text} onClick={() => onClicked('경제학과')}>
                        경제학과
                    </h5>
                    <h5 className={styles.text} onClick={() => onClicked('금융경제학과')}>
                        금융경제학과
                    </h5>
                    <h5 className={styles.text} onClick={() => onClicked('글로벌통상학과')}>
                        글로벌통상학과
                    </h5>
                    <h5 className={styles.text} onClick={() => onClicked('국제무역학과')}>
                        국제무역학과
                    </h5>
                </div>
                <div className={styles.rectangle}>
                    <h3 className={styles.title}>공과대학</h3>
                    <div className={styles.scrollBar}>
                        <h5 className={styles.text} onClick={() => onClicked('화학공학과')}>
                            화학공학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('전기공학부')}>
                            전기공학부
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('건축학부')}>
                            건축학부
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('산업정보시스템공학과')}>
                            산업정보시스템공학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('기계공학부')}>
                            기계공학부
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('신소재공학과')}>
                            신소재공학과
                        </h5>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.rectangle}>
                    <h3 className={styles.title}>법과대학</h3>
                    <h5 className={styles.text} onClick={() => onClicked('법학과')}>
                        법학과
                    </h5>
                    <h5 className={styles.text} onClick={() => onClicked('국제법무학과')}>
                        국제법무학과
                    </h5>
                </div>

                <div className={styles.rectangle}>
                    <h3 className={styles.title}>사회과학대학</h3>
                    <div className={styles.scrollBar}>
                        <h5 className={styles.text} onClick={() => onClicked('사회복지학부')}>
                            사회복지학부
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('정치외교학과')}>
                            정치외교학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('언론홍보학과')}>
                            언론홍보학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('행정학부')}>
                            행정학부
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('정보사회학과')}>
                            정보사회학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('평생교육학과')}>
                            평생교육학과
                        </h5>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <h3 className={styles.title}>인문대학</h3>
                    <div className={styles.scrollBar}>
                        <h5 className={styles.text} onClick={() => onClicked('기독교학과')}>
                            기독교학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('국어국문학과')}>
                            국어국문학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('영어영문학과')}>
                            영어영문학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('불어불문학과')}>
                            불어불문학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('중어중문학과')}>
                            중어중문학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('일어일문학과')}>
                            일어일문학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('철학과')}>
                            철학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('사회과')}>
                            사회과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('예술창작학부')}>
                            예술창작학부
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('스포츠학부')}>
                            스포츠학부
                        </h5>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <h3 className={styles.title}>자연과학대학</h3>
                    <div className={styles.scrollBar}>
                        <h5 className={styles.text} onClick={() => onClicked('수학과')}>
                            수학과
                        </h5>
                        <h5 className={styles.text} onClick={() => '물리학과'}>
                            물리학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('화학과')}>
                            화학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('정보통계보험수리학과')}>
                            정보통계보험수리학과
                        </h5>
                        <h5 className={styles.text} onClick={() => onClicked('의생명시스템학부')}>
                            의생명시스템학부
                        </h5>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <h3 className={styles.title}>자유전공</h3>
                    <div>
                        <h5 className={styles.text}>
                            융합특성화
                            <br />
                            자유전공학부
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SmallClub;
