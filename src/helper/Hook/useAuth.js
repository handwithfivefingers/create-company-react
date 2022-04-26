import axios from "src/config/axios";
import React, { useState, useEffect } from "react";
import { AuthAction } from "src/store/actions";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AuthAction.AuthUser());
  }, []);
  return authReducer; // status:true false, role: admin user 
};
