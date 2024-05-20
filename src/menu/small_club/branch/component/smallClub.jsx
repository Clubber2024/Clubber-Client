import React from 'react';
import PropTypes from 'prop-types';
import styles from './smallClub.module.css';
import { LinkItem } from '../../../central_club/central_club';

function SmallClub({ clubId, clubName, introduction }) {
    return (
        <div className={styles.rectangle}>
            <img className={styles.image} alt="club1" src="/branch_image/club1.png" />
            <h3 className={styles.title}>
                <LinkItem to="/menu/small_club/detail_page/index">{clubName}</LinkItem>
            </h3>
            <p className={styles.content}>{introduction}</p>
        </div>
    );
}

SmallClub.propTypes = {
    clubId: PropTypes.number.isRequired,
    //coverImg: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
};

export default SmallClub;
