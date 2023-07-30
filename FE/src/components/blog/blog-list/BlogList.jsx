import React from "react";
import { Col, Row } from "react-bootstrap";
import { Fade } from "react-reveal";
import { useLocation } from "react-router-dom";
import BlogItem from "../blog-item/BlogItem";
import BlogNotFound from "../blog-not/blog-notfound";
import BlogNotSaved from "../blog-not/blog-notsaved";
import "./styles.css";


const BlogList = ({ posts, saveZone }) => {
  const location = useLocation();
  console.log(saveZone)
  return (
    <Row>
      {posts && posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          className="col-card"
        >
          <Fade bottom duration={1000} delay={i * 100}>
            <BlogItem key={post.title} posts={post} />
          </Fade>
        </Col>
      ))}
      {posts?.length === 0 && location.pathname === '/dashboard' && saveZone === undefined && <BlogNotFound />}
      {posts?.length === 0 && location.pathname === '/dashboard' && saveZone === true &&  <BlogNotSaved />}
    </Row>
  );
};

export default BlogList;
