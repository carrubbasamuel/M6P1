import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import ModalSure from './modaSure';


export default function ModalProfile(props) {
  const user = useSelector((state) => state.login.userLogged)
  const [modalSure, setModalSure] = useState(false);


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
        <Button variant='danger' onClick={() => setModalSure(true)}>Delete Profile</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-light' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      <ModalSure show={modalSure} onHide={() => setModalSure(false)} />
    </Modal>
  );
}