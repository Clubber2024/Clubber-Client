<<<<<<< HEAD
import MainPage from './main';
import BookMarkPage from './menu/bookmark';
import LoginPage from './menu/login';

function App() {
    return (
        <div>
            <BookMarkPage />
        </div>
    );
=======
import Header from "./layout/Header";
import MainPage from "./main";
import CentralClubPage from "./menu/central_club";
import Footer from "./layout/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path='/main' element={<MainPage />} />
        <Route path='/menu/central_club' element={<CentralClubPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
>>>>>>> ff0568d28901e9b8d0c9bac3ed830d41117fb38e
}
export default App;
