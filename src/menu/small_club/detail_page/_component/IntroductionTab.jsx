export default function IntroductionTab({ clubName, college, department, introduction, instagram, imgUrl }) {
    return (
        <>
            <div className="detail_body">
                <img className="detail_image" src="/detail/detail_image.png" alt="club detail image" />
                <h3>{clubName}을 소개합니다 !</h3>
                {/* 타이틀이랑 내용이랑 css 차이를 어떻게 주면 좋을지 ? */}
                <strong>📌 단과대 / 학과</strong>
                <p>{college} / {department}</p>
                <p>📌 소모임 소개</p>
                <p>{introduction}</p>
                <p>📌 소모임 인스타</p>
                <p>{instagram}</p>
            </div>
        </>
    )
}