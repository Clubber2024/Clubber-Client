import Header from "./layout/Header";
import MainPage from "./main";
import DetailPage from "./menu/small_club/detail_page";
import CentralClubPage from "./menu/central_club";
import ReviewWrite from "./menu/small_club/detail_page/review_write";
import Footer from "./layout/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path='/main' element={<DetailPage />} />
        <Route path='/menu/central_club' element={<CentralClubPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
