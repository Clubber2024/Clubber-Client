import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
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
                        {/* <div className={styles.circle_insta}>
                            <a href="http://pf.kakao.com/_QiHDG">
                                <img src={'/footer/email.png'} alt="mail" className={styles.footer_insta} />
                            </a>
                        </div> */}
                        <div className={styles.circle_insta}>
                            <a href="https://www.instagram.com/clubber_ssu/">
                                <img src={'/footer/insta.png'} alt="insta" className={styles.footer_insta} />
                            </a>
                        </div>

                        <div className={styles.circle_talk}>
                            <a href="http://pf.kakao.com/_QiHDG">
                                <img src={'/footer/talk.png'} alt="talk" className={styles.footer_insta} />
                            </a>
                        </div>
                    </div>

                    <br />
                    <div className={styles.font_container}>
                        <div>
                            <p className={styles.font_copyright}>email: ssuclubber@gmail.com</p>
                        </div>
                        <div className={styles.font_set}>
                            <a href="https://polymorphismj.notion.site/clubber-19cfbba2687280089490c05f188083f8?pvs=4">
                                <p className={styles.font}>이용약관</p>
                                <p className={styles.vertical_line}>ㅣ</p>
                            </a>
                            <a href="https://polymorphismj.notion.site/clubber-198fbba26872804ba430c3801b4e7b54?pvs=4">
                                <p className={styles.font}>개인정보처리방침</p>
                                <p className={styles.vertical_line}>ㅣ</p>
                            </a>
                            <p className={styles.font} onClick={onClickDelete}>
                                회원탈퇴
                            </p>
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
