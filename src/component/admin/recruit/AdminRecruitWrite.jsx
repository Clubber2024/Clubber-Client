import styles from './AdminRecruitWrite.module.css';
import { customAxios } from '../../../config/axios-config';
import { useEffect, useState, useRef } from 'react';
import ConfirmModal from '../../modal/ConfirmModal';
import ErrorModal from '../../modal/ErrorModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminRecruitWrite() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const inputFileRef = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [presignedImages, setPresignedImages] = useState([]);
    // const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
        // setModalMessage('모집글 작성이 완료되었습니다.');
        navigate(`/admin/recruit`);
    };

    const errorCloseModal = () => {
        setIsErrorModalOpen(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // 파일 선택 핸들러
    const handleFileChange = async (event) => {
        if (selectedImages.length >= 10) {
            alert('최대 10장까지만 업로드할 수 있습니다.');
            event.preventDefault(); // 이벤트를 중지하여 더 이상 파일 선택을 처리하지 않음
            return; // 함수를 빠져나와 추가 로직 실행을 방지
        }
        const files = event.target.files;

        if (files.length > 10) {
            alert('최대 10장까지 업로드할 수 있습니다.');
            inputFileRef.current.value = ''; // 파일 선택 초기화
            return;
        }

        const newImageFiles = Array.from(files);
        const newImageURLs = newImageFiles.map((file) => URL.createObjectURL(file));
        console.log('url', newImageURLs);
        console.log('img', newImageFiles);
        setSelectedFiles((prevFiles) => {
            return [...prevFiles, ...newImageFiles];
        });
        setSelectedImages((prevImages) => {
            return [...prevImages, ...newImageURLs];
        });

        console.log('SS', selectedImages);

        // const extension = newImageFiles.map((file) => file.name.split('.').pop().toUpperCase());
        // 확장자 추출

        // try {
        //     const { data } = await customAxios.post(
        //         '/v1/images/club/recruit',

        //         {
        //             recruitImageExtensions: extension,
        //         },

        //         {
        //             headers: {
        //                 Authorization: Bearer ${accessToken},
        //                 'Content-Type': 'application/json',
        //             },
        //             // params: {
        //             //     recruitImageExtensions: [extension],
        //             // },
        //         }
        //     );

        //     console.log(data);

        //     const imagePresigned = data.data.map((file) => {
        //         return file.imageUrl;
        //     });

        //     setPresignedImages(imagePresigned); // 이미지 미리보기 URL을 상태에 저장
        // } catch (error) {
        //     console.error('이미지 업로드 실패:', error);
        // }
    };

    const handleRemoveImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    // console.log('img', selectedImages);

    const uploadImages = async () => {
        console.log('Ff', selectedFiles);
        const extensions = selectedFiles.flat().map((File) => File.name.split('.').pop().toUpperCase());

        try {
            const { data } = await customAxios.post(
                '/v1/images/club/recruit',
                { recruitImageExtensions: extensions },
                {
                    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
                }
            );

            console.log('data', data);

            await Promise.all(
                data.data.map(async (fileData, index) => {
                    const file = selectedFiles.flat()[index]; // 파일 가져오기
                    await axios.put(fileData.presignedUrl, file, {
                        headers: { 'Content-Type': file.type },
                    });
                })
            );
            return data.data.map((file) => file.key); // 업로드된 이미지 URL 반환
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            throw error;
        }
    };

    const handleSubmitButton = async () => {
        if (title === '') {
            setModalMessage('제목을 입력하세요.');
            setIsErrorModalOpen(true);
            return;
        } else if (title.length > 100) {
            setModalMessage('제목은 최대 100자까지 입력할 수 있습니다.');
            setIsErrorModalOpen(true);
            return;
        } else if (content == '') {
            setModalMessage('모집글을 입력하세요.');
            setIsErrorModalOpen(true);
            return;
        } else if (content.length > 2000) {
            setModalMessage('모집글은 최대 2000자까지 입력할 수 있습니다.');
            setIsErrorModalOpen(true);
            return;
        } else {
            try {
                const imageUrls = await uploadImages();
                const res = await customAxios.post(
                    `/v1/admins/recruits`,
                    {
                        title: title,
                        content: content,
                        imageUrl: imageUrls,
                    },
                    {
                        headers: {
                            Authorization: ` Bearer ${accessToken}`,
                        },
                    }
                );
                if (res.data.success) {
                    console.log(res.data);
                    setIsModalOpen(true);
                }
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
            }
            // postRecruitData();
        }
    };

    // const postRecruitData = async () => {
    //     try {
    //         const res = await customAxios.post(
    //             /v1/admins/recruits,
    //             {
    //                 title: title,
    //                 content: content,
    //                 imageUrl: presignedImages,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: Bearer ${accessToken},
    //                 },
    //             }
    //         );
    //         if (res.data.success) {
    //             console.log(res.data);
    //             setIsModalOpen(true);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data : ', error);
    //     }
    // };

    return (
        <>
            <div className={styles.write_header}>모집글 작성하기</div>
            <div className={styles.write_rectangle}>
                <p className={styles.write_title}>
                    제목 <p className={styles.write_title_sub}>(최대 100자)</p>
                </p>
                <div className={styles.write_backgroud}>
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
                <div className={styles.write_backgroud}>
                    <textarea
                        type="text"
                        className={styles.write_content_input}
                        value={content}
                        onChange={handleContentChange}
                        placeholder={
                            '동아리 모집글에 관련된 게시글만 작성하세요. \n위반 시 게시물 삭제 및 서비스 이용기간이 일정 기간 제한될 수 있습니다.'
                        }
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
                        {selectedImages > 10
                            ? alert('최대 10장까지 업로드 가능합니다.')
                            : selectedImages.map((src, index) => (
                                  <div key={index} className={styles.img_preview_div}>
                                      <img
                                          key={index}
                                          src={src}
                                          alt={`preview ${index}`}
                                          className={styles.image_preview}
                                      />
                                      <button onClick={() => handleRemoveImage(index)} className={styles.remove_button}>
                                          X
                                      </button>
                                  </div>
                              ))}
                    </div>
                </div>
                <ErrorModal isOpen={isErrorModalOpen} message={modalMessage} onClose={errorCloseModal} />
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
