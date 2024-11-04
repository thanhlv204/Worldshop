/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Private = ({ children }) => {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user || user !== 1) {
      message.destroy();
      message.error("Bạn không có quyền truy câp vào trang này!");
      nav("/");
    }
  }, [user, nav]);

  return user && user === 1 ? children : null;
};

export default Private;
