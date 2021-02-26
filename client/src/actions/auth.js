import axios from 'axios';
import {
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  USER_LOGOUT
} from '../constants/auth';

export const signInAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SIGN_IN_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      '/api/auth/signin',
      { email, password },
      config
    );

    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: data
    });
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SIGN_IN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const signUpAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SIGN_UP_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      '/api/auth/signup',
      { name, email, password },
      config
    );

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: data
    });

    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const logOutAction = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  //   dispatch({ type: USER_DETAILS_RESET });
};
