import { useEffect, useState } from "react";
import { getMonth, getDate, getDay } from "date-fns";
import "./recruitCalendar.css";
import { customAxios } from "../../config/axios-config";
import { ChevronLeft, ChevronRight, Dot } from "lucide-react";

export default function RecruitCalendar() {
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

  const getCalendarData = async () => {
    try {
      const res = await customAxios.get(
        `/v1/calendar?year=${year}&month=${month}`
      );
      setCalendarData(res.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCalendarData();
  }, [currentDate]);

  const changeMonth = (offset) => {
    const newDate = new Date(year, month - 1 + offset, 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar_wrapper">
      <div className="calendar_container">
        <div className="calendar_header">
          <h1 className="calendar_header_left">
            {calendarData.year}.{String(calendarData.month).padStart(2, "0")}
          </h1>
          <div className="calendar_header_right">
            <div className="calendar_chevrons">
              <ChevronLeft
                onClick={() => changeMonth(-1)}
                style={{ width: "40px", height: "35px" }}
              />
              <Dot style={{ width: "50px", height: "50px" }} />
              <ChevronRight
                onClick={() => changeMonth(1)}
                style={{ width: "40px", height: "35px" }}
              />
            </div>
            <div>
              <p className="day_event_start">➡️ 모집 시작일</p>
              <p className="day_event_end">⬅️ 모집 마감일</p>
            </div>
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

            return (
              <div
                key={i}
                className={isCurrentMonth ? "day_cell" : "day_cell_other"}
              >
                <span className={isCurrentMonth ? "day_num" : "day_num_other"}>
                  {displayDate}
                </span>

                {calendarData?.recruitList?.map((date) => (
                  <>
                    {currentMonthDate === getDate(date.startAt) &&
                      month === getMonth(date.startAt) + 1 && (
                        <div key="date.clubId" className="day_event_start">
                          <p className="calendar_club">➡️ {date.clubName}</p>
                          {/* <img
                          className="calendar_star"
                          src="/bookmark/starYellow.png"
                          alt="star"
                          // onClick={handleFavorite}
                        /> */}
                        </div>
                      )}
                    {currentMonthDate === getDate(date.endAt) &&
                      month === getMonth(date.endAt) + 1 && (
                        <div key="date.clubId" className="day_event_end">
                          <p className="calendar_club">⬅️ {date.clubName}</p>
                          {/* <img
                          className="calendar_star"
                          src="/bookmark/starYellow.png"
                          alt="star"
                          // onClick={handleFavorite}
                        /> */}
                        </div>
                      )}
                  </>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
