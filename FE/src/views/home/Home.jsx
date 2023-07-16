import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import BlogList from "../../components/blog/blog-list/BlogList";
import Header from "../../components/headers/headers";
import "./styles.css";


const Home = props => {
  const user = useSelector(state => state.login.userLogged);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <Container fluid="sm">
      <Header name={user && user.user.name} />
      <BlogList />
    </Container>
  );
};

export default Home;
