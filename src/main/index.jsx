import MainBanner from './_component/MainBanner';
import MainRanking from './_component/MainRanking';
import MainNotice from './_component/MainNotice';
import './mainPage.css';

export default function MainPage() {
    return (
        <>
            <MainBanner />
            <div className="notice_ranking_container">
                <MainNotice />
                <MainRanking />
            </div>
        </>
    );
}
