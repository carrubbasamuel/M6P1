import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthors } from "../../../redux/reducers/AuthorSlice";
import BlogItem from "../blog-item/BlogItem";

const BlogList = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.author.data);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);


  return (
    <Row>
      {authors && authors.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
