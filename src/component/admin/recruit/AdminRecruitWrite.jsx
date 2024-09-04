import styles from './AdminRecruitWrite.module.css';
import { customAxios } from '../../../config/axios-config';
import { useEffect, useState, useRef } from 'react';
import ConfirmModal from '../../modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminRecruitWrite() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const inputFileRef = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [presignedImages, setPresignedImages] = useState([]);
    // const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [modalMessage, setModalMessage] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
        // setModalMessage('모집글 작성이 완료되었습니다.');
        navigate(`/admin/recruit`);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // 파일 선택 핸들러
    const handleFileChange = async (event) => {
        const files = event.target.files;

        if (files.length > 10) {
            alert('최대 10장까지 업로드할 수 있습니다.');
            inputFileRef.current.value = ''; // 파일 선택 초기화
            return;
        }

        const imageFiles = Array.from(files);
        const imagePreviews = imageFiles.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages(imagePreviews); // 이미지 미리보기 URL을 상태에 저장

        const extension = imageFiles.map((file) => file.name.split('.').pop().toUpperCase());
        // 확장자 추출

        try {
            const { data } = await customAxios.post(
                '/v1/images/club/recruit',

                {
                    recruitImageExtensions: extension,
                },

                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    // params: {
                    //     recruitImageExtensions: [extension],
                    // },
                }
            );

            console.log(data);

            const imagePresigned = data.data.map((file) => {
                return file.imageUrl;
            });

            setPresignedImages(imagePresigned); // 이미지 미리보기 URL을 상태에 저장

            // 서버에서 받은 presigned URL을 사용하여 이미지 파일 업로드 (여기에 추가)

            // if(data&&data.)
            await Promise.all(
                data.data.map(async (fileData, index) => {
                    const file = imageFiles[index];

                    await axios.put(fileData.presignedUrl, file, {
                        headers: {
                            'Content-Type': file.type,
                        },
                    });
                })
            );
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
        }
        // 선택된 파일들을 처리하는 로직 추가
    };

    const handleSubmitButton = () => {
        postRecruitData();
    };

    const postRecruitData = async () => {
        try {
            const res = await customAxios.post(
                `/v1/admins/recruits`,
                {
                    title: title,
                    content: content,
                    imageUrl: presignedImages,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (res.data.success) {
                console.log(res.data);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    return (
        <>
            <div className={styles.write_header}>모집글 작성하기</div>
            <div className={styles.write_rectangle}>
                <p className={styles.write_title}>
                    제목 <p className={styles.write_title_sub}>(최대 100자)</p>
                </p>
                <div>
                    <input
                        type="text"
                        className={styles.write_title_input}
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="제목을 입력해주세요."
                    />
                    <p className={styles.write_title_font}>제목을 입력해주세요.</p>
                </div>
                <p className={styles.write_title}>
                    내용 <p className={styles.write_title_sub}>(최대 2000자)</p>
                </p>
                <div className={styles.write_content_rectangle}>
                    <textarea
                        type="text"
                        className={styles.write_content_input}
                        value={content}
                        onChange={handleContentChange}
                        placeholder={`동아리 모집글에 관련된 게시글만 작성하세요. \n위반 시 게시물 삭제 및 서비스 이용기간이 일정 기간 제한될 수 있습니다.`}
                    />
                </div>
                <p className={styles.write_title_font}>내용을 입력해주세요.</p>
                <p className={styles.write_title}>
                    사진 <p className={styles.write_title_sub}>(선택 / 최대 10장)</p>
                </p>
                <div className={styles.photo_div}>
                    <button className={styles.write_photo_button} onClick={() => inputFileRef.current.click()}>
                        <img src="/admin/photo.png" alt="photo" className={styles.write_photo} />
                    </button>
                    <input
                        type="file"
                        ref={inputFileRef}
                        className={styles.hidden_input}
                        accept="image/*"
                        multiple
                        onChange={handleFileChange} // 파일 선택 핸들러 연결
                    />
                    {/* 선택된 이미지 미리보기 */}
                    <div className={styles.image_preview_container}>
                        {selectedImages.map((src, index) => (
                            <img key={index} src={src} alt={`preview ${index}`} className={styles.image_preview} />
                        ))}
                    </div>
                </div>
                <button className={styles.write_upload_button} onClick={handleSubmitButton}>
                    업로드
                </button>
                <ConfirmModal
                    isOpen={isModalOpen}
                    message={'모집글 작성이 완료되었습니다.'}
                    onClose={closeModal}
                    onClickOk={closeModal}
                />
            </div>
        </>
    );
}
