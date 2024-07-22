import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import styles from "./layout.module.css";

function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <SideBar />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
