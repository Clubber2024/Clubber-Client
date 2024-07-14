import React from 'react';
import PropTypes from 'prop-types';
import styles from '../centralClub/centralClub.module.css';
import { LinkItem } from '../branch/BranchCentral';

function HashTagClub({ clubId, imageUrl, clubName, introduction }) {
    return (
        <div className={styles.rectangle}>
            <LinkItem to={`/clubs/${clubId}`}>
                <img className={styles.image} alt={clubName} src={imageUrl} />
                <h3 className={styles.title}>{clubName}</h3>
                <p className={styles.content}>{introduction}</p>
            </LinkItem>
        </div>
    );
}

HashTagClub.propTypes = {
    clubId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
};

export default HashTagClub;
