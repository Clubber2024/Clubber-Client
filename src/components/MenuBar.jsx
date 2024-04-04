import "./menuBar.css";
import { Link } from "react-router-dom";

export default function MenuBar() {
    return (
        <>
            <div className="menu_container">
                <p className="tab_text_highlight">한눈에 보기</p>
                <div className="vertical_line"></div>
                <Link to="/menu/central_club" style={{textDecoration: "none"}}>
                    <p className="tab_text_central">중앙 동아리</p>
                </Link>
                <div className="small_club_container">
                    <p className="tab_text_small">단과대</p>
                    <img className="dropdown_btn" src="/buttons/dropdown_button.png" alt="dropdown button" />
                </div> 
            </div>
        </>
    )
}