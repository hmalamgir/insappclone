import axios from 'axios';
import {
  FETCH_POST_FAIL,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  GET_MY_POSTS,
  POST_ADD_COMMENT,
  POST_ALL_FAIL,
  POST_ALL_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE,
  POST_DELETE_COMMENT,
  POST_LIKE,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  FETCH_POSTS_BY_USER,
  POST_EDIT_COMMENT
} from '../constants/post';

// POST CREATE
export const postCreateAction = (title, body, url) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: POST_CREATE_REQUEST
    });

    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.post('/api/posts', { title, body, image: url }, config);

    dispatch({
      type: POST_CREATE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// GET ALL POST
export const getAllPostAction = () => async (dispatch, getState) => {
  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get('/api/posts', config);

    dispatch({
      type: POST_ALL_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// GET POSTS BY USER
export const getuserPostsAction = (userId) => async (dispatch, getState) => {
  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/posts/user/${userId}`, config);

    dispatch({
      type: FETCH_POSTS_BY_USER,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// GET MY POSTS
export const getMyPostsAction = () => async (dispatch, getState) => {
  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get('/api/posts/myposts', config);

    dispatch({
      type: GET_MY_POSTS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// GET SINGLE POST
export const getSinglePostAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_POST_REQUEST
    });

    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/posts/${id}`, config);

    dispatch({
      type: FETCH_POST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// UPDATE POST
export const postUpdateAction = (id, title, body, url) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: POST_UPDATE_REQUEST
    });

    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `/api/posts/${id}`,
      { title, body, image: url },
      config
    );

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// DELETE POST
export const postDeleteAction = (id) => async (dispatch, getState) => {
  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/posts/${id}`, config);

    dispatch({
      type: POST_DELETE,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: POST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// LIKE POST
export const postLikeAction = (id) => async (dispatch, getState) => {
  try {
    const {
      authSignIn: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.patch(`/api/posts/${id}`, {}, config);

    dispatch({
      type: POST_LIKE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// ADD COMMENT
export const addCommentAction = (id, text) => async (dispatch, getState) => {
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
      `/api/posts/${id}/comments/add`,
      { text },
      config
    );

    dispatch({
      type: POST_ADD_COMMENT,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// DELETE COMMENT
export const deleteCommentAction = (id, comment) => async (
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
      `/api/posts/${id}/comments/delete`,
      { comment },
      config
    );

    dispatch({
      type: POST_DELETE_COMMENT,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// EDIT COMMENT
export const editCommentAction = (id, commentId, text) => async (
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
      `/api/posts/${id}/comments/edit`,
      { commentId, text },
      config
    );

    dispatch({
      type: POST_EDIT_COMMENT,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: POST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
