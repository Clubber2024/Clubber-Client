import Header from './layout/Header';
import MainPage from './main';
import CentralClubPage from './menu/central_club';
import Footer from './layout/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReviewPage from './menu/review';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <ReviewPage />
                <Routes>
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/menu/central_club" element={<CentralClubPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}
export default App;
