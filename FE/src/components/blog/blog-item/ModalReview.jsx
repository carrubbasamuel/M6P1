import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineComment } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddReview, fetchGetReviews, setRating, setShowModal } from '../../../redux/reducers/ReviewSlice';
import Rate from './Rate';

import ReviewList from './ReviewList';


function ModalReview(props) {
  const dispatch = useDispatch();
  const showModal = useSelector(state => state.review.showModal);
  const rating = useSelector(state => state.review.rating);

  const handleClose = () => {
    dispatch(setRating(0));
    dispatch(setShowModal(null));
  };

  const handleShow = () => {
    dispatch(setShowModal(props.postId));
    dispatch(fetchGetReviews(props.postId));
  };

  const comment = useRef('');

  const handleSubmit = () => {

    const data = {
      rate: rating,
      comment: comment.current.value,
      postId: props.postId
    }

     dispatch(fetchAddReview(data)).then(()=>{
      dispatch(setRating(0));
      comment.current.value = '';
    }).then(()=>dispatch(fetchGetReviews(props.postId)));
  }



  const isOpen = showModal === props.postId;//unique id for unique modal

  return (


    <div>
      <AiOutlineComment onClick={handleShow} style={{ cursor: 'pointer' }} />
      <Modal size='lg' show={isOpen} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add your Review</Modal.Title>
        </Modal.Header>

        <ReviewList postId={props.postId}/>

        <Form.Group className='p-2' controlId="exampleForm.ControlTextarea1">
          <Form.Label>Add a comment</Form.Label>
          <Form.Control as="textarea" rows={3} ref={comment} />
        </Form.Group>
        <div className='mt-2 p-3 d-flex flex-column align-items-center ' >
          <Rate rating={rating} />
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