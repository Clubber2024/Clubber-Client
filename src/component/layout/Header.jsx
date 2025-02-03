import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TagScroll from '../hashtag/TagScroll';
import ErrorModal from '../modal/ErrorModal';
import './header.css';
import { customAxios } from '../../config/axios-config';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const [menubarActive, setMenuBarActive] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [setUserEmail] = useState('');

    // 에러 모달창
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
        navigate(`/login`);
    };

    // 관리자 여부 관리
    const isAdmin = localStorage.getItem('isAdmin');

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

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

    const fetchUserData = async () => {
        try {
            const res = await customAxios.get(`/v1/users/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setUserEmail(res.data.data.email);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                getNewToken(false);
            } else {
                console.error('Error fetching user data : ', error);
            }
        }
    };

    useEffect(() => {
        if (accessToken && !isAdmin) {
            fetchUserData();
        }
    }, [accessToken, isAdmin]);

    const getNewToken = async () => {
        try {
            if (isAdmin === "true" || isAdmin) {
                const res = await customAxios.post(
                    `/v1/admins/refresh`,
                    {},
                    {
                        token: refreshToken,
                    }
                );
                const newAccessToken = res.data.data.accessToken;
                const newRefreshToken = res.data.data.refreshToken;
                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                localStorage.setItem('isAdmin', isAdmin);
            } else {
                const res = await customAxios.post(
                    `/v1/auths/refresh`,
                    {},
                    {
                        token: refreshToken,
                    }
                );
                const newAccessToken = res.data.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                // 새 토큰으로 다시 요청
                fetchUserData();
            }
        } catch (error) {
            console.error('토큰 재발급 실패 : ', error);

            setModalMessage(error.response.data.reason);
            setIsModalOpen(true);

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('isAdmin');
            navigate('/login');
        }
    };

    // api 요청 추가 ?
    const onClickMy = () => {
        if (!accessToken) {
            navigate('/login');
        } else {
            if (isAdmin) {
                navigate('/admin');
            } else {
                navigate('/user');
            }
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
