import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, LikeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCommentAction,
  deleteCommentAction,
  postDeleteAction,
  postLikeAction
} from '../actions/post';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Image } from 'react-bootstrap';
import { Comment, Avatar } from 'antd';
import EditComment from './modelComponents/EditComment';
import Moment from 'react-moment';

const Post = ({ post }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const authSignIn = useSelector((state) => state.authSignIn);
  const { userInfo } = authSignIn;

  return (
    <>
      <Card style={{ width: '30rem', marginBottom: '4rem' }}>
        <Card.Img variant='top' src={post.image} />
        {userInfo && userInfo._id === post.postedBy._id ? (
          <span className='ml-auto mr-2'>
            <Link to={`/post/edit/${post._id}`}>
              <EditOutlined
                style={{
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              />
            </Link>
            <DeleteOutlined
              style={{
                fontSize: '16px',
                cursor: 'pointer',
                marginLeft: '1rem'
              }}
              onClick={() => dispatch(postDeleteAction(post._id))}
            />
          </span>
        ) : null}

        <Card.Body>
          <Card.Title>
            <div className='d-flex'>
              <Image
                src={post.postedBy.image}
                roundedCircle
                style={{
                  width: '2rem',
                  height: '2rem',
                  marginRight: '5px',
                  marginBottom: '10px'
                }}
              />
              <Link to={`/profile/user/${post.postedBy._id}`}>
                {post.postedBy.name}
              </Link>
              <span
                style={{
                  fontSize: '12px',
                  marginLeft: 'auto',
                  marginTop: '4px'
                }}
              >
                <Moment fromNow>{post.createdAt}</Moment>
              </span>
            </div>
          </Card.Title>
          <Card.Title> {post.title} </Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <LikeOutlined
            style={{
              fontSize: '30px',
              color: '#08c',
              cursor: 'pointer',
              marginBottom: '15px'
            }}
            onClick={() => dispatch(postLikeAction(post._id))}
          />{' '}
          <span>
            {post.likes.length}{' '}
            {post.likes.length < 2 ? <span>like</span> : <span>likes</span>}
          </span>
          {post &&
            post.comments.length > 0 &&
            post.comments.map((comment) => (
              <div key={comment._id} className='d-flex'>
                <Comment
                  key={comment._id}
                  author={comment.name}
                  avatar={
                    <Link to={`/profile/user/${comment.user}`}>
                      <Avatar src={comment.image} alt='image' />
                    </Link>
                  }
                  content={<p>{comment.text}</p>}
                />

                {userInfo && userInfo._id === comment.user ? (
                  <span className='ml-auto'>
                    <EditComment comment={comment} postId={post._id} />

                    <DeleteOutlined
                      className='ml-3 mt-3'
                      style={{
                        fontSize: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={() =>
                        dispatch(deleteCommentAction(post._id, comment))
                      }
                    />
                  </span>
                ) : null}
              </div>
            ))}
          <>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Enter Comment'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            <Button
              variant='warning'
              onClick={() => {
                dispatch(addCommentAction(post._id, text));
                setText('');
              }}
            >
              Comment
            </Button>
          </>
        </Card.Body>
      </Card>
    </>
  );
};

export default Post;
