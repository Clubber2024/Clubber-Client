import React, { useRef, useState } from 'react';
import styles from './findAdminPassword.module.css';
import { customAxios } from '../../../config/axios-config';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../modal/ErrorModal';
import SignUpSearchClub from '../signup/SignUpSearchClub';

export default function FindAdminID() {
    const navigate = useNavigate();

    const [clubName, setClubName] = useState('');
    const [clubType, setClubType] = useState('');
    const [clubId, setClubId] = useState('');
    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const [authEmail, setAuthEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [isVerifyEmail, setIsVerifyEmail] = useState(false);
    const [isVerifyCode, setIsVerifyCode] = useState(false);

    const [emailMessage, setEmailMessage] = useState('');
    const [emailCodeMessage, setEmailCodeMessage] = useState('');

    const [isNext, setIsNext] = useState(false);

    const onChangeClubName = (e) => {
        setClubName(e.target.value);
    };

    //이메일 인증 api
    const postFindCode = async (currentEmail) => {
        setEmail(currentEmail);
        try {
            const res = await customAxios.post(`/v1/admins/auths/find-username/send`, {
                clubId: clubId,
                email: currentEmail,
            });

            if (res.data.success) {
                setAuthEmail(currentEmail);
                console.log('auth', authEmail);
            }
        } catch {}
    };

    //인증번호 검증 api
    const postFindVerifyCode = async () => {
        try {
            const res = await customAxios.post(`/v1/admins/auths/find-username/verify`, {
                clubId: clubId,
                email: email,
                authCode: emailCode,
            });
            console.log(res);
            if (res.data.success) {
                console.log(res.data);
                setIsVerifyCode(true);
                setIsVerifyEmail(true);
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
            setIsVerifyEmail(true);
            postFindCode(email);
            setEmailMessage('인증번호를 전송했습니다.');
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
        if (clubName && authCode) {
            navigate(`/login/adminResetPassword`, {
                state: {
                    clubName: clubName,
                    authCode: authCode,
                },
            });
        }
    };

    return (
        <>
            <div className={styles.password_total_div}>
                <p className={styles.total_title}>아이디 찾기</p>
                <div className={styles.content_div}>
                    <div className={styles.content_title_div}>
                        <p className={styles.content_title}>동아리명</p>
                    </div>

                    <div className={styles.content_search_div}>
                        <SignUpSearchClub
                            clubName={clubName}
                            setClubName={setClubName}
                            clubType={clubType}
                            setClubType={setClubType}
                            clubId={clubId}
                            setClubId={setClubId}
                            type={'find'}
                        />
                    </div>

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
                            className={
                                emailCode ? styles.id_duplicate_check_button : styles.id_duplicate_check_button_before
                            }
                        >
                            인증번호 확인
                        </button>
                    </div>
                    <p className={isVerifyCode ? styles.message_confirm : styles.message_code}>{emailCodeMessage}</p>
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
