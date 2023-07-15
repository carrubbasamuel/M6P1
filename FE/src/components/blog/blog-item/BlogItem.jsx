import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = (props) => {
  const { title, cover, author, _id } = props;
  return (
    
      <Card className="blog-card">
        <Card.Img   variant="top" src={cover} className="blog-cover" />
        <Card.Body as={Link} to={`/blog/${_id}`}>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-">
          <BlogAuthor {...author} />
        </Card.Footer>
      </Card>
  
  );
};

export default BlogItem;
