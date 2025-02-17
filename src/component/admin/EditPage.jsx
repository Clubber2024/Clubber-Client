import { useEffect, useState } from 'react';
import { customAxios } from '../../config/axios-config';
import styles from './editPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../modal/ErrorModal';
import ConfirmModal from '../modal/ConfirmModal';

export default function EditPage() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const baseLogoUrl = process.env.REACT_APP_BASE_LOGO_URL;
    const [club, setClub] = useState([]);
    const [clubId, setClubId] = useState();
    const [clubInfo, setClubInfo] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [extension, setExtension] = useState('');
    const [imgType, setImageType] = useState('0');
    const [introCount, setIntroCount] = useState(0);
    const [actiCount, setActiCount] = useState(0);
    //->이미지 파일 선택 시 imaType=1, 로고 삭제 시, imgType=2, 미변경시 imgType=0

    // console.log('bb', baseLogoUrl);
    const closeModal = () => {
        setIsModalOpen(false);
        navigate(`/admin/mypage`);
    };

    const handleIntroductionChange = (e) => {
        setClub((prevState) => ({
            ...prevState,
            introduction: e.target.value,
        }));
        setIntroCount(e.target.value.length);
    };
    const handleInstagramChange = (e) => {
        setClubInfo((prevState) => ({
            ...prevState,
            instagram: e.target.value,
        }));
    };

    const handleLeaderChange = (e) => {
        setClubInfo((prevState) => ({
            ...prevState,
            leader: e.target.value,
        }));
    };

    const handleActivityChange = (e) => {
        setClubInfo((prevState) => ({
            ...prevState,
            activity: e.target.value,
        }));
        setActiCount(e.target.value.length);
    };

    const handleRoomChange = (e) => {
        setClubInfo((prevState) => ({
            ...prevState,
            room: e.target.value,
        }));
    };
    const handleKeyPress = (event) => {
        // 숫자만 입력 가능하도록 키 이벤트 필터링
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            alert('동아리실은 숫자만 입력할 수 있습니다.');
        }
    };

    const getAdminClub = async () => {
        try {
            const response = await customAxios.get(`/v1/admins/mypage`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('setClub', response.data.data);

            setClub(response.data.data);
            setIntroCount(response.data.data.introduction.length);
            setClubInfo(response.data.data.clubInfo);
            // setActiCount(response.data.data.clubInfo.activity.length);
            setImageUrl(response.data.data.imageUrl);
            console.log('imageurl', imageUrl);
            const clubID = response.data.data.clubId;
            const intClubID = parseInt(clubID);
            setClubId(clubID);
            return intClubID;
        } catch (error) {
            return null;
        }
    };
    useEffect(() => {
        getAdminClub();
    }, []);
    console.log('img', imageUrl);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return; // 파일이 없을 경우 처리 종료
        setImageType('1');
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setExtension(file.name.split('.').pop().toUpperCase()); // 확장자 추출
    };
    console.log('ima', imageUrl);

    const deleteImage = async () => {
        if (!imageUrl) return;
        try {
            setImageType('2');
            setImageUrl(`common/logo/soongsil_default.png `);
            setImagePreview(`https://image.ssuclubber.com/common/logo/soongsil_default.png `);
        } catch (error) {
            console.error('이미지 삭제 실패:', error);
            alert('이미지 삭제에 실패했습니다.');
        }
    };

    // 저장 버튼 클릭 시 동작할 함수
    const handleSave = async () => {
        if (clubInfo?.activity?.length > 1500) {
            setIsErrorModalOpen(true);
            setModalMessage("'📌 대표활동 ' 은 최대 1500자까지 작성 가능합니다.");
        } else if (club?.introduction?.length > 100) {
            setIsErrorModalOpen(true);
            setModalMessage("'📌 소개 ' 는 최대 100자까지 작성 가능합니다. ");
        } else {
            if (imgType === '1') {
                try {
                    // presigned URL을 가져오는 API 호출

                    const { data } = await customAxios.post(
                        '/v1/images/club/logo',
                        {
                            imageFileExtension: extension,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            params: {
                                imageFileExtension: extension,
                            },
                        }
                    );

                    console.log('presignedUrl', data);

                    // 이미지 파일을 presigned URL로 업로드
                    await axios.put(data.data.presignedUrl, imageFile, {
                        headers: {
                            'Content-Type': imageFile.type,
                        },
                    });
                    patchEditClub(data.data.imageKey);
                    setImageUrl(data.data.imageKey);
                    console.log('imagefile', imageUrl);
                } catch (error) {
                    console.error('이미지 업로드 실패:', error);
                    alert('이미지 업로드에 실패했습니다.');
                }
            } else {
                patchEditClub(imageUrl);
            }
        }
    };

    const patchEditClub = async (imageUrl) => {
        try {
            const response = await customAxios.patch(
                `/v1/admins/change-page`,
                {
                    imageKey: imageUrl,
                    introduction: club.introduction,
                    instagram: clubInfo.instagram,
                    activity: clubInfo.activity,
                    leader: clubInfo.leader,
                    room: clubInfo.room,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // 토큰 포함
                    },
                }
            );
            console.log('res', response);
            setIsModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.DivMyPage}>
            <div className={styles.admin_detail_container}>
                <div className={styles.admin_detail_header}>
                    <br />
                    {
                        <>
                            <div className={styles.logoDiv}>
                                <img
                                    src={imagePreview ? imagePreview : club.imageUrl}
                                    alt="Uploaded"
                                    className={styles.admin_detail_logo}
                                />
                                <div className={styles.logoButtonDiv}>
                                    <button className={styles.logoButton} onClick={deleteImage}>
                                        로고 삭제
                                    </button>

                                    <label className={styles.fileUpload}>
                                        <input
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={handleFileChange}
                                            className={styles.edit_input}
                                        />
                                    </label>
                                </div>
                            </div>
                        </>
                    }

                    <div className={styles.admin_detail_header_container}>
                        <div className={styles.admin_detail_header_name}>{club.clubName}</div>

                        <div className={styles.association_btn}>
                            <span>{club.clubType === '해당 없음' ? club.college : club.clubType}</span>
                            <span>|</span>
                            <span>{club.clubType === '중앙동아리' ? club.division : club.department}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.detail_tab}>
                    <button>소개</button>
                </div>

                <div className={styles.detailBody}>
                    <h3>{'<<INTRODUCTION>>'}</h3>
                    <strong>{club.college === null ? '📌 소속분과' : '📌 단과대 / 학과'}</strong>
                    <p>
                        {club.college === null ? '중앙동아리' : club.college} /{' '}
                        {club.department === null ? club.division : club.department}
                    </p>
                    <br />
                    <strong>📌 소개 ({introCount}/100)</strong>

                    <textarea
                        value={club.introduction}
                        defaultValue={club.introduction}
                        onChange={handleIntroductionChange}
                        rows={5}
                        cols={50}
                        placeholder=" 동아리 소개를 입력하세요."
                    />
                    <br />
                    <strong>📌 인스타</strong>
                    <textarea
                        value={clubInfo.instagram}
                        defaultValue={clubInfo.instatram}
                        onChange={handleInstagramChange}
                        rows={5}
                        cols={50}
                        placeholder=" 동아리 인스타 URL을 입력하세요."
                    />
                    <br />
                    <strong>📌 대표 활동 ({actiCount}/1500)</strong>
                    <textarea
                        value={clubInfo.activity}
                        defaultValue={clubInfo.activity}
                        onChange={handleActivityChange}
                        rows={5}
                        cols={50}
                        placeholder=" 대표 활동을 입력하세요."
                    />
                    <br />
                    <strong>📌 동아리장</strong>
                    <textarea
                        type="text"
                        value={clubInfo.leader}
                        defaultValue={clubInfo.leader}
                        rows={5}
                        cols={50}
                        onChange={handleLeaderChange}
                        placeholder=" 동아리장 이름을 입력하세요."
                    />
                    <br />
                    <strong>📌 동아리실 </strong>
                    <textarea
                        type="text"
                        value={clubInfo.room}
                        defaultValue={clubInfo.room}
                        onChange={handleRoomChange}
                        onKeyPress={handleKeyPress}
                        placeholder=" 동아리실을 입력하세요."
                        style={{ paddingBottom: '10px' }}
                    />

                    <div className={styles.ButtonDiv}>
                        <ErrorModal
                            isOpen={isErrorModalOpen}
                            message={modalMessage}
                            onClose={() => setIsErrorModalOpen(false)}
                        />

                        <ConfirmModal
                            isOpen={isModalOpen}
                            message={'동아리 정보 수정이 완료되었습니다.'}
                            onClose={closeModal}
                            onClickOk={closeModal}
                        />

                        <button className={styles.CompleteButton} onClick={handleSave}>
                            완료
                        </button>
                        <button className={styles.CancelButton} onClick={() => navigate('/admin/mypage')}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
