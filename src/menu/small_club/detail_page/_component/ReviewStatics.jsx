import { Link } from "react-router-dom";
import StaticBar from "./StaticBar";
import "./reviewTab.css";

export default function ReviewStatics() {
    return (
        <>
            <div className="statics_header">
                <h3>이런 점이 좋았어요!</h3>
                <Link to="/menu/small_club/detail_page/review_write" style={{textDecoration: "none"}}>
                    <button>
                        <img src="/buttons/write_review_icon.png" alt="write review"/>
                        리뷰쓰기
                    </button>
                </Link>
            </div>
            <StaticBar />
            <StaticBar />
            <StaticBar />
            <StaticBar />
            <StaticBar />
        </>
    )
}