import BandTag from "./tags/BandTag";
import GameTag from "./tags/GameTag";
import PicTag from "./tags/PicTag";
import "./tagScroll.css";

export default function TagScroll() {
    return (
        <div className="wrapper">
            <div className="tags_wrapper">
                <BandTag />
                <GameTag />
                <PicTag />
                <BandTag />
                <GameTag />
                <PicTag />
                <BandTag />
                <GameTag />
                <PicTag />
                <BandTag />
                <GameTag />
                <PicTag />
                <BandTag />
                <GameTag />
                <PicTag />
            </div>
        </div>
    )
}