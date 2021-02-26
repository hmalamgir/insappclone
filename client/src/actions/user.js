import axios from 'axios';
import {
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_MY_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_USER_SUCCESS,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../constants/user';

export const getMyProfileAction = () => async (dispatch, getState) => {
  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get('/api/user', config);

    dispatch({
      type: GET_MY_PROFILE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const UpdateMyProfileAction = (name, email, url) => async (
  dispatch,
  getState
) => {
  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      '/api/user',
      { name, email, image: url },
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getUserListAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_USER_REQUEST
  });

  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    let { data } = await axios.get('/api/user/all', config);

    data = data.filter((el) => el._id !== userInfo._id);

    dispatch({
      type: GET_ALL_USER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getUserAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_USER_REQUEST
  });

  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/user/all/${id}`, config);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const followUserAction = (followId) => async (dispatch, getState) => {
  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.patch(
      `/api/user/follow/${followId}`,
      { followId },
      config
    );

    dispatch({
      type: FOLLOW_USER,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const unFollowUserAction = (unfollowId) => async (
  dispatch,
  getState
) => {
  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.patch(
      `/api/user/unfollow/${unfollowId}`,
      { unfollowId },
      config
    );

    dispatch({
      type: UNFOLLOW_USER,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
