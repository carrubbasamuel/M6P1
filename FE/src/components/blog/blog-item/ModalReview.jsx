import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { fetchAddReview } from '../../../redux/reducers/ReviewSlice';


function ModalReview(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rate = useRef(0);
  const comment = useRef('');

  const handleSubmit = () => {

    const data = {
      rate: rate.current.value,
      comment: comment.current.value,
      postId: props.postId
    }
    
    dispatch(fetchAddReview(data)); 
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Rating</Form.Label>
          <Form.Control as="select" ref={rate}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" rows={3} ref={comment} />
        </Form.Group>
        <Button onClick={handleSubmit}>Add</Button>


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



export default ModalReview;