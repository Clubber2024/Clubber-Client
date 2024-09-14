import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './searchClub.module.css';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../modal/ConfirmModal';

//clubid페이지로 이동할 수 있게 수정 완료
function SearchClub({ clubId, clubName, introduction, imageUrl, division, department, agreeToProvideInfo }) {
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
                <img src={imageUrl} alt={clubName} className={styles.image} />
                <div className={styles.wrap}>
                    <h3 className={styles.title}>{clubName}</h3>
                    <p className={styles.department}>{division != null ? division : department}</p>
                </div>
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

SearchClub.propTypes = {
    clubId: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    division: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    agreeToProvideInfo: PropTypes.bool.isRequired,
};

export default SearchClub;
