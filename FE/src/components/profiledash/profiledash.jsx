import React, { useRef } from 'react';
import { Col, Container, Dropdown, Image, Row } from 'react-bootstrap';
import { BsGear } from 'react-icons/bs';
import { GrUpdate } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateAvatar } from '../../redux/reducers/LoginSlice';
import { fetchMyPosts } from '../../redux/reducers/PostSlice';
import ModalDelete from './ModalDelete';
import './profiledash.css';

const ProfileDash = () => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);
    const { user } = useSelector((state) => state.login.userLogged);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        dispatch(fetchUpdateAvatar(e.target.files[0])).then(() => dispatch(fetchMyPosts()));
    };


    const handleUpdateClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div style={{ margin: '80px 0' }}>
            <Container>
                <Row className='align-items-center'>
                    <Col className='text-center '>
                        <div className='position-relative'>
                            <Image src={user?.avatar} roundedCircle width={250} height={250} className='shadow imgdash' />

                            <div className='changeprofile'>
                                <div className='update-avatar' onClick={handleUpdateClick}>
                                    <GrUpdate />
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type='file'
                                    accept='image/*'
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <h1>
                                {user?.surname} {user?.name}
                            </h1>
                            <h3>{user?.email}</h3>

                        </div>
                        <div className="ms-5 fs-3">

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    <BsGear className='gearani' />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" onClick={() => setModalShow(true)}>Delete your account</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            
                        </div>

                    </Col>
                </Row>
            </Container>
            <ModalDelete show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
};

export default ProfileDash;
