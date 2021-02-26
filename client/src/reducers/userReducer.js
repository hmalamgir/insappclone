import {
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_MY_PROFILE,
  GET_USER_SUCCESS,
  PROFILE_ERROR,
  UPDATE_PROFILE
} from '../constants/user';

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_PROFILE:
      return {
        profile: action.payload
      };
    case UPDATE_PROFILE:
      return {
        profile: action.payload,
        success: true
      };

    case PROFILE_ERROR:
      return { error: action.payload };

    default:
      return state;
  }
};

export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload
      };
    case GET_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload
      };
    case GET_ALL_USER_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
