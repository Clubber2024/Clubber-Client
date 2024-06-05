import { useState, useEffect } from 'react';
import axios from 'axios';
import IntroductionTab from './_component/IntroductionTab';
import ReviewTab from './_component/ReviewTab';
import './detailPage.css';

export default function DetailPage() {
    const url = window.location.href; // 현재 URL 가져오기
    const urlParts = url.split('/'); // URL을 '/' 기준으로 분할
    const clubId = urlParts[urlParts.length - 1]; // 마지막 부분이 clubId
    const intClubId = parseInt(clubId, 10);
    const [whichTab, setWhichTab] = useState('Introduction');
    const [detailData, setDetailData] = useState([]);
    const [clubInfoData, setClubInfoData] = useState([]);
    //즐겨찾기 기능
    const [favoriteId, setFavoriteId] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    //회원정보 조회
    const accessToken = localStorage.getItem('accessToken');
    /*
		const [userId, setUserId] = useState('');

    useEffect(() => {
        if (accessToken) {
            axios
                .get(`http://13.125.141.171:8080/v1/users/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((res) => {
                    console.log('UserId: ', res.data.data.id);
                    setUserId(res.data.data.id);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [accessToken]);
*/
    ///////////////////////////////////////
    const getDetailData = async () => {
        try {
            console.log(intClubId);
            const res = await axios.get(`http://13.125.141.171:8080/v1/clubs/${intClubId}`);
            if (res.data.success) {
                setDetailData(res.data.data);
                setClubInfoData(res.data.data.clubInfo);
                console.log(res.data.data);
                console.log(res.data.data.clubInfo);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getDetailData();
        getBookmarkData();
    }, [clubId]);

    const onClickIntroTab = () => {
        setWhichTab('Introduction');
        console.log('동아리 상세 소개 탭뷰');
    };

    const onClickReviewTab = () => {
        setWhichTab('Review');
        console.log('동아리 상세 리뷰 탭뷰');
    };

    //즐겨찾기 기능
    /*
		const onClickFavorite = () => {
        setIsFavorite((prev) => !prev);
    };
		*/

    const getBookmarkData = async () => {
        if (accessToken) {
            try {
                const response = await axios.get('http://13.125.141.171:8080/v1/users/favorite', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status == 200) {
                    //setFavoriteId(response.data.data.userFavorites.favoriteClub['clubId']);
                    console.log('success : ', response.data.data.userFavorites);
                } else {
                    console.error('Failed to fetch bookmark data');
                }
            } catch (error) {
                console.error('Error fetching bookmark data : ', error);
            }
        }
    };

    useEffect(() => {
        if (clubId) {
            setIsFavorite(favoriteId.includes(intClubId));
        }
    }, [favoriteId, clubId]);

    const handleFavorite = async () => {
        const baseUrl = 'http://13.125.141.171:8080/v1/clubs';
        const favoriteData = {
            clubId: intClubId,
            //userId: userId,
            favoriteId: intClubId,
        };

        //if (!userId) return; //로그아웃 시 기능x
        try {
            if (isFavorite) {
                const res = await axios.delete(`${baseUrl}/${intClubId}/favorites/${intClubId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: {
                        favoriteData,
                    },
                });
                if (res.status == 200) {
                    console.log('delete res:', res);
                    //setIsFavorite(false);
                }
            } else {
                const res = await axios.post(`${baseUrl}/${intClubId}/favorites`, favoriteData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (res.status === 200) {
                    console.log('add res : ', res);
                    //setIsFavorite(true);
                }
            }
            getBookmarkData(); // 각 요청 후 즐겨찾기 리스트 업데이트
        } catch (error) {
            console.log('favorite err: ', error);
        }
    };

    return (
        <div className="detail_container">
            <div className="detail_header_container">
                <img className="detail_logo" src={detailData.imageUrl} alt={`${detailData.clubName} logo`} />
                <div className="detail_header">
                    <div className="detail_header_name">
                        <h3>{detailData.clubName}</h3>
                        <img className="insta_icon" src="/buttons/instagram_icon.png" alt="instagram" />
                        <img
                            className="star_icon"
                            src={isFavorite ? '/bookmark/starYellow.png' : '/bookmark/star.png'}
                            alt="star"
                            onClick={handleFavorite}
                        />
                    </div>
                    <div className="association_btn">
                        <span>{detailData.college == null ? '중앙동아리' : detailData.college}</span>
                        <span>|</span>
                        <span>{detailData.department || detailData.division}</span>
                    </div>
                </div>
            </div>
            <div className="detail_tab">
                <button className={whichTab === 'Introduction' ? 'active' : ''} onClick={onClickIntroTab}>
                    소개
                </button>
                <button className={whichTab === 'Review' ? 'active' : ''} onClick={onClickReviewTab}>
                    리뷰
                </button>
            </div>
            {whichTab === 'Introduction' && (
                <IntroductionTab
                    clubName={detailData.clubName}
                    college={detailData.college}
                    department={detailData.department}
                    introduction={detailData.introduction}
                    instagram={detailData.instagram}
                    imgUrl={detailData.imageUrl}
                    activity={clubInfoData.activity}
                    leader={clubInfoData.leader}
                    room={clubInfoData.room}
                />
            )}
            {whichTab === 'Review' && <ReviewTab />}
        </div>
    );
}
