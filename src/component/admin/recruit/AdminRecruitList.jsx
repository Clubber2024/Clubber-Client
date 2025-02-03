import styles from './adminRecruitList.module.css';
import { customAxios } from '../../../config/axios-config';
import { useEffect, useState } from 'react';
import { handleAuth } from '../../login/auth';
import { LinkItem } from '../../branch/BranchCentral';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

export default function AdminRecruitList() {
    let accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const [PromoteData, setPromoteData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(6); // 한 페이지에 표시할 항목 수
    const [sort, setSort] = useState('desc'); // 정렬 기준

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
                    sort: sort,
                },
            });
            if (res.data.success) {
                // console.log(res.data);
                setPromoteData(res.data.data.content);
                setTotalPages(res.data.data.totalPages);
                // console.log(res.data.data.content);
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
            if (error.response?.status === 401) {
                accessToken = await handleAuth(navigate); // 공통 함수 호출
                if (accessToken) {
                    return await getPromoteData(); // 토큰 갱신 후 재시도
                }
            } else {
                console.error('Failed to fetch admin club data:', error);
            }
            return null;
        }
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const onClickRecruit = (recruitId) => {
        navigate(`/admin/recruit/${recruitId}`, {
            state: { recruitId: recruitId },
        });
    };

    return (
        <>
            <div className={styles.title}>나의 모집글</div>
            <div className={styles.recruit_wrapper}>
                <div className={styles.recruit_button_div}>
                    <LinkItem to={`/admin/recruit/edit`}>
                        <button className={styles.recruit_button}>
                            <img src="/admin/edit.png" className={styles.recruit_edit_img} />
                            글쓰기
                        </button>
                    </LinkItem>
                </div>
                <div className={styles.recruit_container} key={PromoteData.recruitId}>
                    {PromoteData?.map((item) => (
                        <div
                            className={styles.recruit_box}
                            key={item.recruitId}
                            onClick={() => onClickRecruit(item.recruitId)}
                        >
                            <div className={styles.recruit_div}>
                                <p className={styles.recruit_title}>{item.title}</p>
                                <p className={styles.recruit_text}>{item.content}</p>
                            </div>
                            {item.imageUrl && (
                                <img
                                    src={item.imageUrl}
                                    className={styles.recruit_logo}
                                    alt="recruit logo"
                                />
                            )}
                        </div>
                    ))}
                </div>
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
