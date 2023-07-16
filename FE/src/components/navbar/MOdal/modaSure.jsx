import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDelete, fetchValidationDelete, logout, setValidationDelate } from '../../../redux/reducers/LoginSlice';

export default function ModalSure(props) {

    const user = useSelector((state) => state.login.userLogged)
    const isDeletable = useSelector((state) => state.login.isDeleteble)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(fetchDelete()).then(() => {
            dispatch(logout());
            navigate("/");
        })
    }

    const handleChange = (value) => {
        const data = {
            password: value,
        }
        dispatch(fetchValidationDelete(data)).then(() => {
            console.log('isDeletable', isDeletable)
        })
    }

    const handleClose = () => {
        dispatch(setValidationDelate(false))
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <div className='p-3' >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" >
                        Are you sure to delate your account?<strong className='text-danger'>  {user && user.user.email}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please insert your password...</p>
                    <InputGroup size="sm" className="mb-3 costumInput">
                        <InputGroup.Text rounded id="inputGroup-sizing-sm" className='p-0'>
                            {isDeletable ? <Button variant="danger" className='m-0' onClick={handleClick}>Delete</Button> : <Button variant="danger" className='m-0' disabled>Delete</Button>}
                        </InputGroup.Text>
                        <Form.Control
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-light' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </div>

        </Modal>
    );
}