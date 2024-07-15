import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TagScroll from '../hashtag/TagScroll';
import axios from 'axios';
import BookMarkPage from '../../pages/BookMarkPage';
import { LinkItem } from '../branch/BranchCentral';
import './header.css';
import { customAxios } from '../../config/axios-config';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menubarActive, setMenuBarActive] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // 로그인박스 표시 상태 관리
  const [showLoginBox, setShowLoginBox] = useState(false);
  // 관리자 여부 관리
  const isAdmin = localStorage.getItem('isAdmin');

  const adminId = localStorage.getItem('adminId');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  console.log(accessToken);
  console.log(refreshToken);
  console.log(adminId);

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

  useEffect(() => {
    console.log(isAdmin);
    if (accessToken && !isAdmin) {
      fetchUserData();
    }
  }, [accessToken, isAdmin]);

  const fetchUserData = async () => {
    try {
      const res = await customAxios.get(`/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data.data.email);
      setUserEmail(res.data.data.email);
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 401) {
        console.log('token was expired');
        getNewToken();
      } else {
        console.error('Error fetching user data : ', error);
      }
    }
  };

  const getNewToken = async () => {
    try {
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
    } catch (error) {
      console.error('토큰 재발급 실패 : ', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    }
  };

  const handleUserContainerClick = () => {
    if (!accessToken) {
      navigate('/login');
    } else {
      setShowLoginBox(!showLoginBox);
    }
  };
  const handleTabClick = (menu) => {
    return setMenuBarActive(menu);
  };

  const handleLogout = async () => {
    try {
      console.log(isAdmin);
      if (isAdmin) {
        const res = await customAxios.post(
          '/v1/admins/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(res);
        localStorage.removeItem('accessToken'); // 로컬 스토리지에서 액세스 토큰 삭제
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('adminId');
        localStorage.removeItem('isAdmin');
      } else {
        const res = await customAxios.post(
          '/v1/auths/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(res);
        localStorage.removeItem('accessToken'); // 로컬 스토리지에서 액세스 토큰 삭제
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('adminId');
        localStorage.removeItem('isAdmin');
      }
      setShowLoginBox(false);
      // 로그아웃 이후 메인페이지 ? 로그인 페이지 ?
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        getNewToken();
      } else {
        console.error('로그아웃 실패:', error);
      }
    }
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
                <Link to="/bookmark" style={{ textDecoration: 'none' }}>
                  <img className="icon_star" src="/main/starYellow.png" alt="star" />
                  <p className="bookmarkBtn">나의 즐겨찾기</p>
                </Link>
              </div>
              <div className="verticalLine"></div>
              <Link to="/user/reviews">
                <img className="icon_message" src="/main/message-text.png" alt="message" />
                <p className="reviewBtn">내가 쓴 리뷰</p>
              </Link>
            </div>
          )}
          {accessToken && showLoginBox && isAdmin && (
            <div className="rectangle">
              <div>
                <img className="img" src="/buttons/user_login_icon.png" alt="user icon" />
                <p className="emailText">{adminId}</p>
                <button className="logoutBtn" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>

              <div className="line" />
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <div className="mypage-container">
                  <img
                    className="icon_mypage"
                    src="/admin/mypage.png"
                    alt="admin page"
                  />
                  <p className="mypageBtn">마이페이지</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <TagScroll />
      <div className="menu_container">
        <Link to="/summary" style={{ textDecoration: "none" }}>
          <p
            className={
              menubarActive === "tab_text_highlight_active"
                ? "tab_text_highlight_active"
                : "tab_text_highlight"
            }
            onClick={() => {
              handleTabClick("tab_text_higlight_active");
            }}
          >
            한눈에 보기
          </p>
        </Link>
        <div className="vertical_line"></div>
        <Link to="/central" style={{ textDecoration: "none" }}>
          <p
            className={
              menubarActive === "tab_text_central_active"
                ? "tab_text_central_active"
                : "tab_text_central"
            }
            onClick={() => handleTabClick("tab_text_central_active")}
          >
            중앙 동아리
          </p>
        </Link>
        <div className="small_club_container">
          <Link to="/small" style={{ textDecoration: "none" }}>
            <p
              className={
                menubarActive === "tab_text_small_active"
                  ? "tab_text_small_active"
                  : "tab_text_small"
              }
              onClick={() => handleTabClick("tab_text_small_active")}
            >
              단과대
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
