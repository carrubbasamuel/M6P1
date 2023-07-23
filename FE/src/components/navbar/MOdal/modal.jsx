import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDelete } from '../../../redux/reducers/LoginSlice';
import { useNavigate } from 'react-router-dom';



export default function ModalProfile(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.userLogged)

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <h4>{user && user.user.email}</h4>
          <img src={user && user.user.avatar} alt="avatar" className="userimg" />
          <h3>{user && user.user.name}</h3>
          <h3>{user && user.user.surname}</h3>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </div>
        <Button variant='danger' onClick={() => dispatch(fetchDelete()).then(()=> navigate('/'))}>Delete Profile</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-light' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}