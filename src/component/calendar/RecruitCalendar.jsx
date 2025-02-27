import { useEffect, useState } from "react";
import { getMonth, getDate, getDay } from "date-fns";
import "./recruitCalendar.css";
import { customAxios } from "../../config/axios-config";
import ErrorModal from "../modal/ErrorModal";
import {
  ChevronLeftSquareIcon,
  ChevronRightSquareIcon,
} from "lucide-react";
import LoadingPage from "../loading/LoadingPage";
import LoginModal from '../modal/LoginModal';

export default function RecruitCalendar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const [calendarData, setCalendarData] = useState({});

  // 현재 달의 첫 날의 요일
  const curMonthFirstDay = getDay(new Date(year, month - 1, 1));

  // 현재 달의 마지막 날 날짜
  const curMonthLastDate = getDate(new Date(year, month, 0));
  // 이전 달의 마지막 날 날짜
  const lastMonthLastDate = getDate(new Date(year, month - 1, 0));

  const totalCells = curMonthFirstDay + curMonthLastDate > 35 ? 42 : 35;

  //즐겨찾기 상태관리
  const [favoriteClubs, setFavoriteClubs] = useState([]);
  const [favoriteClubIds, setFavoriteClubIds] = useState([]);
  const token = localStorage.getItem("accessToken");

    //모달 상태관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  //로딩창 상태관리
  const [isLoading, setIsLoading] = useState(false);

  //캘린더 조회 api
  const getCalendarData = async () => {
    try {
      setIsLoading(true);
      const res = await customAxios.get(
        `/v1/calendar?year=${year}&month=${month}`
      );
      setCalendarData(res.data.data);

      if (res.data.success) {
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCalendarData();
  }, [currentDate]);

    const changeMonth = (offset) => {
        if (month === 1 && offset === -1) {
            setModalMessage('이전 달로 이동할 수 없습니다.');
            setIsModalOpen(true);
            return;
        } else if (month === 12 && offset === 1) {
            setModalMessage('다음 달로 이동할 수 없습니다.');
            setIsModalOpen(true);
            return;
        }

        const newDate = new Date(year, month - 1 + offset, 1);
        setCurrentDate(newDate);
    };

  //회원 즐겨찾기 조회 api
  const getFavoriteData = async () => {
    if (!token) return;
    try {
      const res = await customAxios.get(`/v1/users/favorite`);
      // console.log(res.data.data.userFavorites);
      const data = res.data.data.userFavorites;
      setFavoriteClubs(data);
      const clubIds = data.map((item) => item.favoriteClub["clubId"]);
      setFavoriteClubIds(clubIds);

      // console.log(clubIds);
    } catch (e) {}
  };

  const getFavoriteId = (clubId) => {
    const favorite = favoriteClubs.find(
      (item) => item.favoriteClub.clubId === clubId
    );
    return Number(favorite.favoriteId);
  };

  useEffect(() => {
    getFavoriteData();
  }, []);

    const handleFavorite = async (clubId) => {
        if (!token) {
            setModalMessage('로그인 후 즐겨찾기를 이용해주세요!');
            setIsLoginModalOpen(true);
            return;
        }
        //관리자일 때 ->> 추후 추가예정

    if (favoriteClubIds.includes(clubId)) {
      const favoriteId = getFavoriteId(clubId);
      const res = await customAxios.delete(
        `/v1/clubs/${clubId}/favorites/${favoriteId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        getFavoriteData();
        setModalMessage("동아리가 즐겨찾기에서 해제되었습니다.");
        setIsModalOpen(true);
      } else {
        getFavoriteData();
        setModalMessage("죄송합니다. 다시 한번 시도해주세요.");
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
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        getFavoriteData();
        setModalMessage("동아리가 즐겨찾기에 추가되었습니다.");
        setIsModalOpen(true);
      } else {
        getFavoriteData();
        setModalMessage("죄송합니다. 다시 한번 시도해주세요.");
        setIsModalOpen(true);
      }
    }
  };

  if (isLoading)
    return (
      <div>
        <LoadingPage />
      </div>
    );

  return (
    <div className="calendar_wrapper">
      <div className="calendar_container">
        <div className="calendar_header">
          <div className="calendar_header_left">
            <h1 className="calendar_header_month">
              {calendarData.year}.{String(calendarData.month).padStart(2, "0")}
            </h1>
            <div className="calendar_chevrons">
              <ChevronLeftSquareIcon
                className="chevron_left"
                onClick={() => changeMonth(-1)}
              />
              <ChevronRightSquareIcon
                className="chevron_right"
                onClick={() => changeMonth(1)}
              />
            </div>
          </div>
          <div className="calendar_header_right">
            <p className="day_event_start">
              {isMobile ? "모집 시작일" : "▶︎ 모집 시작일"}
            </p>
            <p className="day_event_end">
              {isMobile ? "모집 마감일" : "◀︎ 모집 마감일"}
            </p>
            <p className="day_event_always">
              {isMobile ? "상시 모집" : "◆ 상시 모집"}
            </p>
          </div>
        </div>
        <div className="weeks_container">
          {weekDays.map((day) => (
            <div key={day} className="week_day">
              {day}
            </div>
          ))}
        </div>
        <div className="dates_container">
          {Array.from({ length: totalCells }, (_, i) => {
            const date = i - curMonthFirstDay + 1;
            const currentMonthDate = date;
            const isCurrentMonth =
              currentMonthDate > 0 && currentMonthDate <= curMonthLastDate;

            const displayDate = isCurrentMonth
              ? date // 현재 달 날짜
              : date <= 0
              ? lastMonthLastDate + date // 이전 달 날짜
              : date - curMonthLastDate; // 다음 달 날짜

            const isToday =
              isCurrentMonth &&
              date === today.getDate() &&
              month === today.getMonth() + 1 &&
              year === today.getFullYear();

            return (
              <div
                key={i}
                className={`day_cell ${isCurrentMonth ? "" : "day_cell_other"} ${
                    isToday ? "today_cell" : ""
                  }`}
              >
                <span className={`day_num ${isCurrentMonth ? "" : "day_num_other"} ${
                    isToday ? "today_num" : ""
                  }`}>
                  {displayDate}
                </span>

                <div className="day_event_container">
                  {calendarData?.recruitList?.map((date) => (
                    <>
                      {date.semester !== "ALWAYS" &&
                        currentMonthDate === getDate(date.startAt) &&
                        month === getMonth(date.startAt) + 1 && (
                          <div key={date.clubId} className="day_event_start">
                            <a
                              href={date.everytimeUrl}
                              className="calendar_club_a"
                            >
                              <p className="calendar_club">
                                {isMobile
                                  ? date.clubName
                                  : `▶︎ ${date.clubName}`}
                              </p>
                            </a>
                            <img
                              className="calendar_star"
                              src={
                                favoriteClubIds.includes(date.clubId)
                                  ? "/bookmark/starYellow-calendar.png"
                                  : "/bookmark/star-calendar.png"
                              }
                              alt="star"
                              onClick={() => handleFavorite(date.clubId)}
                            />
                          </div>
                        )}
                      {date.semester !== "ALWAYS" &&
                        currentMonthDate === getDate(date.endAt) &&
                        month === getMonth(date.endAt) + 1 && (
                          <div key="date.clubId" className="day_event_end">
                            <a
                              href={date.everytimeUrl}
                              className="calendar_club_a"
                            >
                              <p className="calendar_club">
                                ◀︎ {date.clubName}
                              </p>
                            </a>
                            <img
                              className="calendar_star"
                              src={
                                favoriteClubIds.includes(date.clubId)
                                  ? "/bookmark/starYellow-calendar.png"
                                  : "/bookmark/star-calendar.png"
                              }
                              alt="star"
                              onClick={() => handleFavorite(date.clubId)}
                            />
                          </div>
                        )}
                      {date.semester === "ALWAYS" &&
                        currentMonthDate === getDate(date.startAt) &&
                        month === getMonth(date.startAt) + 1 && (
                          <div key="date.clubId" className="day_event_always">
                            <a
                              href={date.everytimeUrl}
                              className="calendar_club_a"
                            >
                              <p className="calendar_club">
                                {isMobile
                                  ? date.clubName
                                  : `◆ ${date.clubName}`}
                              </p>
                            </a>
                            <img
                              className="calendar_star"
                              src={
                                favoriteClubIds.includes(date.clubId)
                                  ? "/bookmark/starYellow-calendar.png"
                                  : "/bookmark/star-calendar.png"
                              }
                              alt="star"
                              onClick={() => handleFavorite(date.clubId)}
                            />
                          </div>
                        )}
                    </>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && (
        <ErrorModal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
            {isLoginModalOpen && (
                <LoginModal
                    isOpen={isLoginModalOpen}
                    message={modalMessage}
                    onClose={() => setIsLoginModalOpen(false)}
                />
            )}
    </div>
  );
}
