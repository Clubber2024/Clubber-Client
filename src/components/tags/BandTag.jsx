import "./tag.css";

export default function BandTag() {
    return (
        <div className="tag_container">
            <img src="/main/band_icon.png" alt="band icon" width={48} height={45}/>
            <p className="tag_text"># 밴드</p>
        </div>
    )
}