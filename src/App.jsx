import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import MainPage from './pages/Main';
import CentralClubPage from './pages/CentralClub';
import SmallClubPage from './pages/SmallClub';
import DetailPage from './menu/detail';
import BranchCentral from './menu/central_club/branch/branchCentral';
import LoginPage from './menu/login';
import KakaoRedirection from './menu/login/component/kakaoRedirection';
import BranchSmall from './menu/small_club/branch/branch_small';
import BranchHashTag from './components/hashtag/branchHashtag';
import ReviewWrite from './menu/detail/review_write';
import Search from './menu/search/search';
import SummaryPage from './menu/summary';
import BookMarkPage from './menu/bookmark';

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
                        <Route path="/centralClub" element={<CentralClubPage />} />
                        {/* <Route path="/menu/central_club/detail_page/review_write" element={<ReviewWrite />} /> */}
                        <Route path="/SmallClub" element={<SmallClubPage />} />
                        <Route path="/menu/detail/:clubId" element={<DetailPage />} />
                        <Route path="/menu/detail/review_write" element={<ReviewWrite />} />
                        <Route path="/menu/central_club/branch/branchCentral" element={<BranchCentral />} />
                        <Route path="/menu/login" element={<LoginPage />} />
                        <Route path="/v1/auths/oauth/kakao" element={<KakaoRedirection />} />
                        <Route path="/menu/small_club/branch/branch_small" element={<BranchSmall />} />
                        <Route path="/components/hashtag/branchHashtag" element={<BranchHashTag />} />
                        <Route path="/menu/search" element={<Search />} />
                        <Route path="/menu/summary" element={<SummaryPage />} />
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
                        <Route path="/centralClub" element={<CentralClubPage />} />
                        <Route path="/SmallClub" element={<SmallClubPage />} />
                        <Route path="/menu/detail/:clubId" element={<DetailPage />} />
                        <Route path="/menu/detail/review_write" element={<ReviewWrite />} />
                        <Route path="/menu/central_club/branch/branchCentral" element={<BranchCentral />} />
                        <Route path="/menu/login" element={<LoginPage />} />
                        <Route path="/v1/auths/oauth/kakao" element={<KakaoRedirection />} />
                        <Route path="/menu/small_club/branch/branch_small" element={<BranchSmall />} />
                        <Route path="/components/hashtag/branchHashtag" element={<BranchHashTag />} />
                        <Route path="/menu/search" element={<Search />} />
                        <Route path="/menu/summary" element={<SummaryPage />} />
                        <Route path="/menu/bookmark" element={<BookMarkPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}
        </>
    );
}
export default App;
