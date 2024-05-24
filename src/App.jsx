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
import BranchSmall from './menu/small_club/branch/branch_small';

function App() {
    const isPc = useMediaQuery({
        query: '(min-width:769px)',
    });
<<<<<<< HEAD
    /*
        const isTablet = useMediaQuery({
        query: '(min-width:769px) and (max-width:1023px)',
    });
        */
=======
>>>>>>> 9c6abfef11de9401e218cbd2129e6aeb368baebd
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
                        <Route path="/menu/small_club/small_club" element={<SmallClub />} />
<<<<<<< HEAD
                        <Route path="/menu/small_club/detail_page/:clubId" element={<DetailPage />} />
                        <Route path="/menu/central_club/branch" element={<Branch />} />
=======
                        <Route path="/menu/small_club/detail_page/index" element={<DetailPage />} />
                        <Route path="/menu/central_club/branch/branchCentral" element={<BranchCentral />} />
>>>>>>> 9c6abfef11de9401e218cbd2129e6aeb368baebd
                        <Route path="/menu/login" element={<LoginPage />} />
                        <Route path="/menu/small_club/branch/branch_small" element={<BranchSmall />} />
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
                        <Route path="/menu/small_club/detail_page/index" element={<DetailPage />} />
                        <Route path="/menu/central_club/branch/branchCentral" element={<BranchCentral />} />
                        <Route path="/menu/login" element={<LoginPage />} />
                        <Route path="/menu/small_club/branch/branch_small" element={<BranchSmall />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
<<<<<<< HEAD

/*
{isTablet && (
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/menu/central_club" element={<CentralClubPage />} />
                        <Route path="/menu/small_club/small_club" element={<SmallClub />} />
                        <Route path="/menu/small_club/detail_page/index" element={<DetailPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}


                        <Route path="/menu/small_club/branch_small" element={<BranchSmall />} />
*/
=======
>>>>>>> 9c6abfef11de9401e218cbd2129e6aeb368baebd
