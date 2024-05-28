import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TagScroll from '../components/TagScroll';
import './header.css';
import { LinkItem } from '../menu/central_club/central_club';

export default function Header() {
    // 모든 페이지에서 공통적으로 나타날 헤더
    const location = useLocation();
    const [menubarActive, setMenuBarActive] = useState('');
    //로그인 상태 관리
    const [isLogin, setIsLogin] = useState(true);
    //로그인박스 표시 상태 관리
    const [showLoginBox, setShowLoginBox] = useState(false);

    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith('/menu/central_club')) {
            setMenuBarActive('tab_text_central_active');
        } else if (path.startsWith('/menu/small_club')) {
            setMenuBarActive('tab_text_small_active');
        } else {
            setMenuBarActive('');
        }
    }, [location]);

    const handleTabClick = (menu) => {
        return setMenuBarActive(menu);
    };

    //로그인박스 구현 부분
    /* const handleLogin = () => {
        setIsLogin(true);
    };
    const handleLogout = () => {
        setIsLogin(false);
        setShowLoginBox(false);
    };
        */
    const handleClick = () => {
        if (isLogin) {
            setShowLoginBox((prev) => !prev);
        } //else{로그아웃 상태일 때}
    };

    return (
        <>
            <div className="header_top">
                <Link to="/">
                    <img src="/clubber_logo.png" alt="clubber logo" className="mainLogo" />
                </Link>
                <div className="search_box">
                    <img className="search_icon" src="/main/search.png" alt="search_icon" />
                    <input
                        className="input_header"
                        type="search"
                        placeholder="찾고 싶은 동아리를 검색해보세요!"
                    // value={value}
                    // onChange={onChange}
                    />
                </div>
                <div className="user_container">
                    <LinkItem to="/menu/login">
                        <img
                            src="/buttons/user_login_icon.png"
                            alt="user icon"
                            width={35}
                            height={35}
                            onClick={handleClick}
                        />
                    </LinkItem>
                    <LinkItem to="/menu/login">
                        <p className="login_text">로그인</p>
                    </LinkItem>
                    {isLogin && showLoginBox && (
                        <div className="rectangle">
                            <div>
                                <img className="img" src="/buttons/user_login_icon.png" alt="user icon" />

                                <p className="emailText">clubber@naver.com</p>
                                <button className="logoutBtn">로그아웃</button>
                            </div>
                            <div className="line">
                                <img className="icon_star" src="/main/starYellow.png" alt="star" />
                                <p className="bookmarkBtn">나의 즐겨찾기</p>
                            </div>
                            <div className="verticalLine"></div>
                            <img className="icon_message" src="/main/message-text.png" alt="message" />
                            <p className="reviewBtn">내가 쓴 리뷰</p>
                        </div>
                    )}
                </div>
            </div>
            <TagScroll />
            <div className="menu_container">
                <p
                    className={
                        menubarActive === 'tab_text_highlight_active'
                            ? 'tab_text_highlight_active'
                            : 'tab_text_highlight'
                    }
                >
                    한눈에 보기
                </p>
                <div className="vertical_line"></div>
                <Link to="/menu/central_club/central_club" style={{ textDecoration: 'none' }}>
                    <p
                        className={
                            menubarActive === 'tab_text_central_active' ? 'tab_text_central_active' : 'tab_text_central'
                        }
                        onClick={() => handleTabClick('tab_text_central_active')}
                    >
                        중앙 동아리
                    </p>
                </Link>
                <div className="toggle_container">
                    <button className="small_club_container">
                        <Link to="/menu/small_club/small_club" style={{ textDecoration: 'none' }}>
                            <p
                                className={
                                    menubarActive === 'tab_text_small_active'
                                        ? 'tab_text_small_active'
                                        : 'tab_text_small'
                                }
                                onClick={() => handleTabClick('tab_text_small_active')}
                            >
                                단과대
                            </p>
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
}
