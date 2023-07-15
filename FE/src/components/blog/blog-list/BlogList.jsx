import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthors } from "../../../redux/reducers/PostSlice";
import BlogItem from "../blog-item/BlogItem";

const BlogList = ({posts}) => {
  const dispatch = useDispatch();
  let authors = useSelector((state) => state.author.data);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  if(posts){
    authors = posts;
  }

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
