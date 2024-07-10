import React, { useEffect, useState } from "react";
import styles from "./bookmark.module.css";
import styled from "styled-components";
import FavoriteClubs from "./favoriteClubs";
import { customAxios } from "../../../../config/axios-config";
import StarImg from "../bookmark_image/starYellow.png";
import EmptyStarImg from "../bookmark_image/star.png";
import BookMarkIcon from "../bookmark_image/bookmarkIcon.png";
import { LinkItem } from "../../../branch/BranchCentral";

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
  dispaly: grid;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

function BookMark() {
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);
  const [clubID, setClubID] = useState([]);

  const accessToken = localStorage.getItem("accessToken");

  const getFavorites = async () => {
    try {
      const res = await customAxios.get(`/v1/users/favorite`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        const data = res.data.data.userFavorites;
        console.log("Data: ", data);
        const clubIds = data.map((item) => item.favoriteClub["clubId"]);
        const favoriteClub = data.map((item) => item.favoriteClub);
        setClubID(clubIds);
        setClubs(favoriteClub);
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

  console.log("clubs", clubs);

  return (
    <div>
      <div className={styles.title}> 나의 즐겨찾기 </div>

      {clubs.map((club) => (
        <div key={club.clubId} className={styles.rectangle}>
          <Club src={club.imageUrl} />
          <FavoriteClubs
            id={club.clubId}
            name={club.clubName}
            type={club.clubType}
          />
          <Star src={clubID ? StarImg : EmptyStarImg} />
          <div className={styles.div}>
            <LinkItem to={`/clubs/${club.clubId}`}>
              <Icon src={BookMarkIcon} />
            </LinkItem>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookMark;
