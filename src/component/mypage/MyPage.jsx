import { useState } from 'react';
import { customAxios } from '../../config/axios-config';
import './myPage.css';
import ErrorModal from '../modal/ErrorModal';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearTokens, getIsAdmin, getAccessToken } from '../../auth/AuthService';

export default function MyPage() {
    const navigate = useNavigate();

    const isAdmin = getIsAdmin();
    const accessToken = getAccessToken();
    console.log(isAdmin);

    // 에러 모달창
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
        navigate(`/login`);
    };

    // 비밀번호 변경
    const handleModifyPW = async () => {
        navigate('/admin/password', { state: { accessToken } });
    };

    // 로그아웃 함수
    const handleLogout = async () => {
        try {
            const url = isAdmin ? '/v1/admins/logout' : '/v1/auths/logout';
            await customAxios.post(url);
            clearTokens();

            // 로그아웃 후 메인 페이지로 이동
            navigate('/');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    return (
        <div className="my_container">
            <div className="my_header">
                <h3>마이페이지</h3>
            </div>
            <div className="my_body">
                {isAdmin ? (
                    <>
                        <NavLink to={`/admin/mypage`} className="menu_tab">
                            동아리 정보수정
                        </NavLink>
                        <NavLink to={`/admin/recruit`} className="menu_tab">
                            나의 모집글
                        </NavLink>
                        <div className="my_divider" />
                        <NavLink to={`/admin/mypage/reviews`} className="menu_tab">
                            리뷰 목록
                        </NavLink>
                        <NavLink to={`/admin/mypage/pending`} className="menu_tab">
                            리뷰 승인
                        </NavLink>
                        <div className="my_divider" />
                        <div className="menu_tab" onClick={handleModifyPW}>
                            비밀번호 변경
                        </div>
                        <div className="menu_tab" onClick={handleLogout}>
                            로그아웃
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink to={`/user/bookmark`} className="menu_tab">
                            나의 즐겨찾기
                        </NavLink>
                        {/* <NavLink to={`/user/reviews`} className="menu_tab">
                            내가 쓴 리뷰
                        </NavLink> */}
                        <div className="my_divider" />
                        <div className="menu_tab" onClick={handleLogout}>
                            로그아웃
                        </div>
                    </>
                )}
            </div>
            <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
        </div>
    );
}
