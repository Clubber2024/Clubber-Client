import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../centralClub/centralClub.module.css';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../modal/ConfirmModal';

function HashTagClub({ clubId, imageUrl, clubName, introduction, agreeToProvideInfo }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClickClub = () => {
        if (agreeToProvideInfo) {
            navigate(`/clubs/${clubId}`);
        } else {
            setIsModalOpen(true);
        }
    };
    return (
        <>
            <div className={styles.rectangle} onClick={onClickClub}>
                <img className={styles.image} alt={clubName} src={imageUrl} />
                <h3 className={styles.title}>{clubName}</h3>
                <p className={styles.content}>{introduction}</p>
                <div className={agreeToProvideInfo === true ? '' : styles.cover}> </div>
            </div>
            {isModalOpen && (
                <ConfirmModal
                    isOpen={isModalOpen}
                    message={'정보 미동의한 동아리입니다.'}
                    onClickOk={() => setIsModalOpen(false)}
                    onClose={() => setIsModalOpen(false)} // 모달 닫기
                />
            )}
        </>
    );
}

HashTagClub.propTypes = {
    clubId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    agreeToProvideInfo: PropTypes.bool.isRequired,
};

export default HashTagClub;
