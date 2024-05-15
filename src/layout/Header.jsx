import { Link } from 'react-router-dom';
import TagScroll from '../components/TagScroll';
import './header.css';

export default function Header() {
    // 모든 페이지에서 공통적으로 나타날 헤더
    return (
        <>
            <div className="header_top">
                <Link to="/">
                    <img src="/clubber_logo.png" alt="clubber logo" style={{ width: 210, height: 69 }} />
                </Link>
                <div className="search_box">
                    <img className="search_icon" src="/main/search.png" alt="search_icon" />
                    <input
                        type="search"
                        placeholder="찾고 싶은 동아리를 검색해보세요!"
                    // value={value}
                    // onChange={onChange}
                    />
                </div>
                <div className="user_container">
                    <img src="/buttons/user_login_icon.png" alt="user icon" width={39} height={39} />
                    <p className="login_text">로그인</p>
                </div>
            </div>
            <TagScroll />
            <div className="menu_container">
                <p className="tab_text_highlight">한눈에 보기</p>
                <div className="vertical_line"></div>
                <Link to="/menu/central_club" style={{ textDecoration: 'none' }}>
                    <p className="tab_text_central">중앙 동아리</p>
                </Link>
                <Link to="/menu/small_club" style={{ textDecoration: 'none' }}>
                    <p className="tab_text_small">단과대</p>
                </Link>
            </div>
        </>
    );
}
