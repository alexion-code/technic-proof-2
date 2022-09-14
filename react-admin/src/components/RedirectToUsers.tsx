import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToUsers = () => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/users");
  });
  return null;
};

export default RedirectToUsers;
