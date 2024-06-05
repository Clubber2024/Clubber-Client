import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TagScroll from '../components/TagScroll';
import './header.css';
import axios from 'axios';

export default function Header() {
    // 모든 페이지에서 공통적으로 나타날 헤더
    const location = useLocation();
    const navigate = useNavigate();

    const [menubarActive, setMenuBarActive] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [userEmail, setUserEmail] = useState('');

    //로그인박스 표시 상태 관리
    const [showLoginBox, setShowLoginBox] = useState(false);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith('/menu/central_club')) {
            setMenuBarActive('tab_text_central_active');
        } else if (path.startsWith('/menu/small_club')) {
            setMenuBarActive('tab_text_small_active');
        } else if (path.endsWith('/detail_page', 28)) {
            setMenuBarActive('');
        } else {
            setMenuBarActive('');
        }
    }, [location]);

    useEffect(() => {
        if (accessToken) {
            axios
                .get(`http://13.125.141.171:8080/v1/users/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((res) => {
                    console.log(res.data.data.email);
                    setUserEmail(res.data.data.email);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [accessToken]);

    const handleUserContainerClick = () => {
        if (!accessToken) {
            navigate('/menu/login');
        } else {
            setShowLoginBox(!showLoginBox);
        }
    };
    const handleTabClick = (menu) => {
        return setMenuBarActive(menu);
    };

    const handleLogout = async () => {
        try {
            const res = await axios.post(
                'http://13.125.141.171:8080/v1/auths/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(res);
            setShowLoginBox(false);
            localStorage.removeItem('accessToken'); // 로컬 스토리지에서 액세스 토큰 삭제
            // 로그아웃 이후 메인페이지 ? 로그인 페이지 ?
            navigate('/');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
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
                <div className="user_container" onClick={handleUserContainerClick}>
                    <img src="/buttons/user_login_icon.png" alt="user icon" width={39} height={39} />
                    <p className="login_text">{accessToken ? '내정보' : '로그인'}</p>

                    {accessToken && showLoginBox && (
                        <div className="rectangle">
                            <div>
                                <img className="img" src="/buttons/user_login_icon.png" alt="user icon" />

                                <p className="emailText">{userEmail}</p>
                                <button className="logoutBtn" onClick={handleLogout}>
                                    로그아웃
                                </button>
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
