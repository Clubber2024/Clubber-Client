import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
//하위디렉터리 경로 리스트//
import Header from './layout/Header';
import MainPage from './main';
import CentralClubPage from './menu/central_club';
import Footer from './layout/Footer';
import SmallClub from './menu/small_club/small_club';
import DetailPage from './menu/small_club/detail_page/index';
import LoginPage from './menu/login';
import Branch from './menu/central_club/branch';

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
        <div>
            {isPc && (
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/menu/central_club" element={<CentralClubPage />} />
                        <Route path="/menu/small_club/small_club" element={<SmallClub />} />
                        <Route path="/menu/small_club/detail_page/index" element={<DetailPage />} />
                        <Route path="/menu/login" element={<LoginPage />} />
                        <Route path="/menu/central_club/branch" element={<Branch />} />
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
                        <Route path="/menu/login" element={<LoginPage />} />
                        <Route path="/menu/central_club/branch" element={<Branch />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            )}
        </div>
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
