import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//하위 페이지
import Header from './layout/Header';
import Footer from './layout/Footer';
import MainPage from './main';
import CentralClub from './menu/central_club/central_club';
import SmallClub from './menu/small_club/small_club';
import DetailPage from './menu/small_club/detail_page/index';
import BranchCentral from './menu/central_club/branch/branchCentral';
import LoginPage from './menu/login';
import KakaoRedirection from './menu/login/component/kakaoRedirection';
import BranchSmall from './menu/small_club/branch/branch_small';
import BranchHashTag from './components/hashtag/component/branchHashtag';
import ReviewWrite from './menu/small_club/detail_page/review_write';

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
                        <Route path="/menu/central_club/central_club" element={<CentralClub />} />
                        {/* <Route path="/menu/central_club/detail_page/review_write" element={<ReviewWrite />} /> */}
                        <Route path="/menu/small_club/small_club" element={<SmallClub />} />
                        <Route path="/menu/small_club/detail_page/:clubId" element={<DetailPage />} />
                        <Route path="/menu/small_club/detail_page/review_write" element={<ReviewWrite />} />
                        <Route path="/menu/central_club/branch/branchCentral" element={<BranchCentral />} />
                        <Route path="/menu/login" element={<LoginPage />} />
                        <Route path="/v1/auths/oauth/kakao" element={<KakaoRedirection />} />
                        <Route path="/menu/small_club/branch/branch_small" element={<BranchSmall />} />
                        <Route path="/components/hashtag/component/branchHashtag" element={<BranchHashTag />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}

            {isMobile && (
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/menu/central_club/central_club" element={<CentralClub />} />
                        <Route path="/menu/small_club/small_club" element={<SmallClub />} />
                        <Route path="/menu/small_club/detail_page/:clubId" element={<DetailPage />} />
                        <Route path="/menu/small_club/detail_page/review_write" element={<ReviewWrite />} />
                        <Route path="/menu/central_club/branch/branchCentral" element={<BranchCentral />} />
                        <Route path="/menu/login" element={<LoginPage />} />
                        <Route path="/v1/auths/oauth/kakao" element={<KakaoRedirection />} />
                        <Route path="/menu/small_club/branch/branch_small" element={<BranchSmall />} />
                        <Route path="/components/hashtag/component/branchHashtag" element={<BranchHashTag />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
