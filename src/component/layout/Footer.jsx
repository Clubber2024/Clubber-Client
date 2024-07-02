import React from 'react';
//import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_content}>
                <p className={styles.text_ContactUs}>contact us</p>
                <br />
                <p className={styles.p}>instagram:@clubber phone-number:010-1234-5678 email: clubber@gmail.com</p>
            </div>
        </div>
    );
}

export default Footer;
