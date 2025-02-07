import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { LinkItem } from '../branch/BranchCentral';
import { customAxios } from '../../config/axios-config';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../modal/ConfirmModal';

function Footer() {
    const accessToken = localStorage.getItem('accessToken');
    const Admin = localStorage.getItem('isAdmin');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const userDelete = async () => {
        try {
            const res = await customAxios.delete(`/v1/auths/withdraw`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // 토큰 포함
                },
            });
            window.localStorage.clear();
            setIsSuccessModalOpen(true);
            // window.alert('회원탈퇴 되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('error:', error);
        }
    };

    const AdminDelete = async () => {
        try {
            const res = await customAxios.delete(`/v1/admins/withdraw`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // 토큰 포함
                },
            });
            window.localStorage.clear();
            setIsSuccessModalOpen(true);
            // window.alert('회원탈퇴 되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('error:', error);
        }
    };

    const onClickDelete = () => {
        if (accessToken) {
            setIsModalOpen(true);
        }
    };

    const onClickUserDelete = () => {
        if (Admin) {
            AdminDelete();
            setIsModalOpen(false);
            navigate(`/`);
        } else {
            userDelete();
            setIsModalOpen(false);
            navigate(`/`);
        }
    };

    return (
        <>
            <div className={styles.footer}>
                <div className={styles.footer_content}>
                    <div className={styles.circle_div}>
                        <div className={styles.circle_insta}>
                            <a href="http://pf.kakao.com/_QiHDG">
                                <img src={'/footer/email.png'} alt="mail" className={styles.footer_insta} />
                            </a>
                        </div>
                        <div className={styles.circle_insta}>
                            <a href="https://www.instagram.com/clubber_ssu/">
                                <img src={'/footer/insta.png'} alt="insta" className={styles.footer_insta} />
                            </a>
                        </div>

                        <div className={styles.circle_insta}>
                            <a href="http://pf.kakao.com/_QiHDG">
                                <img src={'/footer/talk.png'} alt="talk" className={styles.footer_insta} />
                            </a>
                        </div>
                    </div>

                    <br />
                    <div className={styles.font_container}>
                        <p className={styles.font_copyright}>Copyrightⓒ2024-2024 Clubber Inc. All rights reserved.</p>
                        <div className={styles.font_set}>
                            <p className={styles.font}>이용약관ㅣ</p>
                            <p className={styles.font}>개인정보처리방침ㅣ</p>
                            <p className={styles.font}>운영정책ㅣ</p>
                            <p className={styles.font} onClick={onClickDelete}>
                                회원탈퇴ㅣ
                            </p>

                            <LinkItem to={'/qna'}>
                                <p className={styles.font}>FAQ</p>
                            </LinkItem>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ConfirmModal
                    isOpen={isModalOpen}
                    message={'정말 회원을 탈퇴하시겠습니까?'}
                    onClickOk={() => onClickUserDelete()}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            {isSuccessModalOpen && (
                <ConfirmModal
                    isOpen={isSuccessModalOpen}
                    message={'회원탈퇴 되었습니다.'}
                    onClickOk={() => setIsSuccessModalOpen(false)}
                />
            )}
        </>
    );
}

export default Footer;
