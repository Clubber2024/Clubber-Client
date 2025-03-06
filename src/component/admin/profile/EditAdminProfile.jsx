import React from 'react';
import { customAxios } from '../../../config/axios-config';
import styles from './editAdminProfile.module.css';

export default function EditAdminProfile() {
    return (
        <>
            <div className={styles.title_div}>
                <p className={styles.title_p}>회원정보 수정</p>
            </div>
            <div className={styles.content_div}>
                <div>
                    <p className={styles.content_title}>아이디</p>
                    <input className={styles.content_input} placeholder="아이디 입력" />
                    <p className={styles.content_title}>현재 비밀번호</p>
                    <input className={styles.content_input} placeholder="현재 비밀번호 입력" />
                    <p className={styles.content_title}>새 비밀번호</p>
                    <input className={styles.content_input} placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
                    <p className={styles.content_title}>새 비밀번호 확인</p>
                    <input className={styles.content_input} placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
                    <p className={styles.content_title}>이메일 주소</p>
                    <input className={styles.content_input} placeholder="이메일 입력" />

                    <br />

                    <p className={styles.content_title}>연락수단</p>
                    <br />
                    <p className={styles.contact_title}>1. 인스타그램</p>
                    <input className={styles.content_input} placeholder="인스타그램 아이디 입력" />
                    <p className={styles.contact_title}>2. 기타</p>
                    <input className={styles.content_input} placeholder="기타 연락수단 입력" />
                    <div className={styles.edit_profile_button_div}>
                        <button className={styles.edit_profile_save_button}>저장</button>
                        <button className={styles.edit_profile_cancel_button}>취소</button>
                    </div>
                </div>
            </div>
        </>
    );
}
