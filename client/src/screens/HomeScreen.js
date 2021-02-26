import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../actions/post';
import { Spin, Alert } from 'antd';
import Post from '../components/Post';
import { getUserListAction } from '../actions/user';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postsList);

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;

  useEffect(() => {
    dispatch(getAllPostAction());
    dispatch(getUserListAction());
  }, [dispatch]);

  return (
    <div>
      <div className='row'>
        <div className='col-md-9'>
          {!posts.length ? (
            <Spin size='large' />
          ) : (
            posts.map((post) => <Post key={post._id} post={post} />)
          )}
        </div>
        <div className='col-md-3'>
          <h4 className='mb-3'>Suggestions For You</h4>
          {loading ? (
            <Spin size='large' />
          ) : error ? (
            <Alert message={error} type='error' />
          ) : (
            users &&
            users.map((user) => (
              <div className='d-flex' key={user._id}>
                <Image
                  src={user.image}
                  roundedCircle
                  style={{
                    width: '2rem',
                    height: '2rem',
                    marginRight: '5px',
                    marginBottom: '10px'
                  }}
                />

                <h6>
                  <Link to={`/profile/user/${user._id}`}>{user.name}</Link>
                </h6>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
