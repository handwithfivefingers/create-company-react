import { AUTH, AUTH_LOGIN, AUTH_LOGOUT } from "src/store/type/auth.type";

const initState = {
  status: "",
  role: "",
  authenticating: false,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    // Auth
    case AUTH.AUTH_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case AUTH.AUTH_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        role: action.payload.role,
        authenticating: false,
      };
    case AUTH.AUTH_FAILURE:
      return {
        ...state,
        authenticating: false,
      };
    // Login
    case AUTH_LOGIN.REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case AUTH_LOGIN.SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        role: action.payload.role,
        authenticating: false,
      };
    case AUTH_LOGIN.FAILURE:
      return {
        ...state,
        authenticating: false,
      };

    case AUTH_LOGOUT.SUCCESS:
      return initState;
    default:
      return state;
  }
};
export default AuthReducer;
