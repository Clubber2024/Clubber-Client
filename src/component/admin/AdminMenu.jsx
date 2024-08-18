import "./adminMenu.css";
import { NavLink } from 'react-router-dom';

export default function AdminMenu() {
    return (
        <div className="admin_container">
            <div className="admin_header">
                <h3>마이페이지</h3>
            </div>
            <div className="admin_body">
                <div className="menu_tab">소개글 수정</div>
                <div className="menu_tab">모집글 작성</div>
                <div className="divider"/>
                <NavLink to={`/admin/mypage/reviews`} className="menu_tab">리뷰 목록</NavLink>
                <NavLink to={`/admin/mypage/pending`} className="menu_tab">리뷰 승인</NavLink>
            </div>
        </div>
    )
}