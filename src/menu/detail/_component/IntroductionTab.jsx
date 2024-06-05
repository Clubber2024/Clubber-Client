export default function IntroductionTab({
    clubName,
    college,
    department,
    introduction,
    instagram,
    imgUrl,
    leader,
    activity,
    room,
}) {
    return (
        <>
            <div className="detail_body">
                <h3>{clubName}을 소개합니다 !</h3>
                {/* 타이틀이랑 내용이랑 css 차이를 어떻게 주면 좋을지 ? */}
                <strong>📌 단과대 / 학과</strong>
                <p>
                    {college} / {department}
                </p>
                <br></br>
                <strong>📌 소모임 소개</strong>
                <p>{introduction}</p>
                <br></br>
                <strong>📌 소모임 인스타</strong>
                <p>{instagram}</p>
                <br></br>
                <strong>📌 소모임 활동</strong>
                <p>{activity}</p>
                <br></br>
                <strong>📌 소모임장</strong>
                <p>{leader}</p>
                <br></br>
                <strong>📌 소모임실</strong>
                <p>{room}</p>
            </div>
        </>
    );
}
/*
<img className="detail_image" src={imgUrl} alt="club detail image" />
*/
