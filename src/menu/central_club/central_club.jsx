import React from 'react';
import styles from './central_club.module.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const LinkItem = styled(Link)`
    color: black;
    text-decoration: none;
    cursor: pointer;
`;

function CentralClub() {
    const navigate = useNavigate();

    const onClicked = (divisionValue) => {
        navigate('/menu/central_club/branch/branchCentral', { state: { division: divisionValue } });
    };
    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <h2 className={styles.header_title}>중앙 동아리</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/culture.png" alt="culture" className={styles.rectangle_img} />
                        <div className={styles.title} onClick={() => onClicked('교양분과')}>
                            교양분과
                        </div>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/business.png" alt="business" className={styles.rectangle_img} />
                        <h3 className={styles.title} onClick={() => onClicked('연대사업분과')}>
                            연대사업분과
                        </h3>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/megaphone.png" alt="megaphone" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title} onClick={() => onClicked('연행예술분과')}>
                                연행예술분과
                            </h3>
                        </LinkItem>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/athletic.png" alt="athletic" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title} onClick={() => onClicked('종교분과')}>
                                종교분과
                            </h3>
                        </LinkItem>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/art.png" alt="art" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title} onClick={() => onClicked('창작전시분과')}>
                                창작전시분과
                            </h3>
                        </LinkItem>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/athletic.png" alt="athletic" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title} onClick={() => onClicked('체육분과')}>
                                체육분과
                            </h3>
                        </LinkItem>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/academic.png" alt="academic" className={styles.rectangle_img} />
                        <LinkItem to="/menu/central_club/branch">
                            <h3 className={styles.title} onClick={() => onClicked('학술분과')}>
                                학술분과
                            </h3>
                        </LinkItem>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CentralClub;
