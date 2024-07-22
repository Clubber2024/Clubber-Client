import { useEffect, useState } from "react";
import { customAxios } from "../../config/axios-config";
import { LinkItem } from "../branch/BranchCentral";
import EditIntroduction from "./EditIntroduction";
import styles from "./editPage.module.css";
import SideBar from "./component/SideBar";

export default function EditPage() {
  const accessToken = localStorage.getItem("accessToken");
  const [club, setClub] = useState([]);
  const [clubId, setClubId] = useState();
  const [clubInfo, setClubInfo] = useState([]);

  const getAdminClub = async () => {
    try {
      const response = await customAxios.get(`/v1/admins/mypage`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data.data);
      setClub(response.data.data);
      console.log(response.data.data.clubInfo);
      setClubInfo(response.data.data.clubInfo);
      const clubID = response.data.data.clubId;
      console.log(clubID);
      const intClubID = parseInt(clubID);
      return intClubID;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  useEffect(() => {
    getAdminClub();
  }, []);

  return (
    <div className={styles.DivMyPage}>
      <div className={styles.admin_detail_container}>
        <div className={styles.admin_detail_header}>
          <img
            className={styles.admin_detail_logo}
            src={club.imageUrl}
            alt={`${club.clubName} logo`}
          />
          <div className={styles.admin_detail_header_container}>
            <div className={styles.admin_detail_header_name}>
              <h3>{club.clubName}</h3>
            </div>

            <div className={styles.association_btn}>
              <span>
                {club.college === null || club.college === ""
                  ? "중앙동아리"
                  : club.college}
              </span>
              <span>|</span>
              <span>{club.department || club.division}</span>
            </div>
          </div>
        </div>

        <div className={styles.detail_tab}>
          <button>소개</button>
        </div>

        <EditIntroduction
          clubName={club.clubName}
          college={club.college}
          department={club.department}
          division={club.division}
          introduction={club.introduction}
          imgUrl={club.imageUrl}
          instagram={club.instagram}
          activity={clubInfo.activity}
          leader={clubInfo.leader}
          room={clubInfo.room}
        />
      </div>
    </div>
  );
}
