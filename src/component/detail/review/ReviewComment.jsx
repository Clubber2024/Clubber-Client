import { useNavigate, useLocation } from "react-router-dom";
import styles from "./reviewComment.module.css";
import { useState } from "react";
import { customAxios } from "../../../config/axios-config";
import ErrorModal from "../../modal/ErrorModal";

export default function ReviewComment() {
    const navigate = useNavigate();
    const location = useLocation();

    const tab = "Review";
    const [comment, setComment] = useState("");

    const clubId = location.state.clubId;
    const selectedKeywords = location.state.selectedKeywords;
    console.log(clubId);
    console.log(selectedKeywords);

    // 에러 모달창
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
        navigate(`/clubs/${clubId}`, { state: tab });
    };

    const saveComment = (event) => {
        setComment(event.target.value);
        console.log(event.target.value);
    };

    const onClickPass = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await customAxios.post(
                `v1/clubs/${clubId}/reviews`,
                {
                    keywords: selectedKeywords,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log("리뷰 작성 성공:", res.data);
            navigate(`/clubs/${clubId}`, { state: tab }); // 해당 동아리 상세 페이지로 이동 -> 폴더구조 정리해서 리뷰페이지로 이동하게
            // setBtnActive({}); // 제출 후 버튼 상태를 초기화
        } catch (error) {
            if (error.response) {
                setModalMessage(error.response.data.reason);
                setIsModalOpen(true);
            } else {
                console.error("리뷰 작성 실패:", error);
            }
        }
    };

    const onClickSubmit = async () => {
        console.log(comment);
        let res = {};
        try {
            const accessToken = localStorage.getItem("accessToken");
            res = await customAxios.post(
                `/v1/clubs/${clubId}/reviews`,
                {
                    content: comment,
                    keywords: selectedKeywords,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log("리뷰 작성 성공:", res.data);
            navigate(`/clubs/${clubId}`, { state: tab }); // 해당 동아리 상세 페이지로 이동 -> 폴더구조 정리해서 리뷰페이지로 이동하게
            // setBtnActive({}); // 제출 후 버튼 상태를 초기화
        } catch (error) {
            if (error.response) {
                setModalMessage(error.response.data.reason);
                setIsModalOpen(true);
            } else {
                console.error("리뷰 작성 실패:", error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>한줄평을 자유롭게 써주세요!</h2>
            <p className={styles.warning}>작성한 리뷰는 삭제가 불가능합니다. 신중하게 작성해주세요!</p>
            <input type="text" placeholder="작성하기" onChange={saveComment} />
            <div className={styles.buttonContainer}>
                <button onClick={onClickPass}>넘어가기</button>
                <button onClick={onClickSubmit}>작성하기</button>
            </div>
            <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
        </div>
    );
}
