import { AUTH, AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER } from "../type/auth.type";
import axios from "src/config/axios";
import AuthService from "src/service/AuthService";
import history from "src/helper/history";
import { message } from "antd";
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

export const AuthRegister = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_REGISTER.REQUEST,
    });

    let resp = await AuthService.onRegister(form);

    if (resp.data.message === "Sent attachments ok") {
      // console.log(role);
      message.success("Tạo tài khoản thành công");
      let { role } = resp.data.info;
      dispatch({
        type: AUTH_REGISTER.SUCCESS,
        payload: {
          status: true,
          role,
        },
      });
    } else {
      message.error(resp.data.message);
      dispatch({
        type: AUTH_REGISTER.FAILURE,
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
