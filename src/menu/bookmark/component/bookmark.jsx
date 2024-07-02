import React, { useEffect, useState } from 'react';
import styles from './bookmark.module.css';
import axios from 'axios';
import StarButton from './starButton';
import ClubImage from '../bookmark_image/club.png';
import styled from 'styled-components';
import FavoriteClubs from './favoriteClubs';

const Club = styled.img`
    width: 100px;
    height: 103px;
    margin: 7px;
    float: left;
`;
function BookMark() {
    const [loading, setLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [error, setError] = useState(null);

    const getFavorites = async () => {
        try {
            const res = await axios.get(`http://13.125.141.171:8080/v1/users/favorite`);
            setClubs(res.data.data.favorties);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);

    const favoriteClub = ({ data }) => {
        {
            data.map((club) => (
                <div className={styles.rectangle}>
                    <Club src={ClubImage} />
                    <FavoriteClubs key={club.id} name={club.name} type={club.type} />
                    <StarButton />
                </div>
            ));
        }
    };

    return (
        <>
            <div>
                <div className={styles.title}> 나의 즐겨찾기 </div>
                {favoriteClub(clubs)}
            </div>
        </>
    );
}

export default BookMark;
