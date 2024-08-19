import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import MainPage from './pages/Main';
import CentralClubPage from './pages/CentralClub';
import SmallClubPage from './pages/SmallClub';
import DetailPage from './pages/DetailPage';
import ReviewWrite from './component/detail/review/ReviewWrite';
import LoginPage from './pages/LoginPage';
import KakaoRedirection from './component/login/kakaoRedirection';
import HashTagPage from './pages/HashTag';
import SearchPage from './pages/SearchPage';
import SummaryPage from './pages/Summary';
import BookMarkPage from './pages/BookMarkPage';
import BranchCentralPage from './pages/BranchCentral';
import BranchSmallPage from './pages/BranchSmall';
import ReviewComment from './component/detail/review/ReviewComment';
import MyReview from './component/mypage/review/MyReview';
import AdminPage from './pages/AdminPage';
import EditPage from './component/admin/EditPage';
import PendingList from './component/admin/pending/PendingList';
import Layout from './component/admin/component/Layout';
import ClubReviews from './component/admin/ClubReviews';
import NoticePage from './component/main/NoticePage';
import RecruitPage from './pages/RecruitPage';
import QnAPage from './pages/QnAPage';

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
                        <Route path="/notice" element={<NoticePage />}></Route>
                        <Route path="/central" element={<CentralClubPage />} />
                        {/* <Route path="/menu/central_club/detail_page/review_write" element={<ReviewWrite />} /> */}
                        <Route path="/small" element={<SmallClubPage />} />
                        <Route path="/clubs/:clubId" element={<DetailPage />} />
                        <Route path="/clubs/:clubId/review" element={<ReviewWrite />} />
                        <Route path="/clubs/:clubId/review/comment" element={<ReviewComment />} />
                        <Route path="/central/divisions" element={<BranchCentralPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/v1/auths/oauth/kakao" element={<KakaoRedirection />} />
                        <Route path="/small/colleges" element={<BranchSmallPage />} />
                        <Route path="/hashtag" element={<HashTagPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/summary" element={<SummaryPage />} />
                        <Route path="/bookmark" element={<BookMarkPage />} />
                        <Route path="/user/reviews" element={<MyReview />} />
                        <Route path="/recruit" element={<RecruitPage />} />

                        <Route path="/admin" element={<Layout />}>
                            <Route index element={<AdminPage />} />
                            <Route path="/admin/edit/:clubId" element={<EditPage />} />
                            <Route path="/admin/mypage/reviews" element={<ClubReviews />} />
                            <Route path="/admin/mypage/pending" element={<PendingList />} />
                        </Route>
                        <Route path="/qna" element={<QnAPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}

            {isMobile && (
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/notice" element={<NoticePage />}></Route>
                        <Route path="/central" element={<CentralClubPage />} />
                        <Route path="/small" element={<SmallClubPage />} />
                        <Route path="/clubs/:clubId" element={<DetailPage />} />
                        <Route path="/clubs/:clubId/review" element={<ReviewWrite />} />
                        <Route path="/clubs/:clubId/review/comment" element={<ReviewComment />} />
                        <Route path="/central/divisions" element={<BranchCentralPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/v1/auths/oauth/kakao" element={<KakaoRedirection />} />
                        <Route path="/small/colleges" element={<BranchSmallPage />} />
                        <Route path="/hashtag" element={<HashTagPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/summary" element={<SummaryPage />} />
                        <Route path="/bookmark" element={<BookMarkPage />} />
                        <Route path="/user/reviews" element={<MyReview />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/admin/edit/:clubId" element={<EditPage />} />
                        <Route path="/admin/mypage/reviews" element={<ClubReviews />} />
                        <Route path="/admin/mypage/pending" element={<PendingList />} />
                        <Route path="/recruit" element={<RecruitPage />} />
                    </Routes>
                    <Route path="/qna" element={<QnAPage />} />
                    <Footer />
                </BrowserRouter>
            )}
        </>
    );
}
export default App;
