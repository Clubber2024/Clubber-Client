import "./tag.css";

export default function PicTag() {
    return (
        <div className="tag_container">
            <img src="/main/pic_icon.png" alt="pic icon" width={48} height={45}/>
            <p className="tag_text"># 사진</p>
        </div>
    )
}