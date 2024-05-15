import './mainNotice.css';

const noticeData = [
    {
        id: 1,
        title: "중앙 동아리 최신 정보 업데이트 안내",
        date: "2024.05.14"
    },
    {
        id: 2,
        title: "해시태그 기반 검색 오류 해결 안내",
        date: "2024.05.14"
    },
    {
        id: 3,
        title: "구글 로그인 기능 추가 완료 안내",
        date: "2024.05.14"
    },
    {
        id: 4,
        title: "해시태그 기반 검색 오류 해결 안내",
        date: "2024.05.14"
    },
    {
        id: 5,
        title: "카카오 로그인 하기실타 ~~!",
        date: "2024.05.14"
    }
]

export default function MainNotice() {
    // 메인 페이지에 보여줄 공지사항
    return (
        <div className="container">
            <div className="notice_index">공지사항</div>
            <div className="notice_container">
                {noticeData.map((item) => {
                    return (
                        <div key={item.id} className="div_notice">
                            <div>{item.title}</div>
                            <p>|</p>
                            <p>{item.date}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
