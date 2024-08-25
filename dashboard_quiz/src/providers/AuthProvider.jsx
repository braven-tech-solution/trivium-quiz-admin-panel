/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { AuthContext } from "../context";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ _id: "äsd", role: "admin" });
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const _id = cookies.get("cpd_userId");

  //   if (_id) {
  //     const email = cookies.get("cpd_userEmail");
  //     const role = cookies.get("cpd_userRole");
  //     const userName = cookies.get("cpd_userName");
  //     setAuth({ _id, email, role, userName });
  //   } else {
  //     setAuth({});
  //   }
  //   setLoading(false);
  // }, []);

  const authInfo = {
    auth,
    setAuth,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
