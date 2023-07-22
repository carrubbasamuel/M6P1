import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAuthors } from "../../../redux/reducers/PostSlice";
import BlogItem from "../blog-item/BlogItem";
import BlogNotFound from "../blog-notfound/blog-notfound";

const BlogList = () => {
  const dispatch = useDispatch();
  let authors = useSelector((state) => state.author.data);
  const location = useLocation();


  useEffect(() => {
    if (location.pathname === "/dashboard") {
      return
    } else {
    dispatch(fetchAuthors());
    }
  }, [dispatch, location.pathname]);



  
  

  return (
    <Row>
      {authors && authors.map((post, i) => (
        <Col key={`item-${i}`} md={4} style={{ marginBottom: 50 }}>
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
      {authors === null && <BlogNotFound />}
      
    </Row>
  );
};

export default BlogList;
