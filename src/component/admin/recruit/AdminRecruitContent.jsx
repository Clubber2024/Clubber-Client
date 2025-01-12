import { customAxios } from '../../../config/axios-config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './adminRecruitContent.module.css';

export default function AdminRecruitContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const recruitId = location.state?.recruitId;
    const [contentData, setContentData] = useState();
    //이미지 모달창
    const [isImgModalOpen, setIsImgModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const getRecruitData = async (page) => {
        try {
            const res = await customAxios.get(`/v1/recruits/${recruitId}`, {
                params: {
                    // page: page,
                    // size: pageSize,
                    //sort: sort,
                },
            });
            if (res.data.success) {
                setContentData(res.data.data);
                // setTotalPages(res.data.data.totalPages);
                // console.log(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getRecruitData();
    }, []);

    const onClickList = () => {
        navigate('/recruit');
    };

    const onClickEditContent = () => {
        navigate('/admin/recruit/edit', {
            state: { recruitId: recruitId },
        });
    };

    //이미지 모달창
    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsImgModalOpen(true);
    };

    const closeModal = () => {
        setIsImgModalOpen(false);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === contentData.imageUrls.length - 1 ? prevIndex : prevIndex + 1
        );
    };
    return (
        <>
            <div className={styles.admin_content_div}>
                <div className={styles.edit_button_div}>
                    <button className={styles.edit_button} onClick={onClickEditContent}>
                        수정하기
                    </button>
                </div>
                <div className={styles.total_div}>
                    <p className={styles.content_title}>{contentData?.title}</p>
                    <div className={styles.date_div}>
                        <p className={styles.content_date}>{new Date(contentData?.createdAt).toLocaleDateString()}</p>
                        <p className={styles.content_date}>조회수 {contentData?.totalView}</p>
                    </div>
                    <div className={styles.horizontal_line}></div>

                    <div className={styles.content_div}>
                        <p className={styles.content_content}>{contentData?.content}</p>
                    </div>

                    <div className={styles.img_div}>
                        {contentData?.imageUrls.length > 0
                            ? contentData.imageUrls.map((image, index) => (
                                  <img
                                      key={index}
                                      src={image}
                                      alt="contentImg"
                                      className={styles.content_img}
                                      onClick={() => openModal(index)}
                                  />
                              ))
                            : ''}
                    </div>
                    <div className={styles.horizontal_line_bottom}></div>
                </div>
                <div className={styles.button_div}>
                    <button className={styles.content_list_button} onClick={onClickList}>
                        목록
                    </button>
                </div>
                {isImgModalOpen && (
                    <div className={styles.modal}>
                        <span className={styles.close} onClick={closeModal}>
                            &times;
                        </span>
                        <img
                            src={contentData.imageUrls[currentImageIndex]}
                            className={styles.modal_img}
                            alt="Large contentImg"
                        />
                        <span className={styles.prev} onClick={prevImage}>
                            &#10094;
                        </span>
                        <span className={styles.next} onClick={nextImage}>
                            &#10095;
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
