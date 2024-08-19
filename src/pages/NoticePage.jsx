import { useState, useEffect } from "react";
import { customAxios } from "../config/axios-config";

export default function NoticePage() {
    const url = window.location.href; // 현재 URL 가져오기
    const urlParts = url.split('/'); // URL을 '/' 기준으로 분할
    const noticeId = urlParts[urlParts.length - 1]; // 마지막 부분이 clubId
    const intNoticeId = parseInt(noticeId, 10);

    const [noticeData, setNoticeData] = useState([]);

    const getNoticeData = async () => {
        try {
            const res = await customAxios.get(`/v1/notices/${intNoticeId}`);
            if (res.data.success) {
                setNoticeData(res.data.data);

            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    useEffect(() => {
        getNoticeData();
    }, []);

    return (
        <div>
            <div>{noticeData.title}</div>
            <div>{noticeData.content}</div>
            <div>{noticeData.totalView}</div>
            <div>{noticeData.createdAt}</div>
        </div>
    )
}