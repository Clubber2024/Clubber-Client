import { useEffect, useState } from 'react';
import { customAxios } from '../../config/axios-config';
import { LinkItem } from '../branch/BranchCentral';
import AdminIntroductionPage from './AdminIntroductionpage';
import styles from './mypage.module.css';

export default function MyPage() {
    const accessToken = localStorage.getItem('accessToken');
    const [club, setClub] = useState([]);
    const [clubId, setClubId] = useState();
    const [clubInfo, setClubInfo] = useState([]);

    // console.log(accessToken);

    const getAdminClub = async () => {
        try {
            const response = await customAxios.get(`/v1/admins/mypage`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data.data);
            setClub(response.data.data);
            // console.log(response.data.data.clubInfo);
            setClubInfo(response.data.data.clubInfo);
            const clubID = response.data.data.clubId;
            // console.log(clubID);
            const intClubID = parseInt(clubID);
            return intClubID;
        } catch (error) {
            // console.log(error);
            return null;
        }
    };
    useEffect(() => {
        const fetchClubData = async () => {
            const clubId = await getAdminClub();
            if (clubId !== null) {
                setClubId(clubId);
            } else {
                // console.log('Failed to retrieve club ID');
            }
        };

        fetchClubData();
    }, []);

    return (
        <div className={styles.DivMyPage}>
            <div className={styles.detail_container}>
                <div className={styles.detail_header_container}>
                    <img className={styles.detail_logo} src={club.imageUrl} alt={`${club.clubName} logo`} />

                    <div className={styles.detail_header}>
                        <div className={styles.detail_header_name}>
                            <h3>{club.clubName}</h3>
                        </div>

                        <div className={styles.association_btn}>
                            <span className={styles.association_text}>
                                {club.clubType === '해당 없음' ? club.college : club.clubType}
                            </span>
                            <span className={styles.association_text}>|</span>
                            <span className={styles.association_text}>
                                {club.clubType === '중앙동아리' ? club.division : club.department}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.detail_tab}>
                    <button>소개</button>
                </div>

                <AdminIntroductionPage
                    clubName={club.clubName}
                    college={club.college}
                    department={club.department}
                    division={club.division}
                    introduction={club.introduction}
                    imgUrl={club.imageUrl}
                    instagram={clubInfo.instagram}
                    activity={clubInfo.activity}
                    leader={clubInfo.leader}
                    room={clubInfo.room}
                />
                <div className={styles.divButton}>
                    <LinkItem to={`/admin/edit/${clubId}`}>
                        <button className={styles.EditButton}>수정하기</button>
                    </LinkItem>
                </div>
            </div>
        </div>
    );
}
