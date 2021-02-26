import {
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  USER_LOGOUT
} from '../constants/auth';

export const signInReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { loading: true };
    case SIGN_IN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case SIGN_IN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const signUpReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return { loading: true };
    case SIGN_UP_SUCCESS:
      return { loading: false };
    case SIGN_UP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//   export const userDetailsReducer = (state = { user: {} }, action) => {
//     switch (action.type) {
//       case USER_DETAILS_REQUEST:
//         return { ...state, loading: true };
//       case USER_DETAILS_SUCCESS:
//         return { loading: false, user: action.payload };
//       case USER_DETAILS_FAIL:
//         return { loading: false, error: action.payload };
//       case USER_DETAILS_RESET:
//         return { user: {} };
//       default:
//         return state;
//     }
//   };
