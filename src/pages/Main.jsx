import MainBanner from '../component/main/MainBanner';
import MainRanking from '../component/main/MainRanking';
import MainNotice from '../component/main/MainNotice';
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
