import React from 'react';
import styles from './bookmark.module.css';
import Header from '../../../layout/Header';
import Footer from '../../../layout/Footer';
import StarButton from './starButton';
import ClubImage from '../bookmark_image/club.png';
import styled from 'styled-components';

const Club = styled.img`
    width: 100px;
    height: 103px;
    margin: 7px;
    float: left;
`;
function BookMark() {
    return (
        <>
            <div>
                <div className={styles.title}> 나의 즐겨찾기 </div>
                <div className={styles.rectangle}>
                    <Club src={ClubImage} />
                    <p className={styles.club_name}>summit</p>
                    <p className={styles.club_branch}>IT대</p>
                    <StarButton />
                </div>
                <div className={styles.rectangle}>
                    <Club src={ClubImage} />
                    <p className={styles.club_name}>유어슈</p>
                    <p className={styles.club_branch}>중앙동아리</p>
                    <StarButton />
                </div>
            </div>
        </>
    );
}

export default BookMark;
