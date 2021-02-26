import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { editCommentAction } from '../../actions/post';

const EditComment = ({ comment, postId }) => {
  const [text, setText] = useState(comment && comment.text);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  return (
    <>
      <EditOutlined
        className='ml-auto mt-3'
        style={{
          fontSize: '10px',
          cursor: 'pointer'
        }}
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              dispatch(editCommentAction(postId, comment._id, text));
            }}
          >
            Comment
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditComment;
