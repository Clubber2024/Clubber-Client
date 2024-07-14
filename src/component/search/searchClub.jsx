import React from 'react';
import PropTypes from 'prop-types';
import styles from './searchClub.module.css';
import { LinkItem } from '../branch/BranchCentral';

//clubid페이지로 이동할 수 있게 수정 완료
function SearchClub({ clubId, clubName, introduction, imageUrl, division, department }) {
    return (
        <div className={styles.rectangle}>
            <LinkItem to={`/clubs/${clubId}`}>
                <img src={imageUrl} alt={clubName} className={styles.image} />
                <div className={styles.wrap}>
                    <h3 className={styles.title}>{clubName}</h3>
                    <p className={styles.department}>{division != null ? division : department}</p>
                </div>
                <p className={styles.content}>{introduction}</p>
            </LinkItem>
        </div>
    );
}

SearchClub.propTypes = {
    clubId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    division: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
};

export default SearchClub;
