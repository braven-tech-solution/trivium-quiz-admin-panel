import React from "react";
import { useAuth } from "../../hooks/useAuth";

const NavGaurd = ({ children, accesslist = [] }) => {
  const { auth } = useAuth();

  if (
    accesslist.includes(auth?.role) ||
    accesslist?.length === 0 ||
    auth?.role === "admin"
  ) {
    return children;
  } else {
    return <></>;
  }
};

export default NavGaurd;
