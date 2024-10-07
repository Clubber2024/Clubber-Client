import React, { useEffect, useState } from 'react';
import styles from './editIntroduction.module.css';
import { customAxios } from '../../config/axios-config';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../modal/ErrorModal';

export default function EditIntroduction({
    introduction: initialIntroduction,
    instagram: initialInsta,
    imgUrl: initialImgUrl,
    leader: initialLeader,
    activity: initialActivity,
    room: initialRoom,
    college,
    department,
    division,
}) {
    const [cIntroduction, setcIntroduction] = useState(initialIntroduction);
    const [insta, setInsta] = useState(initialInsta);
    const [cLeader, setcLeader] = useState(initialLeader);
    const [cActivity, setcActivity] = useState(initialActivity);
    const [cRoom, setcRoom] = useState(initialRoom);
    const [img, setimg] = useState(initialImgUrl);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setcIntroduction(initialIntroduction);
        setInsta(initialInsta);
        setcLeader(initialLeader);
        setcActivity(initialActivity);
        setcRoom(initialRoom);
    }, []);
    // console.log('II', initialImgUrl);

    const handleIntroductionChange = (e) => setcIntroduction(e.target.value);
    const handleInstagramChange = (e) => setInsta(e.target.value);
    const handleLeaderChange = (e) => setcLeader(e.target.value);
    const handleActivityChange = (e) => setcActivity(e.target.value);
    const handleRoomChange = (e) => {
        setcRoom(e.target.value);
    };
    const handleKeyPress = (event) => {
        // 숫자만 입력 가능하도록 키 이벤트 필터링
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            alert('동아리실은 숫자만 입력할 수 있습니다.');
        }
    };

    const patchEditClub = async () => {
        try {
            console.log('img', img);
            const response = await customAxios.patch(
                `/v1/admins/change-page`,
                {
                    imageUrl: initialImgUrl || '',
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
            window.alert('동아리글 수정이 완료되었습니다.');
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };

    // 저장 버튼 클릭 시 동작할 함수
    const handleSave = () => {
        // console.log('Updated introduction:', cIntroduction);
        // console.log('Updated leader:', cLeader);
        // console.log('Updated activity:', cActivity);
        if (cActivity.length > 1500) {
            setIsModalOpen(true);
            setModalMessage('대표활동은 최대 1500자까지 작성 가능합니다.');
        } else {
            patchEditClub();
        }
    };

    return (
        <>
            <div className={styles.detailBody}>
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
                    placeholder=" 동아리 소개를 입력하세요."
                />
                <br />
                <strong>📌 인스타</strong>
                <textarea
                    value={insta}
                    defaultValue={initialInsta}
                    onChange={handleInstagramChange}
                    rows={5}
                    cols={50}
                    placeholder=" 동아리 인스타 URL을 입력하세요."
                />
                <br />
                <strong>📌 대표 활동</strong>
                <textarea
                    value={cActivity}
                    defaultValue={initialActivity}
                    onChange={handleActivityChange}
                    rows={5}
                    cols={50}
                    placeholder=" 대표 활동을 입력하세요.
										(최대 1500자)"
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
                    placeholder=" 동아리장 이름을 입력하세요."
                />
                <br />
                <strong>📌 동아리실 </strong>
                <textarea
                    type="text"
                    value={cRoom}
                    defaultValue={initialRoom}
                    onChange={handleRoomChange}
                    onKeyPress={handleKeyPress}
                    placeholder=" 동아리실을 입력하세요."
                    style={{ paddingBottom: '10px' }}
                />

                <div className={styles.ButtonDiv}>
                    <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
                    <button className={styles.CompleteButton} onClick={handleSave}>
                        완료
                    </button>
                    <button className={styles.CancelButton} onClick={() => navigate('/admin/mypage')}>
                        취소
                    </button>
                </div>
            </div>
        </>
    );
}
