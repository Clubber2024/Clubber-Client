import React from 'react';
import styles from './central_club.module.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkItem = styled(Link)`
    color: black;
    text-decoration: none;
    cursor: pointer;
`;

function CentralClub() {
    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <h2 className={styles.header_title}>중앙 동아리</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/culture.png" alt="culture" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <div className={styles.title}>교양분과</div>
                        </LinkItem>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/business.png" alt="business" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title}> 연대사업분과</h3>
                        </LinkItem>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/megaphone.png" alt="megaphone" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title}>연행예술분과</h3>
                        </LinkItem>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/athletic.png" alt="athletic" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title}>종교분과</h3>
                        </LinkItem>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/art.png" alt="art" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title}>창작전시분과</h3>
                        </LinkItem>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/athletic.png" alt="athletic" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title}>체육분과</h3>
                        </LinkItem>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/academic.png" alt="academic" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title}>학술분과</h3>
                        </LinkItem>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CentralClub;
