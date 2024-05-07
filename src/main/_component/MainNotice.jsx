import './mainNotice.css';

export default function MainNotice() {
    // 메인 페이지에 보여줄 공지사항
    return (
        <>
            <div className="notice_container">
                <div className="div_notice">
                    <img src="../main/Ellipse.png" alt="Ellipse" className="img_notice" />
                    공지사항
                    <img src="../main/Ellipse.png" alt="Ellipse" className="img_notice" />
                </div>
            </div>
        </>
    );
}
