import React, { useEffect, useState } from "react";
import styles from "./editIntroduction.module.css";
import { customAxios } from "../../config/axios-config";
import { useNavigate } from "react-router-dom";

export default function EditIntroduction({
  introduction: initialIntroduction,
  instagram: initialInsta,
  imgUrl,
  leader: initialLeader,
  activity: initialActivity,
  room: initialRoom,
  college,
  department,
  division,
  clubName,
}) {
  const [cIntroduction, setcIntroduction] = useState(initialIntroduction);
  const [insta, setInsta] = useState(initialInsta);
  const [cLeader, setcLeader] = useState(initialLeader);
  const [cActivity, setcActivity] = useState(initialActivity);
  const [cRoom, setcRoom] = useState(initialRoom);

  const navigate = useNavigate(); // React Router의 useNavigate 훅 사용

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    setcIntroduction(initialIntroduction);
    setInsta(initialInsta);
    setcLeader(initialLeader);
    setcActivity(initialActivity);
    setcRoom(initialRoom);
  }, [accessToken]);

  const handleIntroductionChange = (e) =>
    setcIntroduction(e.target.value ? e.target.value : initialIntroduction);
  const handleInstagramChange = (e) =>
    setInsta(e.target.value ? e.target.value : initialInsta);
  const handleLeaderChange = (e) =>
    setcLeader(e.target.value ? e.target.value : initialLeader);
  const handleActivityChange = (e) =>
    setcActivity(e.target.value ? e.target.value : initialActivity);
  const handleRoomChange = (e) => {
    setcRoom(e.target.value ? e.target.value : initialRoom);
  };
  const handleKeyPress = (event) => {
    // 숫자만 입력 가능하도록 키 이벤트 필터링
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      alert("동아리실은 숫자만 입력할 수 있습니다.");
    }
  };

  const patchEditClub = async () => {
    try {
      const response = await customAxios.patch(
        `/v1/admins/change-page`,
        {
          imageUrl: imgUrl,
          introduction: cIntroduction ? cIntroduction : initialIntroduction,
          instagram: insta ? insta : initialInsta,
          activity: cActivity ? cActivity : initialActivity,
          leader: cLeader ? cLeader : initialLeader,
          room: cRoom ? cRoom : initialRoom,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 토큰 포함
          },
        }
      );
      console.log("res", response);
      window.alert("동아리글 수정이 완료되었습니다.");
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  // 저장 버튼 클릭 시 동작할 함수
  const handleSave = () => {
    console.log("Updated introduction:", cIntroduction);
    console.log("Updated leader:", cLeader);
    console.log("Updated activity:", cActivity);
    patchEditClub();
  };

  return (
    <>
      <div className={styles.detailBody}>
        <h3>{"<<INTRODUCTION>>"}</h3>
        <strong>{college === null ? "📌 소속분과" : "📌 단과대 / 학과"}</strong>
        <p>
          {college === null ? "중앙동아리" : college} /{" "}
          {department === null ? division : department}
        </p>
        <br />
        <strong>📌 소개</strong>
        <textarea
          value={cIntroduction}
          defaultValue={initialIntroduction}
          onChange={handleIntroductionChange}
          rows={5}
          cols={50}
          placeholder="동아리 소개를 입력하세요..."
        />
        <br />
        <strong>📌 인스타</strong>
        <textarea
          value={insta}
          defaultValue={initialInsta}
          onChange={handleInstagramChange}
          rows={5}
          cols={50}
          placeholder="동아리 인스타 URL을 입력하세요..."
        />
        <br />
        <strong>📌 대표 활동</strong>
        <textarea
          value={cActivity}
          defaultValue={initialActivity}
          onChange={handleActivityChange}
          rows={5}
          cols={50}
          placeholder="대표 활동을 입력하세요..."
        />
        <br />
        <strong>📌 동아리장</strong>
        <textarea
          type="text"
          value={cLeader}
          defaultValue={initialLeader}
          rows={5}
          cols={50}
          onChange={handleLeaderChange}
          placeholder="동아리장 이름을 입력하세요..."
        />
        <br />
        <strong>📌 동아리실 </strong>
        <textarea
          type="text"
          value={cRoom}
          defaultValue={initialRoom}
          onChange={handleRoomChange}
          onKeyPress={handleKeyPress}
          placeholder="동아리실을 입력하세요..."
          style={{ paddingBottom: "10px" }}
        />
        <div className={styles.ButtonDiv}>
          <button className={styles.CompleteButton} onClick={handleSave}>
            완료
          </button>
          <button
            className={styles.CancelButton}
            onClick={() => navigate("/admin")}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
}
