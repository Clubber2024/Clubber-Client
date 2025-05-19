import React, { useEffect, useState } from "react";
import styles from "./branchCentral.module.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../config/axios-config";

export const LinkItem = styled(Link)`
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

function CentralClub() {
  const navigate = useNavigate();
  const [divisions, setDivisions] = useState([]);
  const firstRow = divisions.slice(0, 4);
  const secondRow = divisions.slice(4, 7);


  const getDivisions = async () => {
    try {
      const res = await customAxios.get(`/v1/clubs/category/divisions`);

      if (res.data.success) {
        const division = res.data.data.map((item) => item);
        setDivisions(division);
        console.log(divisions);
      }
    } catch (error) {
      console.error("Error fetching data : ", error);
    }
  };

  useEffect(() => {
    getDivisions();
  }, []);

  const onClicked = (divisionValue) => {
    navigate(`/central/divisions`, { state: { division: divisionValue } });
  };
  return (
    <div className={styles.division_wrap}>
      <div className={styles.header}>
        <h2 className={styles.header_title}>중앙 동아리</h2>
      </div>
      <div className={styles.division_container}>
        <div className={styles.division_row}>
          {firstRow.map((item, index) => {
            return (
              <div className={styles.division_rectangle} key={index} onClick={() => onClicked(item.code)}>
                <img src={`/central/${item.code}.png`} alt={item.title} className={styles.rectangle_img} />
                <h3 className={styles.title}>{item.title}</h3>
              </div>
            );
          })}
        </div>
        <div className={styles.division_row}>
          {secondRow.map((item, index) => {
            return (
              <div className={styles.division_rectangle} key={index} onClick={() => onClicked(item.code)}>
                <img src={`/central/${item.code}.png`} alt={item.title} className={styles.rectangle_img} />
                <h3 className={styles.title}>{item.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  
}

export default CentralClub;


