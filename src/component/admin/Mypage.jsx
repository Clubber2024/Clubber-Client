import { useEffect, useState } from 'react';
import { customAxios } from '../../config/axios-config';
import { LinkItem } from '../branch/BranchCentral';
import AdminIntroductionPage from './AdminIntroductionpage';
import styles from './mypage.module.css';
import SideBar from './component/SideBar';

export default function MyPage() {
    const accessToken = localStorage.getItem('accessToken');
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
        const fetchClubData = async () => {
            const clubId = await getAdminClub();
            if (clubId !== null) {
                // clubId를 사용하여 원하는 작업 수행
                console.log(`Retrieved club ID: ${clubId}`);
                // 예시: 상태(state)에 저장
                setClubId(clubId);
            } else {
                console.log('Failed to retrieve club ID');
            }
        };

        fetchClubData();
    }, [accessToken]);

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
                            <span>{club.college === null || club.college === '' ? '중앙동아리' : club.college}</span>
                            <span>|</span>
                            <span>{club.department || club.division}</span>
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
                    instagram={club.instagram}
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
