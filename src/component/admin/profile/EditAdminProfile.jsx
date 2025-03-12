import React, { useEffect, useState } from 'react';
import { customAxios } from '../../../config/axios-config';
import styles from './editAdminProfile.module.css';
import { useNavigate } from 'react-router-dom';

export default function EditAdminProfile() {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    //데이터 상태값 관리
    const [profile, setProfile] = useState([]);
    const [contact, setContact] = useState([]);
    //비밀번호 변경값 관리
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    //이메일 상태 관리
    const [email, setEmail] = useState('');
    const [localPart, setLocalPart] = useState('');
    const [domainPart, setDomainPart] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [customDomain, setCustomDomain] = useState('');

    //도메인 상태관리
    const domainOptions = [
        'naver.com',
        'gmail.com',
        'hanmail.com',
        'daum.net',
        'yahoo.com',
        'outlook.com',
        'nate.com',
        'kakao.com',
        '직접 입력',
    ];

    const getAdminProfile = async () => {
        try {
            const res = await customAxios.get(`/v1/admins/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data.data);
            setProfile(res.data.data);
            setEmail(res.data.data.email);
            splitEmail(res.data.data.email);
            setContact(res.data.data.contact);
            // setInsta(res.data.data.contact);
        } catch {}
    };

    const patchAdminPassword = async () => {
        try {
            const res = await customAxios.patch(`/v1/admins/me/password`, {
                oldPassword: '',
                newPassword: '',
            });
            if (res.data.success) {
                navigate('/admin');
            }
        } catch {}
    };

    useEffect(() => {
        getAdminProfile();
    }, []);

    const splitEmail = (email) => {
        const parts = email.split('@');
        if (parts.length === 2) {
            setLocalPart(parts[0]);
            setDomainPart(parts[1]);
        } else {
            setLocalPart(email);
            setDomainPart('');
        }
    };

    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
    };

    const handleChangeDomain = (event) => {
        const value = event.target.value;
        if (value === '직접 입력') {
            setIsCustom(true);
            setCustomDomain('');
        } else {
            setIsCustom(false);
            setDomainPart(value);
        }
    };

    const handleCustomDomainChange = (event) => {
        setCustomDomain(event.target.value);
    };

    const handleBlur = () => {
        if (customDomain.trim() === '') {
            setIsCustom(false);
            setDomainPart(''); // 다시 선택하도록 초기화
        } else {
            setDomainPart(customDomain);
            setIsCustom(false);
        }
    };

    //버튼 상태 함수
    const onClickCancelButton = () => {
        navigate('/admin');
    };

    return (
        <>
            <div className={styles.title_div}>
                <p className={styles.title_p}>회원정보 수정</p>
            </div>
            <div className={styles.content_div}>
                <div>
                    <p className={styles.content_title}>아이디</p>
                    <input
                        id="id"
                        name="id"
                        value={profile.username}
                        className={styles.content_input}
                        placeholder="아이디 입력"
                    />
                    <p className={styles.content_title}>현재 비밀번호</p>
                    <input className={styles.content_input} placeholder="현재 비밀번호 입력" />
                    <p className={styles.content_title}>새 비밀번호</p>
                    <input className={styles.content_input} placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
                    <p className={styles.content_title}>새 비밀번호 확인</p>
                    <input className={styles.content_input} placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
                    <p className={styles.content_title}>이메일 주소</p>
                    <div className={styles.input_email_div}>
                        <input
                            id="email"
                            name="email"
                            value={localPart}
                            onChange={onChangeEmail}
                            className={styles.content_input_email}
                            placeholder="이메일 입력"
                        />
                        <p className={styles.content_input_email_at}> @</p>
                        {isCustom ? (
                            <input
                                type="text"
                                id="domain"
                                name="domain"
                                value={customDomain}
                                onChange={handleCustomDomainChange}
                                onBlur={handleBlur}
                                autoFocus
                                placeholder="도메인 입력"
                                className={styles.content_input_email}
                            />
                        ) : (
                            <select
                                value={domainPart || ''}
                                onChange={handleChangeDomain}
                                className={styles.content_input_email}
                            >
                                <option value="" disabled>
                                    도메인 선택
                                </option>
                                {domainOptions.map((domain, index) => (
                                    <option key={index} value={domain}>
                                        {domain}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <br />

                    <p className={styles.content_title}>연락수단</p>
                    <br />
                    <p className={styles.contact_title}>1. 인스타그램</p>
                    <input
                        id="insta"
                        name="insta"
                        value={contact.instagram}
                        className={styles.content_input}
                        placeholder="인스타그램 아이디 입력"
                    />
                    <p className={styles.contact_title}>2. 기타</p>
                    <input
                        id="contact"
                        name="contact"
                        value={contact.etc}
                        className={styles.content_input}
                        placeholder="기타 연락수단 입력"
                    />
                    <div className={styles.edit_profile_button_div}>
                        <button className={styles.edit_profile_save_button}>저장</button>
                        <button className={styles.edit_profile_cancel_button} onClick={onClickCancelButton}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
