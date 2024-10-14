import React from 'react';
import styles from './branchCentral.module.css';
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
        navigate(`/central/divisions`, { state: { division: divisionValue } });
    };
    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <h2 className={styles.header_title}>중앙 동아리</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/culture.png" alt="culture" className={styles.rectangle_img_culture} />
                        <div className={styles.title} onClick={() => onClicked('EDUCATION')}>
                            교양분과
                        </div>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/business.png" alt="business" className={styles.rectangle_img_business} />
                        <h3 className={styles.title} onClick={() => onClicked('BUSINESS')}>
                            연대사업분과
                        </h3>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/megaphone.png" alt="megaphone" className={styles.rectangle_img_megaphone} />
                        <h3 className={styles.title} onClick={() => onClicked('ART')}>
                            연행예술분과
                        </h3>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/religion.png" alt="religion" className={styles.rectangle_img_religion} />
                        <h3 className={styles.title} onClick={() => onClicked('RELIGION')}>
                            종교분과
                        </h3>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/art.png" alt="art" className={styles.rectangle_img_art} />
                        <h3 className={styles.title} onClick={() => onClicked('CREATIVE_EXHIBITION')}>
                            창작전시분과
                        </h3>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/athletic.png" alt="athletic" className={styles.rectangle_img_athletic} />
                        <h3 className={styles.title} onClick={() => onClicked('SPORTS')}>
                            체육분과
                        </h3>
                    </div>
                </div>
                <div className={styles.rectangle}>
                    <div className={styles.wrap}>
                        <img src="/central/academic.png" alt="academic" className={styles.rectangle_img_academic} />
                        <h3 className={styles.title} onClick={() => onClicked('ACADEMIC')}>
                            학술분과
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CentralClub;
