import React, { useState } from 'react';
import './menuBar.css';
import { Link } from 'react-router-dom';

export default function MenuBar() {
    const [menubarActive, setMenuBarActive] = useState('');

    const handleTabClick = (menu) => {
        return setMenuBarActive(menu);
    };

    return (
        <>
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
                <Link to="/menu/central_club" style={{ textDecoration: 'none' }}>
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

// 단과대 메뉴바 토글 기능
/*
  const [isOpen, setIsOpen] = useState(false);
	// 토글 클릭후 페이지 변환되고, 토글 자동으로 닫힘
  const toggleState = () => {
        setIsOpen(!isOpen);
    };
	const onClickToggle = () => {
        setIsOpen(false);
    };

                        <img className="dropdown_btn" src="/buttons/dropdown_button.png" alt="dropdown button" />
                    </button>
                    <ul className={isOpen ? 'show-toggle' : 'hide-toggle'}>
                        <li>
                            <Link
                                to="/menu/small_club/small_club"
                                style={{ textDecoration: 'none' }}
                                onClick={onClickToggle}
                            >
                                IT대
                            </Link>
                        </li>
                        <li>공대</li>
                        <li>인문대</li>
                        <li>자연대</li>
                        <li>경영대</li>
                    </ul>
*/
