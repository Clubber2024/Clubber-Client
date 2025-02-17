import "./mainBanner.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

export default function MainBanner() {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 메인페이지에 보여줄 배너 (슬라이더 최대 5개)
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const onClickBan1 = () => {
        navigate("/");
    }

    const onClickBan2 = () => {
        navigate("/menu/summary");
    }

    return (
        <>
            <Slider {...settings}>
                <div className="banner_container" onClick={onClickBan1}>
                <img
                    src={isMobile ? "/main/ban1_mob2.png" : "/main/ban1.png"}
                    alt="main banner"
                />
                </div>
                <div className="banner_container" onClick={onClickBan2}>
                <img
                    src={isMobile ? "/main/ban2_mob2.png" : "/main/ban2.png"}
                    alt="main banner"
                />
                </div>
                {/* <div className="banner_container">
                <img
                    src={isMobile ? "/main/ban3_mob.png" : "/main/ban3.png"}
                    alt="main banner"
                />
                </div> */}
                <div className="banner_container">
                <img
                    src={isMobile ? "/main/ban4_mob2.png" : "/main/ban4.png"}
                    alt="main banner"
                />
                </div>
                <div className="banner_container">
                <img
                    src={isMobile ? "/main/ban5_mob2.png" : "/main/ban5.png"}
                    alt="main banner"
                />
                </div>
            </Slider>
        </>
    );
}
