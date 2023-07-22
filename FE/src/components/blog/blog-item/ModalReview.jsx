import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineComment } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { fetchAddReview, fetchGetReviews } from '../../../redux/reducers/ReviewSlice';

import ReviewList from './ReviewList';


function ModalReview(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    dispatch(fetchGetReviews(props.postId));
  };

  const rate = useRef(0);
  const comment = useRef('');

  const handleSubmit = () => {

    const data = {
      rate: rate.current.value,
      comment: comment.current.value,
      postId: props.postId
    }

    dispatch(fetchAddReview(data)).then(dispatch(fetchGetReviews(props.postId)));
  }


  return (
    <>
      <AiOutlineComment onClick={handleShow} style={{ cursor: 'pointer' }} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add your Review</Modal.Title>
        </Modal.Header>

        <ReviewList />
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Rating</Form.Label>
          <Form.Control as="select" ref={rate}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Form.Control>
        </Form.Group>
        <div className='d-flex '>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3} ref={comment} />
          </Form.Group>
          <Button className='m-3' onClick={handleSubmit}>Add</Button>
        </div>


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



export default ModalReview;