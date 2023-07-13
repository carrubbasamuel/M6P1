import React from "react";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { logout } from "../../redux/reducers/LoginSlice";
import "./styles.css";




const NavBar = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.login.userLogged);

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

        {user && user.statusCode===200 ?
          <div className="d-flex">
            <div className={`align-items-center justify-content-center ${user ? "d-flex" : "d-none"}`}>
             
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                <img src={user.statusCode === 200 && user.find.avatar} alt="avatar" className="userimg" />
                  
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/new">New Post</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          :
          null}


      </Container>
    </Navbar>
  );
};

export default NavBar;
