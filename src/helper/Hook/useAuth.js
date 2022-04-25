import axios from "src/config/axios";
import React, { useState, useEffect } from "react";
import { AuthAction } from "src/store/actions";
import { useDispatch, useSelector } from "react-redux";
export const useAuth = () => {
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  // const [auth, setAuth] = useState({
  //   status: false,
  //   role: null,
  // });
  useEffect(() => {
    console.log("1st");
    dispatch(AuthAction.AuthUser());
    // authenticate();
  }, []);
  // const authenticate = async () => {
  //   let resp = await axios.post("/auth");
  //   if (resp.status === 200) {
  //     setAuth({
  //       status: resp.data.authenticate,
  //       role: resp.data.role,
  //     });
  //   } else {
  //     setAuth({
  //       status: false,
  //       role: null,
  //     });
  //   }
  // };
  return authReducer;
};
