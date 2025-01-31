import React, { useEffect, useState } from 'react';
import styles from './bookmark.module.css';
import styled from 'styled-components';
import FavoriteClubs from './favoriteClubs';
import { customAxios } from '../../../../config/axios-config';
import StarImg from '../bookmark_image/starYellow.png';
import BookMarkIcon from '../bookmark_image/bookmarkIcon.png';
import { LinkItem } from '../../../branch/BranchCentral';

const Club = styled.img`
    width: 100px;
    height: 103px;
    margin: 7px;
    margin-top: 9px;
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
    const [fix, setFix] = useState(0);

    const accessToken = localStorage.getItem('accessToken');

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

    const handleFavorite = async (clubId, favoriteId) => {
        try {
            {
                const res = await customAxios.delete(`/v1/clubs/${clubId}/favorites/${favoriteId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (res.status == 200) {
                    setClubs((prevClubs) => prevClubs.filter((club) => club.clubId !== clubId));
                    setFavoriteIds((prevIds) => prevIds.filter((id) => id !== favoriteId)); // 배열에서 해당 ID 제거
                } else {
                    return; // 실패 시 추가 요청을 하지 않음
                }
            }
        } catch (error) {}
    };

    return (
        <div className={styles.bookmark_div}>
            <div className={styles.title}> 나의 즐겨찾기 </div>

            {clubs.map((club) => (
                <div key={club.clubId} className={styles.rectangle}>
                    <Club src={club?.imageUrl} className={styles.bookmark_ClubLogo} />
                    <FavoriteClubs id={club.clubId} name={club.clubName} type={club.clubType} />
                    <div className={styles.divRow}>
                        <Star src={StarImg} onClick={() => handleFavorite(club.clubId, club.favoriteId)} />
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
        </div>
    );
}

export default BookMark;
