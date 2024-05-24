import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TagScroll from '../components/TagScroll';
import './header.css';
import { LinkItem } from '../menu/central_club/central_club';

export default function Header() {
    // 모든 페이지에서 공통적으로 나타날 헤더
    const [menubarActive, setMenuBarActive] = useState('');
    const location = useLocation();

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
                    <img src="/buttons/user_login_icon.png" alt="user icon" width={39} height={39} />
                    <LinkItem to="/menu/login">
                        <p className="login_text">로그인</p>
                    </LinkItem>
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
