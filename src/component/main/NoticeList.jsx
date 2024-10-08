import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { customAxios } from '../../config/axios-config';
import './noticeList.css';
import { useNavigate } from 'react-router-dom';

export default function NoticeList() {
    const navigate = useNavigate();
    // const [noticeId, setNoticeId] = useState(0);
    const [noticeData, setNoticeData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getNoticeData = async (page) => {
        try {
            const res = await customAxios.get(`/v1/notices`, {
                params: { page, size: itemsPerPage },
            });
            if (res.data.success && res.data.data.content) {
                // setNoticeId(res.data.data.content.noticeId);
                setNoticeData(res.data.data.content);
                setPageCount(res.data.data.totalPages);
                console.log(res.data.data);
            } else {
                setNoticeData([]);
            }
        } catch (error) {
            //console.error("Error fetching data: ", error);
            setNoticeData([]);
        }
    };

    useEffect(() => {
        getNoticeData(currentPage);
    }, [currentPage]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const onClickNotice = (noticeId) => {
        navigate(`/notices/${noticeId}`);
    };

    return (
        <div className="notice_container">
            <h2 className="notice_h2">공지사항</h2>
            <div className="notice_list">
                <div className="notice_header">
                    <span>번호</span>
                    <span style={{ textAlign: 'start' }}>제목</span>
                    <span>날짜</span>
                    <span>작성자</span>
                    <span>조회수</span>
                </div>
                {noticeData.length > 0 ? (
                    noticeData.map((item) => (
                        <div key={item.noticeId} className="notice_item">
                            <span>{item.noticeId}</span>
                            <span
                                className="notice_title"
                                onClick={() => {
                                    onClickNotice(item.noticeId);
                                }}
                            >
                                {item.title}
                            </span>
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                            <span>관리자</span>
                            {item.totalView ? <span>{item.totalView}</span> : <span>0</span>}
                        </div>
                    ))
                ) : (
                    <div className="notice_item">
                        <span>공지사항이 없습니다.</span>
                    </div>
                )}
            </div>
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination_link'}
                nextLinkClassName={'pagination_link'}
                disabledClassName={'pagination_link_disabled'}
                activeClassName={'active'}
            />
        </div>
    );
}
