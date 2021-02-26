import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import HomeScreen from './screens/HomeScreen';
import MyProfile from './screens/MyProfile';
import ProfileEditScreen from './screens/ProfileEditScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Container>
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <PrivateRoute path='/profile' component={MyProfile} exact />
          <PrivateRoute
            path='/profile/edit'
            component={ProfileEditScreen}
            exact
          />
          <PrivateRoute
            path='/profile/user/:id'
            component={UserProfileScreen}
            exact
          />
          <PrivateRoute path='/post/create' component={CreatePost} exact />
          <PrivateRoute path='/post/edit/:id' component={EditPost} exact />
          <PrivateRoute path='/' component={HomeScreen} exact />
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
