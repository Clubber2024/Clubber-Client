import { useEffect, useState } from 'react';
import { customAxios } from '../../config/axios-config';
import EditIntroduction from './EditIntroduction';
import styles from './editPage.module.css';
import axios from 'axios';

export default function EditPage() {
    const accessToken = localStorage.getItem('accessToken');
    const [club, setClub] = useState([]);
    const [clubId, setClubId] = useState();
    const [clubInfo, setClubInfo] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const baseLogoUrl = process.env.REACT_APP_BASE_LOGO_URL;

    // console.log('bb', baseLogoUrl);

    const getAdminClub = async () => {
        try {
            const response = await customAxios.get(`/v1/admins/mypage`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            //console.log(response.data.data);
            setClub(response.data.data);
            //console.log(response.data.data.clubInfo);
            setClubInfo(response.data.data.clubInfo);
            setImageUrl(response.data.data.imageUrl);
            const clubID = response.data.data.clubId;
            //console.log(clubID);
            const intClubID = parseInt(clubID);
            setClubId(clubID);
            return intClubID;
        } catch (error) {
            // console.log(error);
            return null;
        }
    };
    useEffect(() => {
        getAdminClub();
    }, []);
    //console.log(imageUrl);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return; // 파일이 없을 경우 처리 종료

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));

        const extension = file.name.split('.').pop().toUpperCase(); // 확장자 추출

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

            console.log(data.data);

            // 이미지 파일을 presigned URL로 업로드

            await axios.put(data.data.presignedUrl, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });
            setImageUrl(data.data.imageUrl.split('?')[0]);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    const deleteImage = async () => {
        if (!imageUrl) return;
        try {
            setImageUrl(baseLogoUrl);
            setImagePreview(baseLogoUrl);
        } catch (error) {
            console.error('이미지 삭제 실패:', error);
            alert('이미지 삭제에 실패했습니다.');
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
                        <div className={styles.admin_detail_header_name}>
                            <h3>{club.clubName}</h3>
                        </div>

                        <div className={styles.association_btn}>
                            <span>{club.college === null || club.college === '' ? '중앙동아리' : club.college}</span>
                            <span>|</span>
                            <span>{club.department || club.division}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.detail_tab}>
                    <button>소개</button>
                </div>

                <EditIntroduction
                    clubName={club.clubName}
                    college={club.college}
                    department={club.department}
                    division={club.division}
                    introduction={club.introduction}
                    imgUrl={imageUrl ? imageUrl : club.imageUrl}
                    instagram={club.instagram}
                    activity={clubInfo.activity}
                    leader={clubInfo.leader}
                    room={clubInfo.room}
                />
            </div>
        </div>
    );
}

{
    /* <button className={styles.logoButton} onClick={uploadImage}>
로고 업로드
</button> */
}
