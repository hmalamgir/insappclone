import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyProfileAction } from '../actions/user';
import { Spin } from 'antd';
import { Button, Image } from 'react-bootstrap';
import { getMyPostsAction } from '../actions/post';
import Post from '../components/Post';
import FollowersList from '../components/modelComponents/FollowersList';
import FollowingList from '../components/modelComponents/FollowingList';

const MyProfile = () => {
  const dispatch = useDispatch();

  const myProfile = useSelector((state) => state.myProfile);
  const { profile } = myProfile;

  const posts = useSelector((state) => state.postsList);

  useEffect(() => {
    dispatch(getMyProfileAction());
    dispatch(getMyPostsAction());
  }, [dispatch]);

  return (
    <div>
      {!profile ? (
        <Spin size='large' />
      ) : (
        <>
          <div className='row mb-5'>
            <div className='col-md-3'>
              <Image
                src={profile.image}
                roundedCircle
                style={{
                  width: '15rem',
                  height: '15rem',
                  marginRight: '5px',
                  marginBottom: '10px'
                }}
              />
            </div>
            <div className='col-md-9'>
              <div className='d-flex mb-5'>
                <h3 className='mr-5'>{profile.name.toUpperCase()}</h3>
                <Link to='/profile/edit'>
                  <Button variant='success'>Edit Profile</Button>
                </Link>
              </div>
              <div className='d-flex'>
                <h6 className='mr-3'>{posts && posts.length} posts</h6>
                <FollowersList profile={profile} />
                <FollowingList profile={profile} />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <h3>Posts</h3>
              {posts && posts.length ? (
                posts.map((post) => <Post key={post._id} post={post} />)
              ) : (
                <h3>No Post</h3>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProfile;
