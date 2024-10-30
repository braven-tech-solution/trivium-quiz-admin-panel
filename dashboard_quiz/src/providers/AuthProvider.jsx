/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { AuthContext } from "../context";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ _id: "äsd", role: "admin" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const _id = cookies.get("quiz_userId");
    setLoading(true);

    if (_id) {
      const email = cookies.get("quiz_userEmail");
      const role = cookies.get("quiz_userRole");
      const userName = cookies.get("quiz_userName");
      setAuth({ _id, email, role, userName });
    } else {
      setAuth({});
    }
    setLoading(false);
  }, []);

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
