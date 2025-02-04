// src/auth/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "./AuthService";

const PrivateRoute = () => {
    const isAuthenticated = !!getAccessToken(); // 토큰이 존재하는지 확인

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;