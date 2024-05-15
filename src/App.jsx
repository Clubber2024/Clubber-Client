import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//하위 페이지
import Header from './layout/Header';
import Footer from './layout/Footer';
import MainPage from './main';
import CentralClubPage from './menu/central_club';
import SmallClub from './menu/small_club/small_club';
import DetailPage from './menu/small_club/detail_page/index';
import Branch from './menu/central_club/branch';
import LoginPage from './menu/login';

function App() {
    const isPc = useMediaQuery({
        query: '(min-width:769px)',
    });
    /*
		const isTablet = useMediaQuery({
        query: '(min-width:769px) and (max-width:1023px)',
    });
		*/
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
                        <Route path="/menu/central_club" element={<CentralClubPage />} />
                        <Route path="/menu/small_club/small_club" element={<SmallClub />} />
                        <Route path="/menu/small_club/detail_page/index" element={<DetailPage />} />
                        <Route path="/menu/central_club/branch" element={<Branch />} />
                        <Route path="/menu/login" element={<LoginPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}

            {isMobile && (
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/menu/central_club" element={<CentralClubPage />} />
                        <Route path="/menu/small_club/small_club" element={<SmallClub />} />
                        <Route path="/menu/small_club/detail_page/index" element={<DetailPage />} />
                        <Route path="/menu/central_club/branch" element={<Branch />} />
                        <Route path="/menu/login" element={<LoginPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}
        </>
    );
}

export default App;

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
*/
