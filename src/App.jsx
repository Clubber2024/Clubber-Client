import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import MainPage from './pages/Main';
import CentralClubPage from './pages/CentralClub';
import SmallClubPage from './pages/SmallClub';
import DetailPage from './menu/detail';
import LoginPage from './pages/LoginPage';
import KakaoRedirection from './component/login/kakaoRedirection';
import BranchSmall from './menu/small_club/branch/branch_small';
import HashTagPage from './pages/HashTag';
import ReviewWrite from './menu/detail/review_write';
import Search from './menu/search/search';
import SummaryPage from './pages/Summary';
import BookMarkPage from './menu/bookmark';
import BranchCentralPage from './pages/BranchCentral';

function App() {
    const isPc = useMediaQuery({
        query: '(min-width:769px)',
    });
    const isMobile = useMediaQuery({
        query: '(max-width:769px)',
    });
    return (
        <>
            {isPc && (
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/central" element={<CentralClubPage />} />
                        {/* <Route path="/menu/central_club/detail_page/review_write" element={<ReviewWrite />} /> */}
                        <Route path="/small" element={<SmallClubPage />} />
                        <Route path="/clubs/:clubId" element={<DetailPage />} />
                        <Route path="/menu/detail/review_write" element={<ReviewWrite />} />
                        <Route path="/central/divisions" element={<BranchCentralPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/v1/auths/oauth/kakao" element={<KakaoRedirection />} />
                        <Route path="/menu/small_club/branch/branch_small" element={<BranchSmall />} />
                        <Route path="/hastag" element={<HashTagPage />} />
                        <Route path="/menu/search" element={<Search />} />
                        <Route path="/summary" element={<SummaryPage />} />
                        <Route path="/menu/bookmark" element={<BookMarkPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}

            {isMobile && (
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/central" element={<CentralClubPage />} />
                        <Route path="/small" element={<SmallClubPage />} />
                        <Route path="/clubs/:clubId" element={<DetailPage />} />
                        <Route path="/menu/detail/review_write" element={<ReviewWrite />} />
                        <Route path="/central/divisions" element={<BranchCentralPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/v1/auths/oauth/kakao" element={<KakaoRedirection />} />
                        <Route path="/menu/small_club/branch/branch_small" element={<BranchSmall />} />
                        <Route path="/hashtag" element={<HashTagPage />} />
                        <Route path="/menu/search" element={<Search />} />
                        <Route path="/summary" element={<SummaryPage />} />
                        <Route path="/menu/bookmark" element={<BookMarkPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}
        </>
    );
}
export default App;
