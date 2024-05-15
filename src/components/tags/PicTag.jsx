import './tag.css';

export default function PicTag() {
    return (
        <div className="tag_container">
            <img src="/main/pic_icon.png" alt="pic icon" className="tag_image" />
            <p className="tag_text"># 사진</p>
        </div>
    );
}
