import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyProfileAction, UpdateMyProfileAction } from '../actions/user';
import axios from 'axios';
import { Alert } from 'antd';

const ProfileEditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const myProfile = useSelector((state) => state.myProfile);
  const { profile, success } = myProfile;

  useEffect(() => {
    if (!profile) {
      dispatch(getMyProfileAction());
    } else {
      setName(profile.name);
      setEmail(profile.email);
      setImage(profile.image);
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (url) {
      dispatch(UpdateMyProfileAction(name, email, url));
    }
  }, [url]);

  const profileDetails = async () => {
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
    <Container>
      <Link to='/profile' className='btn btn-dark my-3'>
        Back To Profile
      </Link>

      {success && (
        <Alert message='Profile Updated' type='success' className='mt-2 mb-2' />
      )}

      <h3>Edit Profile</h3>

      <>
        <Form.Group controlId='name'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Body</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.File
            id='exampleFormControlFile1'
            label='select image'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          onClick={() => profileDetails()}
        >
          Update
        </Button>
      </>
    </Container>
  );
};

export default ProfileEditScreen;
