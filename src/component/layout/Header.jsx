import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TagScroll from '../hashtag/TagScroll';
import ErrorModal from '../modal/ErrorModal';
import './header.css';
import { customAxios } from '../../config/axios-config';
import {getAccessToken, getIsAdmin } from '../../auth/AuthService';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const [menubarActive, setMenuBarActive] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    // const [setUserEmail] = useState('');

    const accessToken = getAccessToken();
    const isAdmin = getIsAdmin();

    // 에러 모달창
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
        navigate(`/login`);
    };

    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith('/central')) {
            setMenuBarActive('tab_text_central_active');
        } else if (path.startsWith('/small')) {
            setMenuBarActive('tab_text_small_active');
        } else if (path.startsWith('/summary')) {
            setMenuBarActive('tab_text_highlight_active');
        } else {
            setMenuBarActive('');
        }
    }, [location]);

    // useEffect(() => {
    //     if (accessToken && !isAdmin) {
    //         try {
    //             const res = customAxios.get(`/v1/users/me`);
    //             setUserEmail(res.data.data.email);
    //         } catch (error) {
    //             console.error('Error fetching user data : ', error);
    //         }
    //     }
    // }, [accessToken, isAdmin, setUserEmail]);


    const onClickMy = async () => {
        console.log("AccessToken:", accessToken);
        console.log("IsAdmin:", isAdmin, typeof isAdmin); // 타입까지 출력

        if (accessToken) {
            try {
                if (isAdmin) {  
                    await customAxios.get(`/v1/admins/mypage`);
                    navigate('/admin');
                    console.log("✅ 관리자 계정, '/admin'으로 이동");
                } else {
                    await customAxios.get(`/v1/users/me`);
                    navigate('/user');
                    console.log("🟡 일반 사용자 계정, '/user'으로 이동");
                }
            } catch (error) {
                console.error("❌ API 요청 중 오류 발생:", error);
            }
        } else {
            console.log("🔴 비로그인 상태, '/login'으로 이동");
            navigate('/login');
        }
    };

    const handleTabClick = (menu) => {
        return setMenuBarActive(menu);
    };

    //동아리 검색 기능 관련
    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchTerm(query);
    };

    const handleSearch = () => {
        navigate(`/search?clubName=${searchTerm}`, {
            state: { clubName: searchTerm },
        });
    };

    const enterKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.value.trim() === '') {
            event.preventDefault();
        } else if (event.key === 'Enter' && event.target.value.trim() !== '') {
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
                <div className="user_container" onClick={onClickMy}>
                    <img src="/buttons/user_login_icon.png" alt="user icon" width={39} height={39} />
                    <p className="login_text">{accessToken ? 'MY' : '로그인'}</p>
                </div>
            </div>
            <TagScroll />
            <div className="menu_container">
                <Link to="/summary" style={{ textDecoration: 'none' }}>
                    <p
                        className={
                            menubarActive === 'tab_text_highlight_active'
                                ? 'tab_text_highlight_active'
                                : 'tab_text_highlight'
                        }
                        onClick={() => {
                            handleTabClick('tab_text_higlight_active');
                        }}
                    >
                        한눈에 보기
                    </p>
                </Link>
                <div className="vertical_line"></div>
                <Link to="/central" style={{ textDecoration: 'none' }}>
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
                    <Link to="/small" style={{ textDecoration: 'none' }}>
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
            <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
        </>
    );
}
