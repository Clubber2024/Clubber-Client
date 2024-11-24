import { customAxios } from '../../config/axios-config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './recruitContent.module.css';

export default function RecruitContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const recruitId = location.state?.recruitId;
    const [contentData, setContentData] = useState();

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
    return (
        <>
            <div className={styles.total_div}>
                <p className={styles.content_title}>{contentData?.title}</p>
                <div className={styles.date_div}>
                    <p className={styles.content_date}>{new Date(contentData?.createdAt).toLocaleDateString()}</p>
                    <p className={styles.content_date}>조회수 {contentData?.totalView}</p>
                </div>
                <div className={styles.horizontal_line}></div>
                <div className={styles.img_div}>
                    {contentData?.imageUrls.length > 0
                        ? contentData.imageUrls.map((image, index) => (
                              <img key={index} src={image} alt="contentImg" className={styles.content_img} />
                          ))
                        : ''}
                </div>
                <div className={styles.content_div}>
                    <p className={styles.content_content}>{contentData?.content}</p>
                </div>
                <div className={styles.horizontal_line}></div>
            </div>
            <div className={styles.button_div}>
                <button className={styles.content_list_button} onClick={onClickList}>
                    목록
                </button>
            </div>
        </>
    );
}
