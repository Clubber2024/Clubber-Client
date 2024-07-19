import styles from "./sideBar.module.css";
import MouseImg from "../mouse.png";
import styled from "styled-components";
import { LinkItem } from "../../branch/BranchCentral";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Img = styled.img`
  width: 120px;
  height: 120px;
  display: block;
  margin: auto;
  margin-top: 10%;
`;

export default function SideBar() {
  return (
    <>
      <div>
        <div className={styles.rectangleSide}>
          <Img src={MouseImg} />
          <p className={styles.adminText}>관리자</p>
        </div>

        <div className={styles.rectangleList}>
          <menu className={styles.sideTitle}>내 정보</menu>
          <NavLink
            to={`/admin/edit`}
            className={({ isActive }) =>
              isActive ? styles.activeMenu : styles.sideText
            }
          >
            동아리글 작성하기
          </NavLink>
          <div className={styles.sideLine}></div>
          <menu className={styles.sideTitle}>리뷰</menu>
          <menu className={styles.sideText}>리뷰목록</menu>

          <NavLink
            to={`/admin/mypage/pending`}
            className={({ isActive }) =>
              isActive ? styles.activeMenu : styles.sideText
            }
          >
            리뷰승인대기
          </NavLink>
        </div>
      </div>
    </>
  );
}
