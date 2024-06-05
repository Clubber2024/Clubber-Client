import React from 'react';
import PropTypes from 'prop-types';
import styles from './clubDetail.module.css';
import HashTag from '../../../components/hashtag/HashTag';

function ClubDetail({ clubId, clubName, introduction, imageUrl }) {
    return (
        <div className={styles.rectangle}>
            <img src={imageUrl} alt={clubName} className={styles.image} />
            <h3 className={styles.title}>{clubName}</h3>
            <p className={styles.content}>{introduction}</p>
        </div>
    );
}

ClubDetail.propTypes = {
    clubId: PropTypes.number.isRequired,
    clubName: PropTypes.string.isRequired,
    clubType: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    HashTag: PropTypes.number.isRequired,
    division: PropTypes.string.isRequired,
    //college :
    department: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default ClubDetail;
