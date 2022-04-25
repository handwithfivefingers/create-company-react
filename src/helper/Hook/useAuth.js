import axios from "src/config/axios";
import React, { useState, useEffect } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState({
    status: false,
    role: null,
  });

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    let resp = await axios.post("/auth");
    if (resp.status === 200) {
      setAuth({
        status: resp.data.authenticate,
        role: resp.data.role,
      });
    } else {
      setAuth({
        status: false,
        role: null,
      });
    }
  };
  return auth;
};
