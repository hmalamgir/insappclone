import React, { useState } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FollowingList = ({ profile }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h6 className='mr-3' onClick={handleShow} style={{ cursor: 'pointer' }}>
        {profile && profile.following.length} following
      </h6>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Following</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {profile &&
            profile.following.map((person) => (
              <div className='d-flex' key={person && person._id}>
                <Image
                  src={person && person.image}
                  roundedCircle
                  style={{
                    width: '2rem',
                    height: '2rem',
                    marginRight: '5px',
                    marginBottom: '10px'
                  }}
                />

                <h6>
                  <Link to={`/profile/user/${person && person._id}`}>
                    {person && person.name}
                  </Link>
                </h6>
              </div>
            ))}
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

export default FollowingList;
