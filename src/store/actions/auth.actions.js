import { AUTH, AUTH_LOGIN, AUTH_LOGOUT } from "../type/auth.type";
import axios from "src/config/axios";
import AuthService from "src/service/AuthService";
import history from "src/helper/history";
export const AuthUser = () => {
  return (dispatch) => {
    dispatch({
      type: AUTH.AUTH_REQUEST,
    });
    axios
      .post("/auth")
      .then((res) => {
        dispatch({
          type: AUTH.AUTH_SUCCESS,
          payload: {
            status: res.data.authenticate,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTH.AUTH_FAILURE,
        });
      });
  };
};

export const AuthLogin = (val) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOGIN.REQUEST,
    });
    try {
      const resp = await AuthService.onLogin(val);
      if (resp.status === 200) {
        dispatch({
          type: AUTH_LOGIN.SUCCESS,
          payload: {
            status: resp.data.authenticate,
            role: resp.data.data.role,
          },
        });
        return resp.data.callbackUrl;
      }
    } catch (err) {
      dispatch({
        type: AUTH_LOGIN.FAILURE,
      });
    }
  };
};

export const AuthLogout = () => {
  return async (dispatch) => {
    await axios.post("/logout");
    dispatch({
      type: AUTH_LOGOUT.SUCCESS,
      payload: {},
    });
  };
};
