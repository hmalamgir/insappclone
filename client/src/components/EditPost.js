import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { getSinglePostAction, postUpdateAction } from '../actions/post';
import { POST_UPDATE_RESET } from '../constants/post';

const EditPost = ({ match }) => {
  const postId = match.params.id;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const postSingle = useSelector((state) => state.postSingle);
  const { loading, error, post } = postSingle;

  const postUpdate = useSelector((state) => state.postUpdate);
  const { success } = postUpdate;

  useEffect(() => {
    dispatch(getSinglePostAction(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
    }
  }, [post]);

  useEffect(() => {
    if (url) {
      dispatch(postUpdateAction(postId, title, body, url));
    } else {
      dispatch({ type: POST_UPDATE_RESET });
    }
  }, [url]);

  const postDetails = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'ins-clone');
    data.append('cloud_name', 'dpdsz0aoa');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dpdsz0aoa/image/upload',
        data
      );
      setUrl(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Link to='/profile' className='btn btn-dark my-3'>
          Back To Profile
        </Link>
        {success && <Alert message='Post Updated' type='success' />}
        <h3>Edit Post</h3>

        {loading ? (
          <Spin size='large' />
        ) : error ? (
          <Alert message={error} type='error' />
        ) : (
          <>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='body'>
              <Form.Label>Body</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Body'
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.File
                id='exampleFormControlFile1'
                label='Add Image'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              onClick={() => postDetails()}
            >
              Submit
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default EditPost;
