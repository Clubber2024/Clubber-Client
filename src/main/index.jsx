import MainBanner from './_component/MainBanner';
import MainLank from './_component/MainLank';
import MainNotice from './_component/MainNotice';
import Header from '../layout/Header';
import './mainPage.css';
import Footer from '../layout/Footer';

export default function MainPage() {
    return (
        <>
            {/* 메인 페이지 */}
            {/* 
            <Header />
            <MenuBar />
            <MainBanner />
            <MainNotice />
            <MainLank />
            <MainFooter />
            */}

            <Header />
            <MainBanner />
            <div className="notice_lank_container">
                <MainNotice />
                <MainLank />
            </div>
            <Footer />
        </>
    );
}
