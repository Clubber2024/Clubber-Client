import styles from './AdminRecruitWrite.module.css';
import { customAxios } from '../../../config/axios-config';
import React, { useEffect, useState, useRef } from 'react';
import ConfirmModal from '../../modal/ConfirmModal';
import ErrorModal from '../../modal/ErrorModal';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminRecruitWrite() {
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken = localStorage.getItem('accessToken');
    const inputFileRef = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [everyTimeUrl, setEveryTimeUrl] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [titleCount, setTitleCount] = useState(0);
    const [contentCount, setContentCount] = useState(0);
    //모집글 수정인 경우로 넘어올 때 recruitId 존재
    //그냥 모집글 작성인 경우는 recruitId 존재x
    const recruitId = location.state?.recruitId;
    //삭제할 파일들을 저장
    const [deletedFiles, setDeletedFiles] = useState([]);
    // 새로 추가된 파일들을 저장
    const [newAddedFiles, setNewAddedFiles] = useState([]);
    // 새로 추가된 이미지 URL들을 저장
    const [newAddedImages, setNewAddedImages] = useState([]);
    // (삭제x, 추가x)기존 이미지들을 저장
    const [remainedImages, setRemainedImages] = useState([]);
    //
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    //모집글 수정 시 데이터 get
    const getRecruitData = async () => {
        try {
            const res = await customAxios.get(`/v1/admins/recruits/${recruitId}`);
            if (res.data.success) {
                // console.log('edit content', res.data);
                setTitle(res.data.data.title);
                setTitleCount(res.data.data.title.length);
                setContent(res.data.data.content);
                setContentCount(res.data.data.content.length);
                setSelectedImages(res.data.data.imageUrls);
                setRemainedImages(res.data.data.imageUrls);
                setEveryTimeUrl(res.data.data.everyTimeUrl);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (recruitId) {
            getRecruitData();
        }
    }, []);
    console.log('Selected Images', remainedImages);

    const closeModal = () => {
        setIsModalOpen(false);
        navigate(`/admin/recruit`);
    };

    const errorCloseModal = () => {
        setIsErrorModalOpen(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setTitleCount(e.target.value.length);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        setContentCount(e.target.value.length);
    };

    const handleEveryTimeUrlChange = (e) => {
        setEveryTimeUrl(e.target.value);
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

        //모집글 수정 시
        if (recruitId) {
            // 새로 추가된 파일과 이미지 URL 상태 업데이트
            setRemainedImages(selectedImages);

            setNewAddedFiles(newImageFiles);
            setNewAddedImages(newImageURLs);
        }

        setSelectedFiles((prevFiles) => {
            return [...prevFiles, ...newImageFiles];
        });
        setSelectedImages((prevImages) => {
            return [...prevImages, ...newImageURLs];
        });
    };

    const handleRemoveImage = (index) => {
        setSelectedImages((prevImages) => {
            const imageToDelete = prevImages[index]; // 삭제될 이미지 찾음
            //모집글 수정 시
            if (recruitId) {
                // deletedFiles 배열에 삭제될 이미지 추가
                setDeletedFiles((prevDeletedFiles) => [...prevDeletedFiles, imageToDelete]);
            }

            // 필터를 사용하여 선택된 이미지 목록에서 해당 이미지를 제거
            const updatedImages = prevImages.filter((_, i) => i !== index);

            //모집글 수정 시
            if (recruitId) {
                // 남은 이미지들을 remainingImages 상태에 저장
                setRemainedImages(updatedImages);
            }

            // 필터를 사용하여 선택된 이미지 목록에서 해당 이미지를 제거
            return updatedImages;
        });
    };

    // console.log('Ss', selectedImages);

    const uploadImages = async () => {
        //선택된 파일 배열 확정
        const filesToUpload = recruitId ? newAddedFiles.flat() : selectedFiles.flat();

        // 파일 확장자 추출
        const extensions = filesToUpload.map((file) => file.name.split('.').pop().toUpperCase());

        try {
            const { data } = await customAxios.post(
                '/v1/images/club/recruit',
                { recruitImageExtensions: extensions },
                {
                    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
                }
            );

            await Promise.all(
                data.data.map(async (fileData, index) => {
                    // 파일 가져오기
                    const file = selectedFiles.flat()[index];
                    await axios.put(fileData.presignedUrl, file, {
                        headers: { 'Content-Type': file.type },
                    });
                })
            );
            // 업로드된 이미지 URL 반환
            return data.data.map((file) => file.imageKey);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            throw error;
        }
    };

    //이미지 드래그 기능
    const onOpenImageLightBox = (index) => {
        setCurrentImageIndex(index);
        setIsLightBoxOpen(true);
    };

    const onCloseLightBox = () => {
        setIsLightBoxOpen(false);
    };

    const onDragStart = (e, id) => {
        e.dataTransfer.effectAllowd = 'move';
        e.dataTransfer.setData('imgIndex', String(id));
    };

    const onDragDrop = (e, index) => {
        e.preventDefault();

        const sourceIndex = Number(e.dataTransfer.getData('imgIndex'));
        if (sourceIndex === index) return;
        const updateImages = [...selectedImages];
        const [movedImage] = updateImages.splice(sourceIndex, 1);

        updateImages.splice(index, 0, movedImage);
        setSelectedImages(updateImages);
        setRemainedImages(updateImages);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    //

    const handleSubmitButton = async () => {
        if (title === '' || !title.trim()) {
            setModalMessage('제목을 입력하세요.');
            setIsErrorModalOpen(true);
            return;
        } else if (title.length > 100) {
            setModalMessage('제목은 최대 100자까지 입력할 수 있습니다.');
            setIsErrorModalOpen(true);
            return;
        } else if (content == '' || !content.trim()) {
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

                console.log(
                    'title:',
                    title,
                    'content:',
                    content,
                    'deletedImageUrls:',
                    deletedFiles,
                    'newImageKeys:',
                    imageUrls,
                    'remainImageUrls:',
                    remainedImages
                );
                if (recruitId) {
                    const combinedImages = [...remainedImages, ...imageUrls];
                    console.log('imageurls', imageUrls);
                    const res = await customAxios.patch(
                        `/v1/admins/recruits/${recruitId}`,
                        {
                            title: title,
                            content: content,
                            everyTimeUrl: everyTimeUrl,
                            deletedImageUrls: deletedFiles,
                            newImageKeys: imageUrls,
                            remainImageUrls: remainedImages ? remainedImages : selectedImages,
                            images: combinedImages,
                        },
                        {
                            headers: {
                                Authorization: ` Bearer ${accessToken}`,
                            },
                        }
                    );
                    if (res.data.success) {
                        setIsModalOpen(true);
                    }
                } else {
                    const res = await customAxios.post(
                        `/v1/admins/recruits`,
                        {
                            title: title,
                            content: content,
                            everyTimeUrl: everyTimeUrl,
                            imageKey: imageUrls,
                        },
                        {
                            headers: {
                                Authorization: ` Bearer ${accessToken}`,
                            },
                        }
                    );
                    if (res.data.success) {
                        setIsModalOpen(true);
                    }
                }
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
            }
        }
    };

    return (
        <>
            <div className={styles.write_header}>모집글 작성하기</div>
            <div className={styles.write_rectangle}>
                <p className={styles.write_title}>
                    제목 <p className={styles.write_title_sub}>({titleCount}/100)</p>
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
                    에브리타임 URL
                    {/* <p className={styles.write_title_sub}>({titleCount}/100)	</p> */}
                </p>
                <div className={styles.write_backgroud}>
                    <input
                        type="text"
                        className={styles.write_title_input}
                        value={everyTimeUrl}
                        onChange={handleEveryTimeUrlChange}
                        placeholder="주소를 입력해주세요."
                    />
                    <p className={styles.write_title_font}>주소를 입력해주세요.</p>
                </div>

                <p className={styles.write_title}>
                    내용 <p className={styles.write_title_sub}>({contentCount}/2000)</p>
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
                    <div className={styles.image_preview_container}>
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

                        {selectedImages > 10
                            ? alert('최대 10장까지 업로드 가능합니다.')
                            : selectedImages.map((src, index) => (
                                  <div key={index} className={styles.img_preview_div}>
                                      <button
                                          onClick={() => onOpenImageLightBox(index)}
                                          onDragOver={onDragOver}
                                          onDrop={(e) => onDragDrop(e, index)}
                                          className={styles.draggable}
                                      >
                                          <img
                                              key={index}
                                              src={src}
                                              alt={`preview ${index}`}
                                              draggable
                                              onDragStart={(e) => onDragStart(e, index)}
                                              onDragOver={onDragOver}
                                              onDrop={(e) => onDragDrop(e, index)}
                                              className={styles.draggable_img}
                                              // className={styles.image_preview}
                                          />

                                          <button
                                              onClick={() => handleRemoveImage(index)}
                                              className={styles.remove_button}
                                          >
                                              X
                                          </button>
                                      </button>
                                  </div>
                              ))}
                    </div>
                </div>
                <ErrorModal isOpen={isErrorModalOpen} message={modalMessage} onClose={errorCloseModal} />
                <button className={styles.write_upload_button} onClick={handleSubmitButton}>
                    업로드
                </button>
                {isModalOpen && (
                    <ConfirmModal
                        isOpen={isModalOpen}
                        message={'모집글 작성이 완료되었습니다.'}
                        onClose={closeModal}
                        onClickOk={closeModal}
                    />
                )}
            </div>
        </>
    );
}
