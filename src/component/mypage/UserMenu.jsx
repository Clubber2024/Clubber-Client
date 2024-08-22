import { customAxios } from '../../config/axios-config';
import '../admin/adminMenu.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function UserMenu() {
    const navigate = useNavigate();

    const isAdmin = localStorage.getItem('isAdmin');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // 새 토큰을 발급받는 함수
    const getNewToken = async (retryLogout = false) => {
        try {
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

            // 만약 토큰 갱신 후 로그아웃을 재시도해야 한다면
            if (retryLogout) {
                handleLogout();
            }
        } catch (error) {
            console.error('토큰 재발급 실패 : ', error);
            // 토큰 재발급이 실패하면 강제 로그아웃 처리
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('adminId');
            localStorage.removeItem('isAdmin');
            navigate('/login');
        }
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
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('adminId');
            localStorage.removeItem('isAdmin');

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
        <div className="admin_container">
            <div className="admin_header">
                <h3>마이페이지</h3>
            </div>
            <div className="admin_body">
                <NavLink to={`/user/bookmark`} className="menu_tab">
                    나의 즐겨찾기
                </NavLink>
                <NavLink to={`/user/reviews`} className="menu_tab">
                    내가 쓴 리뷰
                </NavLink>
                <div className="divider" />
                <div className='menu_tab' onClick={handleLogout}>로그아웃</div>
            </div>
        </div>
    );
}