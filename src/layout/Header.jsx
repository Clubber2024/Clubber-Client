import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TagScroll from '../components/TagScroll';
import './header.css';

export default function Header() {
    // 모든 페이지에서 공통적으로 나타날 헤더
    const location = useLocation();
    const navigate = useNavigate();
    const [menubarActive, setMenuBarActive] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    //로그인 상태 관리
    const [isLogin, setIsLogin] = useState(true);
    //로그인박스 표시 상태 관리
    const [showLoginBox, setShowLoginBox] = useState(false);

    const login = localStorage.getItem('accessToken');

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

    /*
		//로그인 관련
    useEffect(() => {
        if (login != null) {
            setIsLogin(true);
            setShowLoginBox();
        }
    });
		*/

    const handleTabClick = (menu) => {
        return setMenuBarActive(menu);
    };
    //동아리 검색 기능 관련
    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchTerm(query);
    };

    const handleSearch = () => {
        navigate(`/menu/search?clubName=${searchTerm}`, { state: { clubName: searchTerm } });
    };

    const enterKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const onClickMain = () => {
        setSearchTerm('');
    };

    /*

    //로그인박스 구현 부분
    const handleLogin = () => {
        setIsLogin(true);
    };
    const handleLogout = () => {
        setIsLogin(false);
        setShowLoginBox(false);
    };
		*/

    return (
        <>
            <div className="header_top">
                <Link to="/">
                    <img src="/clubber_logo.png" alt="clubber logo" className="mainLogo" onClick={onClickMain} />
                </Link>
                <div className="search_box">
                    <img className="search_icon" src="/main/search.png" alt="search_icon" />
                    <input
                        className="input_header"
                        type="search"
                        placeholder="찾고 싶은 동아리를 검색해보세요!"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={enterKeyDown}
                    />
                </div>

                <div
                    className="user_container" //{login === null ? <Login /> : ''}>
                >
                    <img src="/buttons/user_login_icon.png" alt="user icon" width={39} height={39} />
                    <p className="login_text">로그인</p>
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
                <div className="small_club_container">
                    <Link to="/menu/small_club/small_club" style={{ textDecoration: 'none' }}>
                        <p
                            className={
                                menubarActive === 'tab_text_small_active' ? 'tab_text_small_active' : 'tab_text_small'
                            }
                            onClick={() => handleTabClick('tab_text_small_active')}
                        >
                            단과대
                        </p>
                    </Link>
                </div>
            </div>
        </>
    );
}
