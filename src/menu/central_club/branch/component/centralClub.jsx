import React from 'react';
import PropTypes from 'prop-types';
import styles from './centralClub.module.css';
import { useNavigate } from 'react-router-dom';
import { LinkItem } from '../../central_club';

function CentralClub({ clubId, imageUrl, clubName, introduction }) {
    return (
        <div className={styles.rectangle}>
            <LinkItem to={`/menu/small_club/detail_page/${clubId}`}>
                <img className={styles.image} alt={clubName} src={imageUrl} />
                <h3 className={styles.title}>{clubName}</h3>
                <p className={styles.content}>{introduction}</p>
            </LinkItem>
        </div>
    );
}

CentralClub.propTypes = {
    clubId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
};

export default CentralClub;
