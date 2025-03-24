import React, { useRef, useState } from 'react';
import styles from './showAdminId.module.css';
import { customAxios } from '../../../config/axios-config';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorModal from '../../modal/ErrorModal';

export default function ShowAdminId() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, clubName } = location.state || {};
    //아이디 상태값 관리
    console.log(id);

    const handleShowIDButton = () => {
        navigate('/login');
    };

    const handleFindPwButton = () => {
        navigate('/login/adminFindPassword');
    };

    return (
        <div className={styles.show_id_total_div}>
            <div>
                <p className={styles.show_id_total_title}>아이디 찾기</p>
            </div>

            <div className={styles.show_id_content_div}>
                <p className={styles.show_id_content_p}>{clubName}의 아이디는</p>
                <p className={styles.show_id_content_p}>
                    <span className={styles.highlight_id}>{id} </span>입니다.
                </p>
            </div>
            <div className={styles.show_id_button_div}>
                <button className={styles.show_id_login_button} onClick={handleShowIDButton}>
                    로그인
                </button>
                <button className={styles.show_id_find_pw_button} onClick={handleFindPwButton}>
                    비밀번호 찾기
                </button>
            </div>
        </div>
    );
}
