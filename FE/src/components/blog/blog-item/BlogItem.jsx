import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchDeletePost, fetchMyPosts } from "../../../redux/reducers/PostSlice";
import BlogAuthor from "../blog-author/BlogAuthor";
import ModalReview from "./ModalReview";
import ReviewList from "./ReviewList";
import "./styles.css";


const BlogItem = (props) => {
  const { title,cover, author, _id, setPosts } = props;
  const location = useLocation();
  const dispatch = useDispatch();


  return (
    <Card className="blog-card shadow">
      <Card.Img variant="top" src={cover.includes('http') ? cover : `http://localhost:3003/images/${cover}`} className="blog-cover" />
      <Card.Body as={Link} to={`/blog/${_id}`}>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-">
        <BlogAuthor {...author} />
        {location.pathname === "/dashboard"
          && <Button
            variant="danger"
            onClick={() => dispatch(fetchDeletePost(_id))
            .then(()=>dispatch(fetchMyPosts()))
            .then((res)=>setPosts(res.payload))}>
            Delete
          </Button>}
          <ModalReview postId={_id} />
      </Card.Footer>
      <ReviewList posts={props} />
    </Card>

  );
};

export default BlogItem;
