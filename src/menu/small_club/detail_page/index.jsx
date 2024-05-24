import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import IntroductionTab from "./_component/IntroductionTab";
import "./detailPage.css";
import ReviewTab from "./_component/ReviewTab";

export default function DetailPage() {
    const [whichTab, setWhichTab] = useState("Introduction");
    const [detailData, setDetailData] = useState(null);
    const clubId = useParams();

    console.log(clubId);

    // useEffect(() => {
    //     const getDetailData = async () => {
    //         try {
    //             const res = await axios.get(`http://15.164.211.56:8080//v1/clubs/${clubId}`);
    //             setDetailData(res.data.data);
    //             console.log(detailData);
    //         } catch (error) {
    //             console.error('Error fetching data : ', error);
    //         }
    //     };
    //     getDetailData();
    // }, []);

    const onClickIntroTab = () => {
        setWhichTab("Introduction");
        console.log("동아리 상세 소개 탭뷰");
    }

    const onClickReviewTab = () => {
        setWhichTab("Review");
        console.log("동아리 상세 리뷰 탭뷰");
    }

    return (
        <div className="detail_container">
            <div className="detail_header_container">
                <img className="detail_logo" src="/detail/club_logo_summit.png" alt="summit logo" />
                <div className="detail_header">
                    <div className="detail_header_name">
                        <h3>Summit</h3>
                        <img className="insta_icon" src="/buttons/instagram_icon.png" alt="instagram" />
                    </div>
                    <div className="association_btn">
                        <span>IT대학</span>
                        <span>|</span>
                        <span>소프트웨어학부</span>
                    </div>
                </div>
            </div>
            <div className="detail_tab">
                <button className={whichTab === "Introduction" ? "active" : ""} onClick={onClickIntroTab}>소개</button>
                <button className={whichTab === "Review" ? "active" : ""} onClick={onClickReviewTab}>리뷰</button>
            </div>
            {whichTab === "Introduction" && <IntroductionTab />}
            {whichTab === "Review" && <ReviewTab />}
        </div>
    )
}