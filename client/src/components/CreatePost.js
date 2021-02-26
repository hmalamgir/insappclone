import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';
import { postCreateAction } from '../actions/post';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const postCreate = useSelector((state) => state.postCreate);
  const { loading, error, success } = postCreate;

  useEffect(() => {
    if (url) {
      dispatch(postCreateAction(title, body, url));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, url]);

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
        <h3>Create Post</h3>
        {loading && <Spin size='large' />}
        {error && <Alert message={error} type='error' />}
        {success && <Alert message='Post Created' type='success' />}

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

        <Button variant='primary' type='submit' onClick={() => postDetails()}>
          Submit
        </Button>
      </Container>
    </>
  );
};

export default CreatePost;
