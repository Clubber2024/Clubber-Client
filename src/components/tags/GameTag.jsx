import './tag.css';

export default function GameTag() {
    return (
        <div className="tag_container">
            <img src="/main/game_icon.png" alt="game icon" className="tag_image" />
            <p className="tag_text"># 게임</p>
        </div>
    );
}
