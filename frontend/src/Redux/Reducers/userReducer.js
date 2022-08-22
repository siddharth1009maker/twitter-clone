import {
  LOGIN_GOOGLE_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
} from "../Constants/userConstants";
const initialState = { isLoggedIn: false, data: {} };
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, isLoggedIn: true, error: {} };
    case LOGIN_USER_FAIL:
      return { ...state, user: {}, error: action.payload, isLoggedIn: false };
    case LOGIN_GOOGLE_USER_SUCCESS:
      return { ...state, user: action.payload, isLoggedIn: true, error: {} };

    case LOGOUT_USER_SUCCESS:
      return { ...state, isLoggedIn: false, data: {}, error: {} };
    case REGISTER_USER_SUCCESS:
      return { ...state };
    case REGISTER_USER_FAIL:
      return { ...state, isLoggedIn: false, data: {}, error: action.payload };
    default:
      return state;
  }
};
export default usersReducer;
