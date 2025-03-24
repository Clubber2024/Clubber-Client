import React, { useEffect, useState } from 'react';
import { customAxios } from '../../../../config/axios-config';
import styles from './changeAdminEmail.module.css';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../../modal/ErrorModal';

export default function ChangeAdminEmail() {
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const [authEmail, setAuthEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [isVerifyEmail, setIsVerifyEmail] = useState(false);
    const [isVerifyCode, setIsVerifyCode] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [emailCodeMessage, setEmailCodeMessage] = useState('');
    const [isNext, setIsNext] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    //이메일 인증 api
    const postUpdateEmail = async () => {
        try {
            const res = await customAxios.post(`v1/admins/auths/me/update-email/send`, {
                email: email,
            });

            if (res.data.success) {
                console.log(res.data);
                setAuthEmail(email);
            }
        } catch {}
    };

    //이메일 인증 api
    const postUpdateCode = async () => {
        try {
            const res = await customAxios.post(`v1/admins/auths/me/update-email/verify`, {
                email: email,
                authCode: emailCode,
            });

            if (res.data.success) {
                console.log(res.data);
                setIsVerifyCode(true);
                setAuthCode(emailCode);
                setIsNext(true);
                setEmailCodeMessage('인증되었습니다');
            }
        } catch {
            setIsVerifyCode(false);
            setEmailCodeMessage('인증번호를 확인해주세요.');
        }
    };

    //새이메일 정보 update api
    const patchUpdateEmail = async () => {
        try {
            const res = await customAxios.patch(
                `/v1/admins/me/email`,
                {
                    email: authEmail,
                    authCode: authCode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log(res.data);

            if (res.data.success) {
                setModalMessage('이메일이 변경되었습니다.');
                setIsModalOpen(true);
            }
        } catch {}
    };

    //이메일 관련 함수
    const onChangeEmail = (e) => {
        if (isVerifyCode) return;
        const currentEmail = e.target.value;
        setEmail(currentEmail);
    };

    const handleEmailVerificationButton = () => {
        if (isVerifyEmail) {
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setIsVerifyEmail(false);
            setEmailMessage('올바른 이메일 형식이 아닙니다.');
            return;
        } else {
            setIsVerifyEmail(true);
            postUpdateEmail();
            setEmailMessage('인증번호를 전송했습니다.');
        }
    };

    const handleVerfiyCode = () => {
        if (isVerifyCode) {
            return;
        } else {
            if (emailCode) {
                postUpdateCode();
            }
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

    const onClickCompleteButton = () => {
        patchUpdateEmail();
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
        navigate(-1);
    };

    return (
        <div className={styles.change_email_total_div}>
            <div>
                <p className={styles.change_email_total_title}>이메일 변경</p>
            </div>

            <div className={styles.content_title_div}>
                <p className={styles.content_title}>새 이메일 주소</p>
            </div>
            <div className={styles.input_email_div}>
                <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    className={styles.content_input_email}
                    placeholder="새 이메일 입력"
                    autoComplete="off"
                />
                <button
                    onClick={handleEmailVerificationButton}
                    className={email ? styles.content_input_email_button : styles.content_input_email_button_before}
                >
                    인증메일 인증
                </button>
            </div>
            <p className={isVerifyEmail ? styles.message_email_confirm : styles.message_email}>{emailMessage}</p>

            <div className={styles.content_title_div}>
                <p className={styles.content_title}>인증 코드</p>
            </div>
            <div className={styles.input_email_div}>
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
                    className={emailCode ? styles.content_input_email_button : styles.content_input_email_button_before}
                >
                    인증번호 확인
                </button>
            </div>
            <p className={isVerifyCode ? styles.message_email_confirm : styles.message_email}>{emailCodeMessage}</p>

            <button
                className={isNext ? styles.sign_up_button : styles.sign_up_button_no}
                onClick={onClickCompleteButton}
            >
                완료
            </button>

            {isModalOpen && <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={onCloseModal} />}
        </div>
    );
}
