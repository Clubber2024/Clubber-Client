import { useState } from 'react';
import { customAxios } from '../../config/axios-config';
import './myPage.css';
import ErrorModal from '../modal/ErrorModal';
import { NavLink, useNavigate } from 'react-router-dom';

export default function MyPage() {
    const navigate = useNavigate();

    const isAdmin = localStorage.getItem('isAdmin');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // 에러 모달창
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
        navigate(`/login`);
    };

    // 새 토큰을 발급받는 함수
    const getNewToken = async (retryLogout = false) => {
        try {
            if (isAdmin === "true || isAdmin") {
                const res = await customAxios.post(
                    `/v1/admins/refresh`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );
                const newAccessToken = res.data.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
            } else {
                const res = await customAxios.post(
                    `/v1/auths/refresh`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );
                const newAccessToken = res.data.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
            }
            // 만약 토큰 갱신 후 로그아웃을 재시도해야 한다면
            if (retryLogout) {
                handleLogout();
            }

            return accessToken;
        } catch (error) {
            console.error('토큰 재발급 실패 : ', error);

            setModalMessage(error.response.data.reason);
            setIsModalOpen(true);

            // 토큰 재발급이 실패하면 강제 로그아웃 처리
            handleLogout();
            navigate('/login');
        }
    };

    // 비밀번호 변경
    const handleModifyPW = async () => {
        navigate('/admin/password', { state: { accessToken } });
    };

    // 로그아웃 함수
    const handleLogout = async () => {
        try {
            const url = isAdmin ? '/v1/admins/logout' : '/v1/auths/logout';
            const res = await customAxios.post(
                url,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(res);

            // 로컬 스토리지에서 사용자 정보 삭제
            // localStorage.removeItem('accessToken');
            // localStorage.removeItem('refreshToken');
            // localStorage.removeItem('isAdmin');
            localStorage.clear();

            // 로그아웃 후 메인 페이지로 이동
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // 토큰이 만료된 경우 새 토큰 발급 후 로그아웃 재시도
                await getNewToken(true);
            } else {
                console.error('로그아웃 실패:', error);
            }
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
                        <NavLink to={`/user/reviews`} className="menu_tab">
                            내가 쓴 리뷰
                        </NavLink>
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
