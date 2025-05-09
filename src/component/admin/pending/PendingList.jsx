import { useEffect, useState } from 'react';
import './pendingList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../modal/ConfirmModal';
import { customAxios } from '../../../config/axios-config';
import ErrorModal from '../../modal/ErrorModal';

export default function PendingList() {
    const navigate = useNavigate();
    const [pendingData, setPendingData] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const [checkedList, setCheckedList] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);

    // 승인 모달창
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [action, setAction] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
        navigate(`/admin/mypage/pending`);
    };

    // 전체선택
    const handleAllCheck = (checked) => {
        if (checked) {
            const allIds = pendingData.map((item) => item.reviewId);
            setCheckedList(allIds);
        } else {
            setCheckedList([]);
        }
        setIsAllChecked(checked);
    };

    // 개별선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            setCheckedList((prev) => [...prev, id]);
        } else {
            setCheckedList((prev) => prev.filter((item) => item !== id));
        }
    };

    useEffect(() => {
        const getPendingData = async () => {
            try {
                const res = await customAxios.get(`/v1/admins/reviews/pending`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (res.data.success) {
                    setPendingData(res.data.data);
                }
            } catch (error) {
                console.error('Error fetching pending data : ', error);
            }
        };
        getPendingData();
    }, [accessToken]);

    const onClickApprove = () => {
        if (checkedList.length > 0) {
            console.log('check', checkedList);
            setIsModalOpen(true);
            setModalMessage('승인하시겠습니까?');
            setAction('APPROVED');
        } else {
            setIsErrorModalOpen(true);
            setErrorModalMessage('리뷰를 선택해주세요.');
        }
    };

    const onClickReject = () => {
        if (checkedList.length > 0) {
            setIsModalOpen(true);
            setModalMessage('승인 거절하시겠습니까?');
            setAction('REJECTED');
        } else {
            setIsErrorModalOpen(true);
            setErrorModalMessage('리뷰를 선택해주세요.');
        }
    };

    const onClickOk = () => {
        console.log(action);
        try {
            const res = customAxios.patch(
                `/v1/admins/reviews/decision`,
                {
                    reviewIds: checkedList,
                    approvedStatus: action,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log('res', res);
            if (action === 'APPROVED') {
                setIsModalOpen(false);
                setIsErrorModalOpen(true);
                setErrorModalMessage('승인 처리되었습니다.');
            } else if (action === 'REJECTED') {
                setIsModalOpen(false);
                setIsErrorModalOpen(true);
                setErrorModalMessage('승인 거절 처리되었습니다.');
            }

            // 승인 또는 거절된 리뷰를 pendingData에서 제거
            setPendingData((prev) => prev.filter((item) => !checkedList.includes(item.reviewId)));
            // 체크 리스트 초기화
            setCheckedList([]);
            setIsAllChecked(false);

            // 모달 닫기
            // setIsModalOpen(false);
            // 페이지 리다이렉트
            navigate(`/admin/mypage/pending`, { replace: true });
        } catch (error) {
            console.error('Error approving the review data : ', error);
        }
    };

    return (
        <div className="pending_container">
            <h3>리뷰 승인 대기</h3>
            <div className="pending_divider" />
            <div className="checkbox_container">
                <div className="check_all">
                    <input
                        type="checkbox"
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        checked={isAllChecked}
                        className="checkbox_input"
                    />
                    <label>전체 선택</label>
                </div>
                {pendingData.map((pending) => (
                    <div key={pending.reviewId} className="single_checkbox">
                        <input
                            type="checkbox"
                            onChange={(e) => handleSingleCheck(e.target.checked, pending.reviewId)}
                            checked={checkedList.includes(pending.reviewId)}
                            className="checkbox_input"
                        />
                        <p className="pending_comment">{pending.content}</p>
                        <p className="vertical_divider">|</p>
                        <p className="pending_date">{pending.writtenDate}</p>
                    </div>
                ))}
            </div>
            <div className="button_container">
                <button className="approve_button" onClick={onClickApprove}>
                    승인
                </button>
                <button className="reject_button" onClick={onClickReject}>
                    승인거절
                </button>
            </div>
            <ConfirmModal isOpen={isModalOpen} message={modalMessage} onClickOk={onClickOk} onClose={closeModal} />
            <ErrorModal
                isOpen={isErrorModalOpen}
                message={errorModalMessage}
                onClose={() => setIsErrorModalOpen(false)}
            />
        </div>
    );
}
