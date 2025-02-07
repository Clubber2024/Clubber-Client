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
import EditPage from './component/admin/EditPage';
import PendingList from './component/admin/pending/PendingList';
import ClubReviews from './component/admin/ClubReviews';
import RecruitPage from './pages/RecruitPage';
import QnAPage from './pages/QnAPage';
import NoticeList from './component/main/NoticeList';
import NoticePage from './pages/NoticePage';
import AdminPage from './pages/AdminPage';
import MyPage from './component/mypage/MyPage';
import AdminRecruitList from './component/admin/recruit/AdminRecruitList';
import RecruitContent from './component/recruit/RecruitContent';
import ModifyPassword from './component/mypage/ModifyPassword';
import AdminRecruitWrite from './component/admin/recruit/AdminRecruitWrite';
import DetailRecruitList from './component/recruit/DetailRecruitList';
import AdminRecruitContent from './component/admin/recruit/AdminRecruitContent';
import { minHeight } from '@mui/system';
import { Padding } from '@mui/icons-material';

function App() {
    const appStyle = {
        backgroundColor: '#f9f9f9',
        margin: 0,
        padding: 0,
    };

    const wrapper = {
        height: 'auto',
        minHeight: '100%',
        paddingBottom: '110px',
    };

    const isPc = useMediaQuery({
        query: '(min-width:769px)',
    });
    const isMobile = useMediaQuery({
        query: '(max-width:769px)',
    });

    return (
        <div style={appStyle}>
            {isPc && (
                <BrowserRouter>
                    <div style={wrapper}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/notices" element={<NoticeList />} />
                            <Route path="/notices/:noticeId" element={<NoticePage />} />
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
                            <Route path="/user" element={<MyPage />} />
                            <Route path="/user/bookmark" element={<BookMarkPage />} />
                            <Route path="/user/reviews" element={<MyReview />} />
                            <Route path="/recruit" element={<RecruitPage />} />
                            <Route path="/recruit/:recruitId" element={<RecruitContent />} />
                            <Route path="/recruit/club/:clubId" element={<DetailRecruitList />} />

                            <Route path="/qna" element={<QnAPage />} />

                            <Route path="/admin" element={<MyPage />} />
                            <Route path="/admin/mypage" element={<AdminPage />} />
                            <Route path="/admin/edit/:clubId" element={<EditPage />} />
                            <Route path="/admin/mypage/reviews" element={<ClubReviews />} />
                            <Route path="/admin/mypage/pending" element={<PendingList />} />
                            <Route path="/admin/recruit" element={<AdminRecruitList />} />
                            <Route path="/admin/recruit/edit" element={<AdminRecruitWrite />} />
                            <Route path="/admin/recruit/:recruitId" element={<AdminRecruitContent />} />
                            <Route path="/admin/password" element={<ModifyPassword />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            )}

            {isMobile && (
                <BrowserRouter>
                    <div style={wrapper}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/notices" element={<NoticeList />} />
                            <Route path="/notices/:noticeId" element={<NoticePage />} />
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
                            <Route path="/user" element={<MyPage />} />
                            <Route path="/user/bookmark" element={<BookMarkPage />} />
                            <Route path="/user/reviews" element={<MyReview />} />
                            <Route path="/qna" element={<QnAPage />} />
                            <Route path="/recruit" element={<RecruitPage />} />
                            <Route path="/recruit/:recruitId" element={<RecruitContent />} />
                            <Route path="/recruit/club/:clubId" element={<DetailRecruitList />} />

                            <Route path="/admin" element={<MyPage />} />
                            <Route path="/admin/mypage" element={<AdminPage />} />
                            <Route path="/admin/edit/:clubId" element={<EditPage />} />
                            <Route path="/admin/mypage/reviews" element={<ClubReviews />} />
                            <Route path="/admin/mypage/pending" element={<PendingList />} />

                            <Route path="/admin/recruit" element={<AdminRecruitList />} />
                            <Route path="/admin/recruit/edit" element={<AdminRecruitWrite />} />
                            <Route path="/admin/recruit/:recruitId" element={<AdminRecruitContent />} />
                            <Route path="/admin/password" element={<ModifyPassword />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            )}
        </div>
    );
}
export default App;
