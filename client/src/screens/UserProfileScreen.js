import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  followUserAction,
  getUserAction,
  unFollowUserAction
} from '../actions/user';
import { Alert, Image, Spin, Avatar } from 'antd';
import { getuserPostsAction } from '../actions/post';
import Post from '../components/Post';
import { Button } from 'react-bootstrap';

const UserProfileScreen = ({ match }) => {
  const [followSuccess, setFollowSuccess] = useState(false);
  const [unfollowSuccess, setUnFollowSuccess] = useState(false);

  const dispatch = useDispatch();

  const authSignIn = useSelector((state) => state.authSignIn);
  const { userInfo } = authSignIn;

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, user } = usersList;

  const posts = useSelector((state) => state.postsList);

  useEffect(() => {
    dispatch(getUserAction(match.params.id));
    dispatch(getuserPostsAction(match.params.id));
  }, [dispatch, match, followSuccess, unfollowSuccess]);

  const followUserHandle = (id) => {
    dispatch(followUserAction(id));
    setFollowSuccess(true);
  };

  const unfollowUserHandle = (id) => {
    dispatch(unFollowUserAction(id));
    setUnFollowSuccess(true);
  };

  return (
    <div>
      {loading ? (
        <Spin size='large' />
      ) : error ? (
        <Alert message={error} type='error' />
      ) : (
        user && (
          <>
            <div className='row mb-5'>
              <div className='col-md-3'>
                <Avatar size={200} src={<Image src={user.image} />} />
              </div>
              <div className='col-md-9'>
                <div className='d-flex mb-5'>
                  <h3 className='mr-5'>{user.name.toUpperCase()}</h3>
                  {user && user.followers.includes(userInfo && userInfo._id) ? (
                    <Button
                      variant='warning'
                      onClick={() => unfollowUserHandle(match.params.id)}
                    >
                      unfollow
                    </Button>
                  ) : (
                    <Button
                      variant='success'
                      onClick={() => followUserHandle(match.params.id)}
                    >
                      follow
                    </Button>
                  )}
                </div>
                <div className='d-flex'>
                  <h6 className='mr-3'>{posts && posts.length}posts</h6>
                  <h6 className='mr-3'>
                    {user && user.followers.length} followers
                  </h6>
                  <h6>{user && user.following.length} following</h6>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <h3>Posts</h3>
                {posts && posts.length > 0 ? (
                  posts.map((post) => <Post key={post._id} post={post} />)
                ) : (
                  <h3>No Post</h3>
                )}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default UserProfileScreen;
