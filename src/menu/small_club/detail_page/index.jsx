import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IntroductionTab from './_component/IntroductionTab';
import ReviewTab from './_component/ReviewTab';
import './detailPage.css';

export default function DetailPage({ }) {
    const url = window.location.href; // 현재 URL 가져오기
    const urlParts = url.split('/'); // URL을 '/' 기준으로 분할
    const clubId = urlParts[urlParts.length - 1]; // 마지막 부분이 clubId

    const intClubId = parseInt(clubId, 10);

    console.log(clubId);
    const [whichTab, setWhichTab] = useState('Introduction');
    const [detailData, setDetailData] = useState([]);

    const getDetailData = async () => {
        try {
            console.log(intClubId);
            const res = await axios.get(`http://13.125.141.171:8080/v1/clubs/${intClubId}`);
            if (res.data.success) {
                setDetailData(res.data.data);
                console.log(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getDetailData();
    }, [clubId]);

    const onClickIntroTab = () => {
        setWhichTab('Introduction');
        console.log('동아리 상세 소개 탭뷰');
    };

    const onClickReviewTab = () => {
        setWhichTab('Review');
        console.log('동아리 상세 리뷰 탭뷰');
    };

    return (
        <div className="detail_container">
            <div className="detail_header_container">
                <img
                    className="detail_logo"
                    src={detailData.imageUrl || '/detail/club_logo_summit.png'}
                    alt={`${detailData.clubName} logo`}
                />
                <div className="detail_header">
                    <div className="detail_header_name">
                        <h3>{detailData.clubName}</h3>
                        <img className="insta_icon" src="/buttons/instagram_icon.png" alt="instagram" />
                    </div>
                    <div className="association_btn">
                        <span>{detailData.college}</span>
                        <span>|</span>
                        <span>{detailData.department}</span>
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
                />
            )}
            {whichTab === 'Review' && <ReviewTab clubId={clubId} clubName={detailData.clubName} />}
        </div>
    );
}
