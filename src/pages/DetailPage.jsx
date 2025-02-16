import { useState, useEffect } from 'react';
import IntroductionPage from '../component/detail/introduction/IntroductionPage';
import ReviewPage from '../component/detail/review/ReviewPage';
import './detailPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { customAxios } from '../config/axios-config';
import ErrorModal from '../component/modal/ErrorModal';
import LoadingPage from '../component/loading/LoadingPage';

export default function ClubsPage() {
    const url = window.location.href; // 현재 URL 가져오기
    const urlParts = url.split('/'); // URL을 '/' 기준으로 분할
    const clubId = urlParts[urlParts.length - 1]; // 마지막 부분이 clubId
    const intClubId = parseInt(clubId, 10);

    const navigate = useNavigate();
    const location = useLocation();
    const tab = location.state || 'Introduction';
    //console.log(tab);
    const [whichTab, setWhichTab] = useState(tab);
    const [detailData, setDetailData] = useState([]);
    const [clubInfoData, setClubInfoData] = useState([]);
    const [clubInfoId, setClubInfoId] = useState('');
    //즐겨찾기 기능
    const [favoriteId, setFavoriteId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // 모달창
    const isAdmin = localStorage.getItem('isAdmin');
    const token = localStorage.getItem('accessToken');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    //즐겨찾기 모달창
    const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
    const [bookmarkMessage, setBookmarkMessage] = useState('');

    const getDetailData = async () => {
        try {
            //console.log(intClubId);
            const res = await customAxios.get(`/v1/clubs/${intClubId}`);
            if (res.data.success) {
                console.log(res.data.data);
                setDetailData(res.data.data);
                setClubInfoData(res.data.data.clubInfo);
                setClubInfoId(res.data.data.clubInfo);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getDetailData();
        getBookmarkData();
    }, [clubId]);

    if (isLoading)
        return (
            <div>
                <LoadingPage />
            </div>
        );

    const onClickIntroTab = () => {
        setWhichTab('Introduction');
    };

    const onClickReviewTab = async () => {
        try {
            const res = await customAxios.get(`/v1/clubs/${intClubId}/reviews/agree`);
            if (res.data.data.agreeToReview) {
                setWhichTab('Review');
            } else {
                setModalMessage('리뷰 기능은 준비 중입니다.🙌');
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error();
        }
    };

    const handleReviewError = (error) => {
        console.log(error.data);
        if (error.response && error.response.status === 403) {
            setModalMessage(error.response.reason);
            setIsModalOpen(true);
        } else {
            setModalMessage('알 수 없는 오류가 발생했습니다.');
            setIsModalOpen(true);
        }
    };

    const getBookmarkData = async () => {
        // setIsLoading(true);
        if (isAdmin) return;
        if (!token) return;
        try {
            const response = await customAxios.get('/v1/users/favorite', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                setIsLoading(false);
                const data = response.data.data.userFavorites;
                //console.log('Data: ', data);
                const clubIds = data.map((item) => item.favoriteClub['clubId']);
                //console.log(clubIds);
                const isFavoriteClub = clubIds.some((id) => id === intClubId);
                const favorite = data.find((item) => item.favoriteClub['clubId'] === intClubId);
                // console.log('isfavoriteClub: ', isFavoriteClub);
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

        if (!token) return;
        if (isAdmin) return;
        try {
            if (!isAdmin && token) {
                if (isFavorite) {
                    const res = await customAxios.delete(`/v1/clubs/${intClubId}/favorites/${favoriteId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (res.status === 200) {
                        //console.log('delete res:', res);
                        setIsFavorite(false);
                        setFavoriteId(null); //즐겨찾기 ID 초기화
                        setBookmarkMessage('동아리가 즐겨찾기에서 해제되었습니다.');
                        setIsBookmarkModalOpen(true);
                    } else {
                        //console.error('Failed to delete favorite:', res);
                        return; // 실패 시 추가 요청을 하지 않음
                    }
                }

                if (!isFavorite) {
                    const address = await customAxios.post(`/v1/clubs/${intClubId}/favorites`, favoriteData, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (address.data.success) {
                        //console.log('add res : ', addres);
                        setIsFavorite(true);
                        setFavoriteId(address.data.data.favoriteId);
                        setBookmarkMessage('동아리가 즐겨찾기에 추가되었습니다.');
                        setIsBookmarkModalOpen(true);
                    } else {
                        //console.error('Failed to add favorite:', addres);
                    }
                }
            } else if (isAdmin && token) {
                setModalMessage('관리자는 즐겨찾기를 이용할 수 없습니다.');
                setIsModalOpen(true);
            } else {
                setModalMessage('즐겨찾기 추가는 로그인 이후 가능합니다.');
                setIsModalOpen(true);
            }
            getBookmarkData(); // 각 요청 후 즐겨찾기 리스트 업데이트
        } catch (error) {
            //console.error('Favorite error:', error); // 에러 로그
            getBookmarkData(); //에러 발생해도 업데이트
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
        navigate(`/clubs/${clubId}`, { state: 'Introduction' });
    };

    const OnClickRecruitBtn = () => {
        navigate(`/recruit/club/${clubId}`, { state: { clubId: clubId } });
    };

    //즐겨찾기 모달
    const closeBookmarkModal = () => {
        setIsBookmarkModalOpen(false);
        setModalMessage('');
    };

    return (
        <div className="detail_container">
            <div className="detail_header_container">
                <img className="detail_logo" src={detailData.imageUrl} alt={`${detailData.clubName} logo`} />
                <div className="detail_header">
                    <div className="detail_header_name">
                        <h3 className="detail_club_name">{detailData.clubName}</h3>
                        <div className="imgDiv">
                            {isAdmin ? (
                                ''
                            ) : (
                                <img
                                    className="star_icon"
                                    src={isFavorite ? '/bookmark/starYellow.png' : '/bookmark/star.png'}
                                    alt="star"
                                    onClick={handleFavorite}
                                />
                            )}
                        </div>
                    </div>
                    <div className="association_container">
                        <div className="association_btn">
                            <span>{detailData.clubType}</span>
                            <span>|</span>
                            <span>
                                {detailData.clubType === '중앙동아리' ? detailData.division : detailData.department}
                            </span>
                        </div>

                        <div className="recruit_btn" onClick={OnClickRecruitBtn}>
                            모집글 보러가기 <div className="recruit_btn_border"></div>
                        </div>
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
            {whichTab === 'Review' && (
                <ReviewPage
                    clubId={clubId}
                    clubName={detailData.clubName}
                    onError={(error) => handleReviewError(error)}
                />
            )}
            <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
            {isBookmarkModalOpen && (
                <ErrorModal isOpen={isBookmarkModalOpen} message={bookmarkMessage} onClose={closeBookmarkModal} />
            )}
        </div>
    );
}
