import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineComment } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { fetchAddReview, fetchGetReviews } from '../../../redux/reducers/ReviewSlice';
import Rate from './Rate';

import ReviewList from './ReviewList';


function ModalReview(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0 || props.rate);

  const handleClose = () => {
    setRating(0);
    setShow(false)
  };

  const handleShow = () => {
    setShow(true);
    dispatch(fetchGetReviews(props.postId));
  };

  const comment = useRef('');

  const handleSubmit = async () => {

    const data = {
      rate: rating,
      comment: comment.current.value,
      postId: props.postId
    }

    await dispatch(fetchAddReview(data)).then(()=>{
      setRating(0);
      comment.current.value = '';
       dispatch(fetchGetReviews(props.postId))
    });
  }


  return (


    <div>
      <AiOutlineComment onClick={handleShow} style={{ cursor: 'pointer' }} />
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add your Review</Modal.Title>
        </Modal.Header>

        <ReviewList postId={props.postId} setRating={setRating} />

        <Form.Group className='p-2' controlId="exampleForm.ControlTextarea1">
          <Form.Label>Add a comment</Form.Label>
          <Form.Control as="textarea" rows={3} ref={comment} />
        </Form.Group>
        <div className='mt-2 p-3 d-flex flex-column align-items-center ' >
          <Rate rating={rating} setRating={setRating} />
        </div>
        <Modal.Footer className='mt-2'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant='success' onClick={handleSubmit}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}



export default ModalReview;