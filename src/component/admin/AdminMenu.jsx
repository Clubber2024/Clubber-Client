import './adminMenu.css';
import { NavLink } from 'react-router-dom';

export default function AdminMenu() {
    return (
        <div className="admin_container">
            <div className="admin_header">
                <h3>마이페이지</h3>
            </div>
            <div className="admin_body">
                <NavLink to={`/admin/mypage`} className="menu_tab">
                    동아리 정보수정
                </NavLink>
                <div className="menu_tab">나의 모집글</div>
                <div className="divider" />
                <NavLink to={`/admin/mypage/reviews`} className="menu_tab">
                    리뷰 목록
                </NavLink>
                <NavLink to={`/admin/mypage/pending`} className="menu_tab">
                    리뷰 승인
                </NavLink>
                <div className="divider" />
                <div className='menu_tab'>비밀번호 변경</div>
            </div>
        </div>
    );
}
