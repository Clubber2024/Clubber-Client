import React, { useEffect, useState } from 'react';
import styles from './bookmark.module.css';
import styled from 'styled-components';
import FavoriteClubs from './favoriteClubs';
import { customAxios } from '../../../../config/axios-config';
import StarImg from '../bookmark_image/starYellow.png';
import BookMarkIcon from '../bookmark_image/bookmarkIcon.png';
import { LinkItem } from '../../../branch/BranchCentral';
import ConfirmModal from '../../../modal/ConfirmModal';

const Club = styled.img`
    width: 100px;
    height: 103px;
    margin: 10px;
    float: left;
    background-color: #ffffff;
    /* border-radius: 15px; */
`;
const Star = styled.img`
    width: 18px;
    height: 18px;
    margin-top: 3px;
    display: grid;
    background-color: #ffffff;
`;

const Icon = styled.img`
    width: 32px;
    height: 32px;
    margin-right: 10px;
    margin-bottom: 15px;
    margin-top: -5px;
    background-color: #ffffff;
`;

function BookMark() {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [error, setError] = useState(null);
    const [clubID, setClubID] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // 선택된 즐겨찾기
    const [selectedClubId, setSelectedClubId] = useState(null);
    const [selectedFavoriteId, setSelectedFavoriteId] = useState(null);
    const [fix, setFix] = useState(0);

    const accessToken = localStorage.getItem('accessToken');

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };

    const getFavorites = async () => {
        try {
            const res = await customAxios.get(`/v1/users/favorite/page`, {
                params: { page: page, size: 2 },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.data.success) {
                const data = res.data.data;

                console.log('content: ', data);

                const favoriteClub = data.content.map((item) => item);

                //이전 동아리 값과 중복 제거 후 상태 저장
                setClubs((prevData) => {
                    const mergedData = [...prevData, ...favoriteClub];
                    return mergedData.filter(
                        (club, index, self) => index === self.findIndex((c) => c.clubId === club.clubId)
                    );
                });

                setHasNextPage(data.hasNextPage);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFavorites(page);
    }, [page, favoriteIds]);

    const loadMoreBookmarks = () => {
        if (hasNextPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const onClickStar = (clubId, favoriteId) => {
        setModalMessage("즐겨찾기를 해제하시겠습니까?");
        setSelectedClubId(clubId);
        setSelectedFavoriteId(favoriteId);
        setIsModalOpen(true);
    }

    const handleFavorite = async () => {
        try {
            const res = await customAxios.delete(`/v1/clubs/${selectedClubId}/favorites/${selectedFavoriteId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.status === 200) {
                //console.log('delete res:', res);
                setClubs((prevClubs) => prevClubs.filter((club) => club.clubId !== selectedClubId));
                setFavoriteIds((prevIds) => prevIds.filter((id) => id !== selectedFavoriteId)); // 배열에서 해당 ID 제거
            } else {
                //console.error('Failed to delete favorite:', res);
                return; // 실패 시 추가 요청을 하지 않음
            }
        } catch (error) {
            console.error('Favorite error:', error);
        }
        setIsModalOpen(false);
        setModalMessage("");
    };

    return (
        <div className={styles.bookmark_div}>
            <div className={styles.title}> 나의 즐겨찾기 </div>

            {clubs.map((club) => (
                <div key={club.clubId} className={styles.rectangle}>
                    <Club src={club?.imageUrl} className={styles.bookmark_ClubLogo} />
                    <FavoriteClubs id={club.clubId} name={club.clubName} type={club.clubType} />
                    <div className={styles.divRow}>
                        <Star src={StarImg} onClick={() => onClickStar(club.clubId, club.favoriteId)} />
                        <LinkItem to={`/clubs/${club.clubId}`}>
                            <Icon src={BookMarkIcon} className={styles.bookmark_icon} />
                        </LinkItem>
                    </div>
                </div>
            ))}

            {hasNextPage && (
                <div className={styles.bookmark_button_div}>
                    <button onClick={loadMoreBookmarks} className="more_button">
                        ⌵
                    </button>
                </div>
            )}
            <ConfirmModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} onClickOk={handleFavorite}/>
        </div>
    );
}

export default BookMark;
