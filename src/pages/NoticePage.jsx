import { useState, useEffect } from 'react';
import { customAxios } from '../config/axios-config';
import './noticePage.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import parse from 'html-react-parser';

export default function NoticePage() {
    const navigate = useNavigate();
    const url = window.location.href; // 현재 URL 가져오기
    const urlParts = url.split('/'); // URL을 '/' 기준으로 분할
    const noticeId = urlParts[urlParts.length - 1]; // 마지막 부분이 clubId
    const intNoticeId = parseInt(noticeId, 10);

    const prevNoticeId = intNoticeId - 1;
    const nextNoticeId = intNoticeId + 1;

    const [noticeData, setNoticeData] = useState([]);
    const [prevData, setPrevData] = useState([]);
    const [nextData, setNextData] = useState([]);

    const transformContent = (text) => {
        return text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    };

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

    const prevNoticeData = async () => {
        try {
            const res = await customAxios.get(`/v1/notices/${prevNoticeId}`);
            if (res.data.success) {
                setPrevData(res.data.data);
            } else {
                setPrevData(null); // 이전 글이 없으면 null로 설정
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
            setPrevData(null); // 이전 글이 없으면 null로 설정
        }
    };

    const nextNoticeData = async () => {
        try {
            const res = await customAxios.get(`/v1/notices/${nextNoticeId}`);
            if (res.data.success) {
                setNextData(res.data.data);
            } else {
                setNextData(null); // 이전 글이 없으면 null로 설정
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
            setNextData(null); // 이전 글이 없으면 null로 설정
        }
    };

    useEffect(() => {
        getNoticeData();
        prevNoticeData();
        nextNoticeData();
    }, [noticeId]);

    const onClickPrev = () => {
        navigate(`/notices/${prevNoticeId}`);
    };

    const onClickNext = () => {
        navigate(`/notices/${nextNoticeId}`);
    };

    const onClickList = () => {
        navigate('/notices');
    };

    return (
        <div className="notice_detail_container">
            <h2>공지사항</h2>
            <div className="notice_divider" />
            <div className="notice_body">
                <p className="detail_title">{noticeData.title}</p>
                <p className="detail_date">{noticeData.createdAt}</p>
                <div className="detail_divider" />
                <div className="detail_content">
                    {noticeData.content ? parse(transformContent(noticeData.content)) : ''}
                </div>
                <div className="detail_divider" />
                {prevData ? (
                    <div className="prev_next">
                        <p className="prev_next_header">이전</p>
                        <p className="prev_next_title" onClick={onClickPrev} style={{ cursor: 'pointer' }}>
                            {prevData.title}
                        </p>
                        <p style={{ color: '#9C9C9C', fontSize: '13px', width: '100px' }}>
                            {prevData ? prevData.createdAt : ''}
                        </p>
                    </div>
                ) : (
                    <div className="prev_next_null">
                        <p className="prev_next_header">이전</p>
                        <p className="prev_next_title" style={{ color: '#9C9C9C', textAlign: 'left', padding: '0' }}>
                            이전 글이 없습니다.
                        </p>
                    </div>
                )}
                <div className="detail_divider" />
                {nextData ? (
                    <div className="prev_next">
                        <p className="prev_next_header">다음</p>
                        <p className="prev_next_title" onClick={onClickNext} style={{ cursor: 'pointer' }}>
                            {nextData.title}
                        </p>
                        <p style={{ color: '#9C9C9C', fontSize: '13px', width: '100px' }}>
                            {nextData ? nextData.createdAt : ''}
                        </p>
                    </div>
                ) : (
                    <div className="prev_next_null">
                        <p className="prev_next_header">다음</p>
                        <p className="prev_next_title" style={{ color: '#9C9C9C', textAlign: 'left', padding: '0' }}>
                            다음 글이 없습니다.
                        </p>
                    </div>
                )}

                <div className="detail_divider" />
            </div>
            <button className="list_button" onClick={onClickList}>
                목록
            </button>
        </div>
    );
}
