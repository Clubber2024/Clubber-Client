import React from 'react';
//import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_content}>
                <p className={styles.text_ContactUs}>contact us</p>
                <p className={styles.p}>instagram:</p>
                <p className={styles.p}>phone-number: </p>
                <p className={styles.p}>email:</p>
            </div>
        </div>
    );
}

export default Footer;
