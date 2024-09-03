import styles from './AdminRecruitWrite.module.css';
import { customAxios } from '../../../config/axios-config';
import { useEffect, useState, useRef } from 'react';

export default function AdminRecruitWrite() {
    const inputFileRef = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    // const [inputValue, setInputValue] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // 파일 선택 핸들러
    const handleFileChange = (event) => {
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
        // 선택된 파일들을 처리하는 로직 추가
        console.log('선택된 파일:', files);
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
                <button className={styles.write_upload_button}>업로드</button>
            </div>
        </>
    );
}
