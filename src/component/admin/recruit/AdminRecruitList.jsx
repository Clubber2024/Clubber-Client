import styles from './adminRecruitList.module.css';
import { customAxios } from '../../../config/axios-config';
import { useEffect, useState } from 'react';

export default function AdminRecruitList() {
    const accessToken = localStorage.getItem('accessToken');
    const [PromoteData, setPromoteData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(1); // 한 페이지에 표시할 항목 수
    const [sort, setSort] = useState(['string']); // 정렬 기준

    useEffect(() => {
        getPromoteData(currentPage);
    }, [currentPage]);

    const getPromoteData = async (page) => {
        try {
            const res = await customAxios.get(`/v1/admins/recruits`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },

                params: {
                    page: page,
                    size: pageSize,
                },
            });
            if (res.data.success) {
                setPromoteData(res.data.data.content);
                setTotalPages(res.data.pagination.totalPages);
                console.log(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className={styles.title}>모집글</div>
            <div className={styles.recruit_container} key={PromoteData.recruitId}>
                {PromoteData?.map((item) => (
                    <div className={styles.recruit_box}>
                        <img src={item.images} alt="club_logo" className={styles.recruit_logo} />
                        <div className={styles.recruit_div}>
                            <p className={styles.recruit_title}>{item.title}</p>
                            <p className={styles.recruit_text}>{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
