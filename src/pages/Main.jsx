import MainBanner from '../component/main/MainBanner';
import MainRanking from '../component/main/MainRanking';
import MainNotice from '../component/main/MainNotice';
// import MainPromote from '../component/main/MainPromote';
import './mainPage.css';
import QnAMain from '../component/QnA/QnAMain';
import MainIco from '../component/main/MainIco';

export default function MainPage() {
    return (
        <>
            <MainBanner />
            <div className="ico_container">
                <MainIco />
            </div>
            <div className="main_container">
                <div className="notice_ranking_container">
                    <MainNotice />
                    <MainRanking />
                </div>
                {/* <div className="main_promote_container">
                    <MainPromote />
                </div> */}
            </div>
            <QnAMain />
        </>
    );
}
