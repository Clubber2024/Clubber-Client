import { customAxios } from '../../config/axios-config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './recruitContent.module.css';
import styled from 'styled-components';

import StarImg from '../mypage/bookmark/bookmark_image/starYellow.png';
import WhiteStarImg from '../mypage/bookmark/bookmark_image/star.png';
import BookMarkIcon from '../mypage/bookmark/bookmark_image/bookmarkIcon.png';
import ErrorModal from '../modal/ErrorModal';
import { LinkItem } from '../branch/BranchCentral';

const Club = styled.img`
    width: 20%;
    object-fit: cover;
    aspect-ratio: 1/1;
    margin: 7px;
    margin-top: 10px;
    float: left;
    background-color: #ffffff;
    /* border-radius: 15px; */
`;
const Star = styled.img`
    @media screen and (min-width: 768px) {
        width: 23px;
        height: 23px;
    }
    @media screen and (max-width: 768px) {
        width: 18px;
        height: 18px;
        margin-top: 3px;
    }

    display: grid;
    margin-top: 1px;
    background-color: #ffffff;
`;

const Icon = styled.img`
    @media screen and (min-width: 768px) {
        width: 40px;
        height: 40px;
        margin-top: -20px;
        margin-right: 10px;
    }
    @media screen and (max-width: 768px) {
        width: 30px;
        height: 30px;
        margin-top: -10px;
        margin-right: 5px;
    }
    margin-right: 10px;
    background-color: #ffffff;
`;

export default function RecruitContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const recruitId = location.state?.recruitId;
    const [contentData, setContentData] = useState();
    //즐겨찾기 기능능
    const isAdmin = localStorage.getItem('isAdmin');

    const accessToken = localStorage.getItem('accessToken');
    const [isLoading, setIsLoading] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [clubId, setClubId] = useState('');
    const [clubImg, setClubImg] = useState();
    const [clubName, setClubName] = useState();
    const [clubType, setClubType] = useState();

    //이미지 모달창
    const [isImgModalOpen, setIsImgModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 모달창
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    //즐겨찾기 모달창
    const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
    const [bookmarkModalMessage, setBookmarkModalMessage] = useState('');

    const getRecruitData = async () => {
        try {
            const res = await customAxios.get(`/v1/recruits/${recruitId}`, {});
            if (res.data.success) {
                setContentData(res.data.data);
                console.log('data', res.data.data);
                setClubId(res.data.data.clubId);
                setClubImg(res.data.data.clubImage);
                setClubName(res.data.data.clubName);
                setClubType(res.data.data.clubType);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getRecruitData();
    }, []);

    const onClickList = () => {
        navigate('/recruit');
    };

    const getFavorites = async () => {
        setIsLoading(true);
        if (isAdmin) return;
        if (!accessToken) return;
        try {
            const res = await customAxios.get(`/v1/users/favorite`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.data.success) {
                setIsLoading(false);
                const data = res.data.data.userFavorites;
                const clubIds = data.map((item) => item.favoriteClub['clubId']);
                const isFavoriteClub = clubIds.some((id) => id === clubId);
                const favorite = data.find((item) => item.favoriteClub['clubId'] === clubId);
                setIsFavorite(isFavoriteClub);
                if (favorite) {
                    setFavoriteId(favorite.favoriteId);
                } else {
                    setFavoriteId(null);
                }
            } else {
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);

    const handleFavorite = async () => {
        const favoriteData = {
            clubId: clubId,
        };

        if (!accessToken) return;
        if (isAdmin) return;
        try {
            if (!isAdmin && accessToken) {
                //즐겨찾기 해제
                if (isFavorite) {
                    const res = await customAxios.delete(`/v1/clubs/${clubId}/favorites/${favoriteId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (res.status === 200) {
                        setIsFavorite(false);
                        setFavoriteId(null); //즐겨찾기 ID 초기화
                        setBookmarkModalMessage('동아리가 즐겨찾기에서 해제되었습니다.');
                        setIsBookmarkModalOpen(true);
                    } else {
                        return; // 실패 시 추가 요청을 하지 않음
                    }
                }
                //즐겨찾기 추가
                if (!isFavorite) {
                    const address = await customAxios.post(`/v1/clubs/${clubId}/favorites`, favoriteData, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (address.data.success) {
                        setIsFavorite(true);
                        setFavoriteId(address.data.data.favoriteId);
                        setBookmarkModalMessage('동아리가 즐겨찾기에 추가되었습니다.');
                        setIsBookmarkModalOpen(true);
                    } else {
                    }
                }
            }
            getFavorites(); // 각 요청 후 즐겨찾기 리스트 업데이트
        } catch (error) {
            getFavorites(); //에러 발생해도 업데이트
        }
    };

    //이미지 모달창
    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsImgModalOpen(true);
    };

    const closeModal = () => {
        setIsImgModalOpen(false);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === contentData.imageUrls.length - 1 ? prevIndex : prevIndex + 1
        );
    };

    //즐겨찾기 모달창
    const closeBookmarkModal = () => {
        setIsBookmarkModalOpen(false);
    };

    return (
        <>
            <div className={styles.recruit_div}>
                <div className={styles.rectangle}>
                    <Club src={clubImg} className={styles.bookmark_ClubLogo} />
                    <div className={styles.rectangle_p}>
                        <p className={styles.clubName}>{clubName}</p>
                        <p className={styles.clubType}>{clubType}</p>

                        {!isAdmin && accessToken ? (
                            <div className={styles.divRow}>
                                <Star
                                    src={isFavorite ? StarImg : WhiteStarImg}
                                    onClick={() => handleFavorite(clubId, favoriteId)}
                                />
                                <LinkItem to={`/clubs/${clubId}`}>
                                    <Icon src={BookMarkIcon} className={styles.bookmark_icon} />
                                </LinkItem>
                            </div>
                        ) : (
                            <div className={styles.divRow_noStar}>
                                <LinkItem to={`/clubs/${clubId}`}>
                                    <Icon src={BookMarkIcon} className={styles.bookmark_icon} />
                                </LinkItem>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.total_div}>
                    <p className={styles.content_title}>{contentData?.title}</p>
                    <div className={styles.date_div}>
                        <p className={styles.content_date}>{new Date(contentData?.createdAt).toLocaleDateString()}</p>
                        <p className={styles.content_date}>조회수 {contentData?.totalView}</p>
                    </div>
                    <div className={styles.horizontal_line}></div>

                    <div className={styles.content_div}>
                        <div className={styles.everytime_div}>
                            <img src="/recruit/everytime.png" alt="ET" className={styles.everyTime_img} />
                            <a href={contentData?.everytimeUrl}>
                                <p className={styles.everyTime_p}>{contentData?.everytimeUrl}</p>
                            </a>
                        </div>
                        <p className={styles.content_content}>{contentData?.content}</p>
                    </div>

                    <div className={styles.img_div}>
                        {contentData?.imageUrls.length > 0
                            ? contentData.imageUrls.map((image, index) => (
                                  <img
                                      key={index}
                                      src={image}
                                      alt="contentImg"
                                      className={styles.content_img}
                                      onClick={() => openModal(index)}
                                  />
                              ))
                            : ''}
                    </div>
                    <div className={styles.horizontal_line_bottom}></div>
                </div>
                <div className={styles.button_div}>
                    <button className={styles.content_list_button} onClick={onClickList}>
                        목록
                    </button>
                </div>
            </div>
            {isImgModalOpen && (
                <div className={styles.modal}>
                    <span className={styles.close} onClick={closeModal}>
                        &times;
                    </span>
                    <img
                        src={contentData.imageUrls[currentImageIndex]}
                        className={styles.modal_img}
                        alt="Large contentImg"
                    />
                    <span className={styles.prev} onClick={prevImage}>
                        &#10094;
                    </span>
                    <span className={styles.next} onClick={nextImage}>
                        &#10095;
                    </span>
                </div>
            )}
            {isBookmarkModalOpen && (
                <ErrorModal isOpen={isBookmarkModalOpen} message={bookmarkModalMessage} onClose={closeBookmarkModal} />
            )}
        </>
    );
}
