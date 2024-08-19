import React from 'react';
//import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { LinkItem } from '../branch/BranchCentral';

function Footer() {
    return (
        <>
            <div className={styles.font_container}>
                <p className={styles.font}>이용약관ㅣ</p>
                <p className={styles.font}>개인정보처리방침ㅣ</p>
                <p className={styles.font}>운영정책ㅣ</p>
                <p className={styles.font}>공지사항ㅣ</p>
                <LinkItem to={'/qna'}>
                    <p className={styles.font}>FAQ</p>
                </LinkItem>
            </div>
            <div className={styles.footer}>
                <div className={styles.footer_content}>
                    <div className={styles.circle_insta}>
                        <a href="https://www.instagram.com/clubber_ssu/">
                            <img src={'/footer/insta.png'} alt="insta" className={styles.footer_insta} />
                        </a>
                    </div>
                    <p className={styles.p}>상호 : (주)클로버 | 대표자명 : 클러버</p>
                    <br />
                </div>
            </div>
        </>
    );
}

export default Footer;
