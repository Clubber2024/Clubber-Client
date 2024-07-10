import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Admin() {
  const [club, setClub] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(accessToken);
  const currentUserId = decodedToken.adminId; // JWT 구조에 따라 다를 수 있습니다.
  console.log("currentUSERID: ", currentUserId);
  const getClub = async () => {};

  return <></>;
}
