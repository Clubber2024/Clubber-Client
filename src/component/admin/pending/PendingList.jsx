import { useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import "./pendingList.css";
import axios from "axios";

export default function PendingList() {
  const [pendingData, setPendingData] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const [checkedList, setCheckedList] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

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
        const res = await axios.get(
          `http://13.125.141.171:8080/v1/admins/reviews/pending`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.data.success) {
          setPendingData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching pending data : ", error);
      }
    };
    getPendingData();
  }, [accessToken]);

  const onClickApprove = () => {
    try {
      const res = axios.patch(
        `http://13.125.141.171:8080/v1/admins/reviews/decision`,
        {
          reviewIds: checkedList,
          approvedStatus: "APPROVED",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.error("Error approving the review data : ", error);
    }
  };

  const onClickReject = () => {
    try {
      const res = axios.patch(
        `http://13.125.141.171:8080/v1/admins/reviews/decision`,
        {
          reviewIds: checkedList,
          approvedStatus: "REJECTED",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.error("Error rejecting the review data : ", error);
    }
  };

  return (
    <div className="pending_wrapper">
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
                onChange={(e) =>
                  handleSingleCheck(e.target.checked, pending.reviewId)
                }
                checked={checkedList.includes(pending.reviewId)}
                className="checkbox_input"
              />
              <div className="text_align">
                <p className="pending_comment">{pending.content}</p>
                <p className="vertical_divider">|</p>
                <p className="pending_date">{pending.writtenDate}</p>
              </div>
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
      </div>
    </div>
  );
}
