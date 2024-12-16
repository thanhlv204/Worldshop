/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useEffect, useRef } from "react";

const Private = ({ children }) => {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const hasRedirected = useRef(false);
  useEffect(() => {
    if (!user || user.role !== 1) {
      if (!hasRedirected.current) {
        message.error("Bạn không có quyền truy câp vào trang này!", 2);
        nav("/");
        hasRedirected.current = true;
      }
    }
  }, [user, nav]);

  if (!user || user.role !== 1) {
    return null;
  }

  return children;
};

export default Private;
