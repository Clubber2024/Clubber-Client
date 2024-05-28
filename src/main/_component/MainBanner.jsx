import "./mainBanner.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainBanner() {
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

    return (
        <>
            <Slider {...settings}>
                <div className="banner_container">
                    <img src="/main/banner_img.png" alt="main banner" />
                </div>
                <div className="banner_container">
                    <img src="/main/banner_img.png" alt="main banner" />
                </div>
                <div className="banner_container">
                    <img src="/main/banner_img.png" alt="main banner" />
                </div>
                <div className="banner_container">
                    <img src="/main/banner_img.png" alt="main banner" />
                </div>
                <div className="banner_container">
                    <img src="/main/banner_img.png" alt="main banner" />
                </div>
            </Slider>
        </>
    );
}
