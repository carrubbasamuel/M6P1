import React from "react";
import { Card } from "react-bootstrap";
import { TiDocumentDelete } from 'react-icons/ti';
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchDeletePost, fetchMyPosts } from "../../../redux/reducers/PostSlice";
import BlogAuthor from "../blog-author/BlogAuthor";
import ModalReview from "./ModalReview";
import EditMode from "./editmode";
import "./styles.css";


const BlogItem = ({ posts }) => {
  const { title, cover, author, _id } = posts;
  const location = useLocation();
  const dispatch = useDispatch();


  return (
    <Card className="blog-card shadow">
      <Card.Img variant="top" src={cover} className="blog-cover" />
      <Card.Body as={Link} to={`/blog/${_id}`}>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <BlogAuthor {...author} />
        <div className="d-flex align-items-center justify-content-center fs-4">
        <EditMode />
        <ModalReview postId={_id} />
        
        {location.pathname === "/dashboard"
          && <TiDocumentDelete onClick={() => dispatch(fetchDeletePost(_id)).then(()=> dispatch(fetchMyPosts()))} style={{ cursor: 'pointer' }} />}

        </div>
        
      </Card.Footer>
    </Card>

  );
};

export default BlogItem;
