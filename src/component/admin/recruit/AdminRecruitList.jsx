import styles from './adminRecruitList.module.css';
import { customAxios } from '../../../config/axios-config';
import { useEffect, useState } from 'react';
import { LinkItem } from '../../branch/BranchCentral';
import ReactPaginate from 'react-paginate';

export default function AdminRecruitList() {
    const accessToken = localStorage.getItem('accessToken');
    const [PromoteData, setPromoteData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5); // 한 페이지에 표시할 항목 수
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
                // console.log(res.data);
                setPromoteData(res.data.data.content);
                setTotalPages(res.data.data.totalPages);
                console.log(res.data.data.content);
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
            <div className={styles.title}>나의 모집글</div>

            <div className={styles.recruit_container} key={PromoteData.recruitId}>
                <div className={styles.recruit_button_div}>
                    <LinkItem to={`/admin/recruit/edit`}>
                        <button className={styles.recruit_button}>모집글 작성</button>
                    </LinkItem>
                </div>
                {PromoteData?.map((item) => (
                    <div className={styles.recruit_box} key={item.recruitId}>
                        <img src={item.images ? item.imges : ''} className={styles.recruit_logo} />
                        <div className={styles.recruit_div}>
                            <p className={styles.recruit_title}>{item.title}</p>
                            <p className={styles.recruit_text}>{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={totalPages}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination_link'}
                nextLinkClassName={'pagination_link'}
                disabledClassName={'pagination_link_disabled'}
                activeClassName={'active'}
            />
        </>
    );
}
