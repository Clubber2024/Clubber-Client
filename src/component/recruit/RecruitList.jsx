import styles from './recruitList.module.css';
import './Pagination.css';
import ReactPaginate from 'react-paginate';
import { customAxios } from '../../config/axios-config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecruitList() {
    const navigate = useNavigate();

    const [PromoteData, setPromoteData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5); // 한 페이지에 표시할 항목 수
    const [sort, setSort] = useState('desc'); // 정렬 기준

    const getPromoteData = async (page) => {
        try {
            const res = await customAxios.get(`/v1/recruits`, {
                params: {
                    page: page,
                    size: pageSize,
                    sort: sort,
                },
            });
            if (res.data.success) {
                setPromoteData(res.data.data.content);
                setTotalPages(res.data.data.totalPages);
                // console.log(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getPromoteData(currentPage);
    }, [currentPage]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const onClickRecruit = (recruitId) => {
        navigate(`/recruit/${recruitId}`, {
            state: { recruitId: recruitId },
        });
    };

    return (
        <>
            <div className={styles.title}>모집글</div>
            <div className={styles.recruit_container}>
                {PromoteData?.map((item) => (
                    <div
                        className={styles.recruit_box}
                        key={item.recruitId}
                        onClick={() => onClickRecruit(item.recruitId)}
                    >
                        <img src={item.imageUrl ? item.imageUrl : ''} className={styles.recruit_logo} />
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
