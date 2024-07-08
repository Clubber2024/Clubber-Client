import React from 'react';
import PropTypes from 'prop-types';
import styles from './smallClubProps.module.css';
import { LinkItem } from '../branch/BranchCentral';

//clubid페이지로 이동할 수 있게 수정 완료
function SmallClubProps({ clubId, clubName, introduction, imageUrl }) {
    return (
        <div className={styles.rectangle}>
            <LinkItem to={`/clubs/${clubId}`}>
                <img src={imageUrl} alt={clubName} className={styles.image} />

                <h3 className={styles.title}>{clubName}</h3>
                <p className={styles.content}>{introduction}</p>
            </LinkItem>
        </div>
    );
}

SmallClubProps.propTypes = {
    clubId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
};

export default SmallClubProps;
