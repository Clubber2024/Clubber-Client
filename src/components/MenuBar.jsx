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
