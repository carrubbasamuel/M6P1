import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import BlogNotFound from "../blog-notfound/blog-notfound";
import { useLocation } from "react-router-dom";


const BlogList = ({ posts }) => {
  const location = useLocation();

  return (
    <Row>
      {posts && posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} posts={post} />
        </Col>
      ))}
      {posts.length === 0 && location.pathname === '/dashboard' && <BlogNotFound />}
    </Row>
  );
};

export default BlogList;
