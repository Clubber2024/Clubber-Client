import React, { useEffect, useState } from 'react';
import './editIntroduction.css';
import { customAxios } from '../../config/axios-config';
import { useNavigate } from 'react-router-dom';

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

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        setcIntroduction(initialIntroduction);
        setInsta(initialInsta);
        setcLeader(initialLeader);
        setcActivity(initialActivity);
        setcRoom(initialRoom);
    }, []);

    const handleIntroductionChange = (e) => setcIntroduction(e.target.value);
    const handleInstagramChange = (e) => setInsta(e.target.value);
    const handleLeaderChange = (e) => setcLeader(e.target.value);
    const handleActivityChange = (e) => setcActivity(e.target.value);
    const handleRoomChange = (e) => setcRoom(e.target.value);

    const patchEditClub = async () => {
        try {
            const response = await customAxios.patch(
                `/v1/admins/change-page`,
                {
                    imageUrl: imgUrl,
                    introduction: cIntroduction,
                    instagram: insta,
                    activity: cActivity,
                    leader: cLeader,
                    room: cRoom,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // 토큰 포함
                    },
                }
            );
            console.log('res', response);
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };

    // 저장 버튼 클릭 시 동작할 함수
    const handleSave = () => {
        console.log('Updated introduction:', cIntroduction);
        console.log('Updated leader:', cLeader);
        console.log('Updated activity:', cActivity);
        patchEditClub();
    };

    return (
        <>
            <div className="detail_body">
                <h3>{'<<INTRODUCTION>>'}</h3>
                <strong>{college === null ? '📌 소속분과' : '📌 단과대 / 학과'}</strong>
                <p>
                    {college === null ? '중앙동아리' : college} / {department === null ? division : department}
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
                    rows={5}
                    cols={50}
                    onChange={handleRoomChange}
                    placeholder="동아리실을 입력하세요..."
                />
                <div className="ButtonDiv">
                    <button className="CompleteButton" onClick={handleSave}>
                        완료
                    </button>
                    <button className="CancelButton" onClick={() => navigate('/admin')}>
                        취소
                    </button>
                </div>
            </div>
        </>
    );
}
