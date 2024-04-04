import Header from "../layout/Header";
import MainBanner from "./_component/MainBanner";
import MainNotice from "./_component/MainNotice";
import MainLank from "./_component/MainLank";
import Footer from "../layout/Footer";
import "./mainPage.css";

export default function MainPage() {
    return (
        <>
            <MainBanner />
            <div className="notice_lank_container">
                <MainNotice />
                <MainLank />
            </div>
        </>
    )
}