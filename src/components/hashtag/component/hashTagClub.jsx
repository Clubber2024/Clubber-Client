import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../menu/central_club/branch/component/centralClub.module.css';
import { LinkItem } from '../../../menu/central_club/central_club';

function HashTagClub({ clubId, imageUrl, clubName, introduction }) {
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

HashTagClub.propTypes = {
    clubId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
};

export default HashTagClub;
