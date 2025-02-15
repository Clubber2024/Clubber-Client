import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HashTagClub from './HashTagClub';
import styles from '../branch/branchCentral.module.css';
import { customAxios } from '../../config/axios-config';
import ErrorModal from '../modal/ErrorModal';
import LoadingPage from '../loading/LoadingPage';

function BranchHashTag() {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [hashTagData, setHashTagData] = useState('');
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const location = useLocation();
    const hashtag = location.state?.hashtag;
    const navigate = useNavigate();

    const getHashTagClubs = async () => {
        try {
            setLoading(true);
            const response = await customAxios.get(`/v1/clubs?hashtag=${hashtag}`);
            if (response.data.success) {
                setClubs(response.data.data.clubs);
                setHashTagData(response.data.data.hashtag);
                setError(null);
            } else {
                setIsModalOpen(true);
            }
        } catch (error) {
            setError(error.response.data.code);
            console.log(error.response.data.code);
            if (error.response.data.code === 'CLUB_404_5') {
                setIsModalOpen(true);
                setModalMessage(error.response.data.reason);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hashtag) {
            getHashTagClubs();
        }
    }, [hashtag]); // hashtag 값이 변경될 때마다 호출

    if (loading)
        return (
            <div>
                <LoadingPage />
            </div>
        );

    //  모달 닫을 때 이전 페이지로 이동하는 함수
    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate(-1); // 이전 페이지로 이동
    };

    const renderDataInRows = (data) => {
        const rows = [];
        for (let i = 0; i < data.length; i += 4) {
            const rowItems = data.slice(i, i + 4);
            rows.push(
                <div className={styles.container} key={i}>
                    {rowItems.map((club) => (
                        <HashTagClub
                            key={club.clubId}
                            clubId={club.clubId}
                            imageUrl={club.imageUrl}
                            clubName={club.clubName}
                            introduction={club.introduction}
                            agreeToProvideInfo={club.agreeToProvideInfo}
                        />
                    ))}
                </div>
            );
        }
        return rows;
    };

    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <h2 className={styles.header_title}># {hashTagData}</h2>
                </div>
                {renderDataInRows(clubs)}
            </div>
            {isModalOpen && <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={handleCloseModal} />}
        </div>
    );
}

export default BranchHashTag;
