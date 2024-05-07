import React, { useState } from 'react';
import './menuBar.css';
import { Link } from 'react-router-dom';

export default function MenuBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleState = () => {
        setIsOpen(!isOpen);
    };

    // 토글 클릭후 페이지 변환되고, 토글 자동으로 닫힘
    const onClickToggle = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="menu_container">
                <p className="tab_text_highlight">한눈에 보기</p>
                <div className="vertical_line"></div>
                <Link to="/menu/central_club" style={{ textDecoration: 'none' }}>
                    <p className="tab_text_central">중앙 동아리</p>
                </Link>
                <div className="toggle_container">
                    <div className="small_club_container">
                        <p className="tab_text_small">단과대</p>
                        <img
                            className="dropdown_btn"
                            onClick={toggleState}
                            src="/buttons/dropdown_button.png"
                            alt="dropdown button"
                        />
                    </div>
                    <ul className={isOpen ? 'show-toggle' : 'hide-toggle'}>
                        <li>
                            <Link
                                to="/menu/small_club/small_club_IT"
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
                </div>
            </div>
        </>
    );
}
