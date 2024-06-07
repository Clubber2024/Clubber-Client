import React from 'react';
import LoginLogo from './component/LoginLogo';
import styles from './index.module.css';
import Login from './component/login';

function LoginPage() {
    return (
        <>
            <div className={styles.wrapper}>
                <div>
                    <LoginLogo />
                </div>

                <div>
                    <Login />
                </div>
            </div>
        </>
    );
}

export default LoginPage;
