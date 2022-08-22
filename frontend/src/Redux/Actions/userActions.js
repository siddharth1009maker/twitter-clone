import axios from "../../api";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_GOOGLE_USER_SUCCESS,
  LOGIN_GOOGLE_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from "../Constants/userConstants";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
export const LoginUser = (data) => (dispatch) => {
  console.log("Login User Called");
  axios
    .post("/users/login", {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      //Save to local storage
      const { token } = res.data;
      //Set token to local Storage
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      // Set the User in Auth state by decoding token to get user data
      const decoded = jwt_decode(token);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: decoded });
    })
    .catch((err) => dispatch({ type: LOGIN_USER_FAIL, payload: err }));
};

export const registerUser = (data,history) => (dispatch) => {
  axios
    .post("/users/register", {
      name: data.name,
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      dispatch({ type: REGISTER_USER_SUCCESS });
      history('/home')
    })
    .catch((err) => dispatch({ type: REGISTER_USER_FAIL, payload: err }));
};

export const LoginGoogle = (data) => (dispatch) => {
  axios
    .get("/users/auth/google/token")
    .then((res) =>
      dispatch({ type: LOGIN_GOOGLE_USER_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: LOGIN_GOOGLE_USER_FAIL, payload: err }));
};

export const setCurrentUser = (data) => (dispatch) => {
  if (data) dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  else dispatch({ type: LOGOUT_USER_SUCCESS });
};
export const setCurrentUserFromToken = (token) => (dispatch) => {
  localStorage.setItem("jwtToken", token);
  // Set token to auth header
  setAuthToken(token);
  // Set the User in Auth state by decoding token to get user data
  const decoded = jwt_decode(token);
  dispatch({ type: LOGIN_USER_SUCCESS, payload: decoded });
};
export const logoutUser = () => (dispatch) => {
  // Remove token
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object
  dispatch(setCurrentUser(null));
};
