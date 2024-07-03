import React from 'react';
import PropTypes from 'prop-types';
import styles from './smallClub.module.css';
import { LinkItem } from '../../../../component/branch/BranchCentral';

//clubid페이지로 이동할 수 있게 수정 완료
function SmallClub({ clubId, clubName, introduction, imageUrl }) {
    return (
        <div className={styles.rectangle}>
            <LinkItem to={`/menu/detail/${clubId}`}>
                <img src={imageUrl} alt={clubName} className={styles.image} />

                <h3 className={styles.title}>{clubName}</h3>
                <p className={styles.content}>{introduction}</p>
            </LinkItem>
        </div>
    );
}

SmallClub.propTypes = {
    clubId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
};

export default SmallClub;
