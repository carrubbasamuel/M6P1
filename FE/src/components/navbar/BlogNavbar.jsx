import React from "react";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { logout } from "../../redux/reducers/LoginSlice";
import ModalProfile from "./MOdal/modal";
import "./styles.css";




const NavBar = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.login.userLogged);
  const [modal, setModal] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>

        {user && user.statusCode === 200 ?
          <div className="d-flex">
            <div className={`align-items-center justify-content-center ${user ? "d-flex" : "d-none"}`}>

              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <img src={user.statusCode === 200 && user.user.avatar} alt="avatar" className="userimg" />

                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setModal(true)}>Profile<MdOutlineManageAccounts className="ms-3"/></Dropdown.Item>
                  <Dropdown.Item as={Link} to="/dashboard">Dashboard <LuLayoutDashboard className="ms-3"/> </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/new">New Post <BsFileEarmarkPlus className="ms-3"/> </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout <BiLogOut className="ms-3"/> </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <ModalProfile show={modal} onHide={() => setModal(false)} />
            </div>
          </div>
          :
          null}


      </Container>
    </Navbar>
  );
};

export default NavBar;
