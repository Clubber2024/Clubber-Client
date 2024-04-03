import "./tag.css";

export default function GameTag() {
    return (
        <div className="tag_container">
            <img src="/main/game_icon.png" alt="game icon" width={48} height={45}/>
            <p className="tag_text"># 게임</p>
        </div>
    )
}