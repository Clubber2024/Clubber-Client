import { useEffect, useState } from 'react';
import { getMonth, getDate, getDay } from 'date-fns';
import './recruitCalendar.css';
import { customAxios } from '../../config/axios-config';
import ErrorModal from '../modal/ErrorModal';

export default function RecruitCalendar() {
    const [currentDate] = useState(new Date());
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const [calendarData, setCalendarData] = useState({});

    // 현재 달의 첫 날의 요일
    const curMonthFirstDay = getDay(new Date(year, month, 1));

    // 현재 달의 마지막 날 날짜
    const curMonthLastDate = getDate(new Date(year, month, 0));
    // 이전 달의 마지막 날 날짜
    const lastMonthLastDate = getDate(new Date(year, month - 1, 0));

    //즐겨찾기 상태관리
    const [favoriteClubs, setFavoriteClubs] = useState([]);
    const [favoriteClubIds, setFavoriteClubIds] = useState([]);
    const token = localStorage.getItem('accessToken');

    //모달 상태관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    //캘린더 조회 api
    const getCalendarData = async () => {
        try {
            const res = await customAxios.get(`/v1/calendar?year=${year}&month=${month}`);
            setCalendarData(res.data.data);
        } catch (e) {
            console.error(e);
        }
    };

    //회원 즐겨찾기 조회 api
    const getFavoriteData = async () => {
        if (!token) return;
        try {
            const res = await customAxios.get(`/v1/users/favorite`);
            // console.log(res.data.data.userFavorites);
            const data = res.data.data.userFavorites;
            setFavoriteClubs(data);
            const clubIds = data.map((item) => item.favoriteClub['clubId']);
            setFavoriteClubIds(clubIds);

            // console.log(clubIds);
        } catch (e) {}
    };

    const getFavoriteId = (clubId) => {
        const favorite = favoriteClubs.find((item) => item.favoriteClub.clubId === clubId);
        return Number(favorite.favoriteId);
    };

    useEffect(() => {
        getCalendarData();
        getFavoriteData();
    }, []);

    const handleFavorite = async (clubId) => {
        if (!token) {
            setModalMessage('로그인 후 즐겨찾기를 이용해주세요!');
            setIsModalOpen(true);
            return;
        }
        //관리자일 때 ->> 추후 추가예정

        if (favoriteClubIds.includes(clubId)) {
            const favoriteId = getFavoriteId(clubId);
            const res = await customAxios.delete(`/v1/clubs/${clubId}/favorites/${favoriteId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                getFavoriteData();
                setModalMessage('동아리가 즐겨찾기에서 해제되었습니다.');
                setIsModalOpen(true);
            } else {
                getFavoriteData();
                setModalMessage('죄송합니다. 다시 한번 시도해주세요.');
                setIsModalOpen(true);
            }
        } else {
            const res = await customAxios.post(
                `/v1/clubs/${clubId}/favorites`,
                {
                    clubId: clubId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data.success) {
                getFavoriteData();
                setModalMessage('동아리가 즐겨찾기에 추가되었습니다.');
                setIsModalOpen(true);
            } else {
                getFavoriteData();
                setModalMessage('죄송합니다. 다시 한번 시도해주세요.');
                setIsModalOpen(true);
            }
        }
    };

    return (
        <div className="calendar_wrapper">
            <div className="calendar_container">
                <h1 className="calendar_header">
                    {calendarData.year}.{calendarData.month}
                </h1>
                <div className="weeks_container">
                    {weekDays.map((day) => (
                        <div key={day} className="week_day">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="dates_container">
                    {Array.from({ length: 35 }, (_, i) => {
                        const date = i - curMonthFirstDay + 1;
                        const currentMonthDate = date;
                        const isCurrentMonth = currentMonthDate > 0 && currentMonthDate <= curMonthLastDate;

                        const displayDate = isCurrentMonth
                            ? date // 현재 달 날짜
                            : date <= 0
                            ? lastMonthLastDate + date // 이전 달 날짜
                            : date - curMonthLastDate; // 다음 달 날짜

                        return (
                            <div key={i} className={isCurrentMonth ? 'day_cell' : 'day_cell_other'}>
                                <span className={isCurrentMonth ? 'day_num' : 'day_num_other'}>{displayDate}</span>

                                {calendarData?.recruitList?.map((date) => (
                                    <>
                                        {currentMonthDate === getDate(date.startAt) &&
                                            month === getMonth(date.startAt) + 1 && (
                                                <div key="date.clubId" className="day_event_start">
                                                    <p className="calendar_club">➡️ {date.clubName}</p>
                                                    <img
                                                        className="calendar_star"
                                                        src={
                                                            favoriteClubIds.includes(date.clubId)
                                                                ? '/bookmark/starYellow.png'
                                                                : '/bookmark/star.png'
                                                        }
                                                        alt="star"
                                                        onClick={() => handleFavorite(date.clubId)}
                                                    />
                                                </div>
                                            )}
                                        {currentMonthDate === getDate(date.endAt) &&
                                            month === getMonth(date.endAt) + 1 && (
                                                <div key="date.clubId" className="day_event_end">
                                                    <p className="calendar_club">⬅️ {date.clubName}</p>
                                                    <img
                                                        className="calendar_star"
                                                        src={
                                                            favoriteClubIds.includes(date.clubId)
                                                                ? '/bookmark/starYellow.png'
                                                                : '/bookmark/star.png'
                                                        }
                                                        alt="star"
                                                        onClick={() => handleFavorite(date.clubId)}
                                                    />
                                                </div>
                                            )}
                                    </>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
            {isModalOpen && (
                <ErrorModal isOpen={isModalOpen} message={modalMessage} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}
