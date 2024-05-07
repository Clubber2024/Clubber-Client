import Header from './layout/Header';
import MainPage from './main';
import CentralClubPage from './menu/central_club';
import Footer from './layout/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SmallClubIT from './menu/small_club/small_club_IT';
import DetailPage from './menu/small_club/detail_page/index';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/menu/central_club" element={<CentralClubPage />} />
                <Route path="/menu/small_club/small_club_IT" element={<SmallClubIT />} />
                <Route path="/menu/small_club/detail_page/index" element={<DetailPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default App;
