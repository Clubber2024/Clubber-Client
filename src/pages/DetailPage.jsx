import { useState, useEffect } from 'react';
import axios from 'axios';
import IntroductionPage from '../component/detail/introduction/IntroductionPage';
import ReviewPage from '../component/detail/review/ReviewPage';
import './detailPage.css';
import { useLocation } from 'react-router-dom';

export default function ClubsPage() {
    const url = window.location.href; // 현재 URL 가져오기
    const urlParts = url.split('/'); // URL을 '/' 기준으로 분할
    const clubId = urlParts[urlParts.length - 1]; // 마지막 부분이 clubId
    const intClubId = parseInt(clubId, 10);

    const location = useLocation();
    const tab = location.state || 'Introduction';
    console.log(tab);
    const [whichTab, setWhichTab] = useState(tab);
    const [detailData, setDetailData] = useState([]);
    const [clubInfoData, setClubInfoData] = useState([]);
    //즐겨찾기 기능
    const [favoriteId, setFavoriteId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //회원정보 조회
    const accessToken = localStorage.getItem('accessToken');

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
        setIsLoading(true);
        try {
            const response = await axios.get('http://13.125.141.171:8080/v1/users/favorite', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.data.success) {
                setIsLoading(false);
                const data = response.data.data.userFavorites;
                console.log('Data: ', data);
                const clubIds = data.map((item) => item.favoriteClub['clubId']);
                //console.log(clubIds);
                const isFavoriteClub = clubIds.some((id) => id === intClubId);
                const favorite = data.find((item) => item.favoriteClub['clubId'] === intClubId);
                console.log('isfavoriteClub: ', isFavoriteClub);
                setIsFavorite(isFavoriteClub);
                if (favorite) {
                    setFavoriteId(favorite.favoriteId);
                } else {
                    setFavoriteId(null);
                }
            } else {
                console.error('Failed to fetch bookmark data');
            }
        } catch (error) {
            console.error('Error fetching bookmark data : ', error);
        }
    };

    const handleFavorite = async () => {
        const favoriteData = {
            clubId: clubId,
        };

        //if (!userId) return; //로그아웃 시 기능x
        try {
            if (isFavorite) {
                const res = await axios.delete(
                    `http://13.125.141.171:8080/v1/clubs/${intClubId}/favorites/${favoriteId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                if (res.status == 200) {
                    console.log('delete res:', res);
                    setIsFavorite(false);
                    setFavoriteId(null); //즐겨찾기 ID 초기화
                } else {
                    console.error('Failed to delete favorite:', res);
                    return; // 실패 시 추가 요청을 하지 않음
                }
            }

            if (!isFavorite) {
                const addres = await axios.post(
                    `http://13.125.141.171:8080/v1/clubs/${intClubId}/favorites`,
                    favoriteData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                if (addres.data.success) {
                    console.log('add res : ', addres);
                    setIsFavorite(true);
                    setFavoriteId(addres.data.data.favoriteId);
                } else {
                    console.error('Failed to add favorite:', addres);
                }
            }
            getBookmarkData(); // 각 요청 후 즐겨찾기 리스트 업데이트
        } catch (error) {
            console.error('Favorite error:', error); // 에러 로그
            getBookmarkData(); //에러 발생해도 업데이트
        }
    };

    return (
        <div className="detail_container">
            <div className="detail_header_container">
                <img className="detail_logo" src={detailData.imageUrl} alt={`${detailData.clubName} logo`} />
                <div className="detail_header">
                    <div className="detail_header_name">
                        <h3>{detailData.clubName}</h3>

                        <img
                            className="star_icon"
                            src={isFavorite ? '/bookmark/starYellow.png' : '/bookmark/star.png'}
                            alt="star"
                            onClick={handleFavorite}
                        />
                    </div>
                    <div className="association_btn">
                        <span>
                            {detailData.college === null || detailData.college === ''
                                ? '중앙동아리'
                                : detailData.college}
                        </span>
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
                <IntroductionPage
                    clubName={detailData.clubName}
                    college={detailData.college}
                    department={detailData.department}
                    division={detailData.division}
                    introduction={detailData.introduction}
                    imgUrl={detailData.imageUrl}
                    instagram={clubInfoData.instagram}
                    activity={clubInfoData.activity}
                    leader={clubInfoData.leader}
                    room={clubInfoData.room}
                />
            )}
            {whichTab === 'Review' && <ReviewPage clubId={clubId} clubName={detailData.clubName} />}
        </div>
    );
}
