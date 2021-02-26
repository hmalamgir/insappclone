import {
  FETCH_POST_FAIL,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  POST_ALL_FAIL,
  POST_ALL_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE,
  POST_LIKE,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_RESET,
  POST_ADD_COMMENT,
  POST_DELETE_COMMENT,
  GET_MY_POSTS,
  FETCH_POSTS_BY_USER,
  POST_EDIT_COMMENT
} from '../constants/post';

export const postCreateReducer = (post = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return post;
  }
};

export const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case POST_ALL_SUCCESS:
    case GET_MY_POSTS:
    case FETCH_POSTS_BY_USER:
      return action.payload;
    case POST_DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case POST_LIKE:
    case POST_ADD_COMMENT:
    case POST_DELETE_COMMENT:
    case POST_EDIT_COMMENT:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case POST_ALL_FAIL:
      return { error: action.payload };

    default:
      return posts;
  }
};

export const postReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      return { loading: true };
    case FETCH_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload
      };

    case FETCH_POST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true };
    case POST_UPDATE_SUCCESS:
      return {
        loading: false,
        post: action.payload,
        success: true
      };
    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_UPDATE_RESET:
      return { post: {} };

    default:
      return state;
  }
};
