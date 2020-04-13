import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types/actionTypes";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import { apiEndpoint } from "../../utils/apiEndpoint";
import { setAlert } from "./alertAction";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(apiEndpoint + "/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios({
      method: "POST",
      url: `${apiEndpoint}/api/auth`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      for (let error of errors) {
        dispatch(setAlert(error.msg, "danger"));
      }
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
