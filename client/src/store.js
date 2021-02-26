import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { signInReducer, signUpReducer } from './reducers/authReducer';
import {
  postCreateReducer,
  postReducer,
  postsReducer,
  postUpdateReducer
} from './reducers/postReducer';
import { profileReducer, usersReducer } from './reducers/userReducer';

const reducer = combineReducers({
  authSignIn: signInReducer,
  authSignUp: signUpReducer,
  postCreate: postCreateReducer,
  postsList: postsReducer,
  postSingle: postReducer,
  postUpdate: postUpdateReducer,
  myProfile: profileReducer,
  usersList: usersReducer
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  authSignIn: {
    userInfo: userInfoFromLocalStorage
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
