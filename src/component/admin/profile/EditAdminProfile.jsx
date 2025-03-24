import React, { useEffect, useState } from 'react';
import { customAxios } from '../../../config/axios-config';
import styles from './editAdminProfile.module.css';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../modal/ErrorModal';

export default function EditAdminProfile() {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    //데이터 상태값 관리
    const [profile, setProfile] = useState([]);
    const [contact, setContact] = useState([]);
    const [insta, setInsta] = useState('');
    const [etc, setEtc] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    //이메일 상태 관리
    const [email, setEmail] = useState('');

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
            setInsta(res.data.data.contact['instagram']);
            setEtc(res.data.data.contact['etc']);
            setContact(res.data.data.contact);
        } catch {}
    };

    //연락수단 update api
    const patchAdminContact = async () => {
        try {
            const res = await customAxios.patch(
                `/v1/admins/me/contact`,
                {
                    contact: {
                        instagram: insta,
                        etc: etc,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                setIsModalOpen(true);
                setModalMessage('회원 정보 수정이 완료되었습니다.');
            }
        } catch {}
    };

    useEffect(() => {
        getAdminProfile();
    }, []);

    const handleChangeEmail = () => {
        navigate('/admin/edit-email');
    };

    const onChangeInsta = (e) => {
        const currentInsta = e.target.value;
        setInsta(currentInsta);
    };

    const onChangeEtc = (e) => {
        const currentEtc = e.target.value;
        setEtc(currentEtc);
    };

    //버튼 상태 함수
    const onClickCancelButton = () => {
        navigate('/admin');
    };

    const onClickSaveContact = () => {
        patchAdminContact();
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
        navigate('/admin');
    };

    return (
        <>
            <div className={styles.title_div}>
                <p className={styles.title_p}>회원정보 수정</p>
            </div>
            <div className={styles.content_div}>
                <div className={styles.content_div_total}>
                    <p className={styles.content_title}>아이디</p>
                    <input
                        id="id"
                        name="id"
                        value={profile.username}
                        className={styles.content_input_id}
                        placeholder="아이디 입력"
                    />

                    <div className={styles.content_id_div}>
                        <p className={styles.content_title}>이메일 주소</p>
                    </div>
                    <div className={styles.input_email_div}>
                        <input
                            id="email"
                            name="email"
                            value={email}
                            className={styles.content_input_email}
                            placeholder="이메일 입력"
                            autoComplete="off"
                        />
                        <button
                            onClick={handleChangeEmail}
                            className={
                                email ? styles.content_input_email_button : styles.content_input_email_button_before
                            }
                        >
                            설정
                        </button>
                    </div>

                    <br />

                    <p className={styles.content_title}>연락수단</p>
                    <br />
                    <p className={styles.contact_title}>1. 인스타그램</p>
                    <input
                        id="insta"
                        name="insta"
                        value={insta}
                        onChange={onChangeInsta}
                        className={styles.content_input}
                        placeholder="인스타그램 아이디 입력"
                    />
                    <p className={styles.contact_title}>2. 기타</p>
                    <input
                        id="contact"
                        name="contact"
                        value={etc}
                        onChange={onChangeEtc}
                        className={styles.content_input}
                        placeholder="기타 연락수단 입력"
                    />
                    <div className={styles.edit_profile_button_div}>
                        <button className={styles.edit_profile_save_button} onClick={onClickSaveContact}>
                            저장
                        </button>
                        <button className={styles.edit_profile_cancel_button} onClick={onClickCancelButton}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={onCloseModal} />}
        </>
    );
}
