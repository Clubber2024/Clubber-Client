import React, { useEffect, useState } from 'react';
import styles from './bookmark.module.css';
import styled from 'styled-components';
import FavoriteClubs from './favoriteClubs';
import { customAxios } from '../../../../config/axios-config';
import StarImg from '../bookmark_image/starYellow.png';
import EmptyStarImg from '../bookmark_image/star.png';
import BookMarkIcon from '../bookmark_image/bookmarkIcon.png';
import { LinkItem } from '../../../branch/BranchCentral';

const Club = styled.img`
    width: 100px;
    height: 103px;
    margin: 7px;
    margin-top: 9px;
    float: left;
`;
const Star = styled.img`
    width: 18px;
    height: 18px;
    margin-top: 3px;
    display: grid;
`;

const Icon = styled.img`
    width: 32px;
    height: 32px;
    margin-right: 10px;
    margin-bottom: 15px;
    margin-top: -5px;
`;

function BookMark() {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [error, setError] = useState(null);
    const [clubID, setClubID] = useState([]);
    const [favoriteClubIds, setFavoriteClubIds] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    // const [isFavorite, setIsFavorite] = useState(false);

    const accessToken = localStorage.getItem('accessToken');

    const getFavorites = async () => {
        try {
            const res = await customAxios.get(`/v1/users/favorite`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.data.success) {
                const data = res.data.data.userFavorites;
                console.log('Data: ', data);
                const clubIds = data.map((item) => item.favoriteClub['clubId']);
                const favoriteClub = data.map((item) => item.favoriteClub);
                console.log('CC', data);
                setClubID(clubIds);
                setClubs(data);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);

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
                    //console.log('delete res:', res);

                    setFavoriteIds(favoriteIds.filter((id) => id !== clubId)); // 배열에서 해당 ID 제거
                    getFavorites();
                } else {
                    //console.error('Failed to delete favorite:', res);
                    return; // 실패 시 추가 요청을 하지 않음
                }
            }
        } catch (error) {
            //console.error('Favorite error:', error); // 에러 로그
        }
    };

    return (
        <div className={styles.bookmark_div}>
            <div className={styles.title}> 나의 즐겨찾기 </div>

            {clubs.map((club) => (
                <div key={club.favoriteClub.clubId} className={styles.rectangle}>
                    <Club src={club.favoriteClub.imageUrl} className={styles.bookmark_ClubLogo} />
                    <FavoriteClubs
                        id={club.favoriteClub.clubId}
                        name={club.favoriteClub.clubName}
                        type={club.favoriteClub.clubType}
                    />
                    <div className={styles.divRow}>
                        <Star src={StarImg} onClick={() => handleFavorite(club.favoriteClub.clubId, club.favoriteId)} />
                        <LinkItem to={`/clubs/${club.favoriteClub.clubId}`}>
                            <Icon src={BookMarkIcon} className={styles.bookmark_icon} />
                        </LinkItem>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookMark;
