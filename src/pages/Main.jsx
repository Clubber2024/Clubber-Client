import MainBanner from '../component/main/MainBanner';
import MainRanking from '../component/main/MainRanking';
import MainNotice from '../component/main/MainNotice';
import './mainPage.css';
import MainPromote from '../component/main/MainPromote';

export default function MainPage() {
    return (
        <>
            <MainBanner />
            <div className="main_container">
                <div className="notice_ranking_container">
                    <MainNotice />
                    <MainRanking />
                </div>
                <div className="main_promote_container">
                    <MainPromote />
                </div>
            </div>
        </>
    );
}
