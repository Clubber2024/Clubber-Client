import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { LinkItem } from '../branch/BranchCentral';
import { customAxios } from '../../config/axios-config';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../modal/ConfirmModal';

function Footer() {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
    const Admin = localStorage.getItem('isAdmin');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const userDelete = async () => {
        try {
            const res = await customAxios.delete(`/v1/auths/withdraw`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // 토큰 포함
                },
            });
            window.localStorage.clear();
            window.alert('회원탈퇴 되었습니다.');
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
            window.alert('회원탈퇴 되었습니다.');
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
            <div className={styles.font_container}>
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
            <div className={styles.footer}>
                <div className={styles.footer_content}>
                    <div className={styles.circle_insta}>
                        <a href="https://www.instagram.com/clubber_ssu/">
                            <img src={'/footer/insta.png'} alt="insta" className={styles.footer_insta} />
                        </a>
                    </div>
                    <p className={styles.p}>상호 : (주)클로버 | 대표자명 : 클러버</p>
                    <br />
                </div>
            </div>

            {isModalOpen && (
                <ConfirmModal
                    isOpen={isModalOpen}
                    message={'정말 회원 탈퇴하시겠습니까??'}
                    onClickOk={() => onClickUserDelete()}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}

export default Footer;
