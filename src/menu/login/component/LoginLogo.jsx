import React from 'react';
import styles from './LoginLogo.module.css';

function LoginLogo() {
    return (
        <>
            <div>
                <h1 className={styles.logo}>CluBBer</h1>
                <h6 className={styles.mini_logo}>be a clubber</h6>
            </div>
        </>
    );
}
export default LoginLogo;
