import React, { useRef, useState } from 'react';
import styles from './findAdminPassword.module.css';
import { customAxios } from '../../../config/axios-config';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../modal/ErrorModal';

export default function FindAdminPassword() {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');

    const [authCode, setAuthCode] = useState('');
    const [isVerifyEmail, setIsVerifyEmail] = useState(false);
    const [isVerifyCode, setIsVerifyCode] = useState(false);

    const [emailMessage, setEmailMessage] = useState('');
    const [emailCodeMessage, setEmailCodeMessage] = useState('');
    const [idMessage, setIdMessage] = useState('');

    const [isNext, setIsNext] = useState(false);

    const onChangeId = (e) => {
        setId(e.target.value);
    };

    //이메일 인증 api
    const postFindCode = async (currentEmail) => {
        setEmail(currentEmail);
        try {
            const res = await customAxios.post(`/v1/admins/auths/reset-password/send`, {
                username: id,
                email: currentEmail,
            });

            if (res.data.success) {
                setIdMessage('');
                setIsVerifyEmail(true);
                setEmailMessage('인증번호를 전송했습니다.');
            }
        } catch (error) {
            // console.log(error.response.data.reason);
            setIdMessage(error.response.data.reason);
        }
    };

    //인증번호 검증 api
    const postFindVerifyCode = async () => {
        try {
            const res = await customAxios.post(`/v1/admins/auths/reset-password/verify`, {
                username: id,
                authCode: emailCode,
            });
            console.log(res);
            if (res.data.success) {
                console.log(res.data);
                setIsVerifyCode(true);
                setEmailCodeMessage('인증되었습니다.');
                setAuthCode(emailCode);
                setIsNext(true);
            }
        } catch {
            setIsVerifyCode(false);
            setIsNext(false);
            setEmailCodeMessage('인증번호를 확인해주세요.');
        }
    };

    //

    //이메일 관련 함수
    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
    };

    const handleEmailVerificationButton = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setIsVerifyEmail(false);
            setEmailMessage('올바른 이메일 형식이 아닙니다.');
            return;
        } else {
            postFindCode(email);
        }
    };

    //인증코드 관련 함수
    const onChangeCode = (e) => {
        if (isVerifyCode) {
            return;
        } else {
            const currentCode = e.target.value;
            setEmailCode(currentCode);
        }
    };

    const handleVerfiyCode = () => {
        if (isVerifyCode) {
            return;
        } else {
            if (emailCode) {
                postFindVerifyCode();
                setIsVerifyCode(true);
            }
        }
    };

    const onClickCompleteButton = () => {
        if (id && authCode) {
            navigate(`/login/adminResetPassword`, {
                state: {
                    id: id,
                    authCode: authCode,
                },
            });
        }
    };

    return (
        <>
            <div className={styles.password_total_div}>
                <p className={styles.total_title}>비밀번호 찾기</p>
                <div className={styles.content_div}>
                    <div className={styles.content_title_div}>
                        <p className={styles.content_title}>아이디</p>
                    </div>

                    <div className={styles.content_id_div}>
                        <input
                            id="id"
                            name="id"
                            value={id}
                            onChange={onChangeId}
                            className={styles.content_input_id}
                            placeholder="아이디 입력"
                            autoComplete="off"
                        />
                    </div>
                    <p className={styles.message}>{idMessage}</p>

                    <div className={styles.content_title_div}>
                        <p className={styles.content_title}>이메일 주소</p>
                    </div>

                    <div className={styles.input_email_div}>
                        <input
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            className={styles.content_input_email}
                            placeholder="이메일 입력"
                            autoComplete="off"
                        />
                        <button
                            onClick={handleEmailVerificationButton}
                            className={
                                email ? styles.content_input_email_button : styles.content_input_email_button_before
                            }
                        >
                            인증메일 인증
                        </button>
                    </div>
                    <p className={isVerifyEmail ? styles.message_email_confirm : styles.message_email}>
                        {emailMessage}
                    </p>

                    <div className={styles.content_title_div}>
                        <p className={styles.content_title}>인증 코드</p>
                    </div>

                    <div className={styles.content_id_div}>
                        <input
                            id="code"
                            name="code"
                            value={emailCode}
                            onChange={onChangeCode}
                            className={styles.content_input_email}
                            placeholder="인증코드 입력"
                            autoComplete="off"
                        />
                        <button
                            onClick={handleVerfiyCode}
                            className={
                                emailCode ? styles.id_duplicate_check_button : styles.id_duplicate_check_button_before
                            }
                        >
                            인증번호 확인
                        </button>
                    </div>
                    <p className={isVerifyCode ? styles.message_code_confirm : styles.message_code}>
                        {emailCodeMessage}
                    </p>
                </div>

                <button
                    className={isNext ? styles.sign_up_button : styles.sign_up_button_no}
                    onClick={onClickCompleteButton}
                >
                    다음
                </button>
            </div>
        </>
    );
}
