import React from "react";
import { Card } from "react-bootstrap";
import { BsBookmarkDashFill, BsBookmarkPlusFill } from "react-icons/bs";
import { TiDocumentDelete } from 'react-icons/ti';
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchAuthors, fetchDeletePost, fetchMyPosts, fetchSavePost, fetchSavedPosts, fetchUnsavePost } from "../../../redux/reducers/PostSlice";
import BlogAuthor from "../blog-author/BlogAuthor";

import ModalReview from "./ModalReview";
import EditMode from "./editmode";
import "./styles.css";


const BlogItem = ({ posts }) => {
  const { title, cover, author, _id } = posts;
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSave = async () => {
    await dispatch(fetchSavePost(_id)).then(() => dispatch(fetchAuthors()));
  };

  const handleUnsave = () => {
    dispatch(fetchUnsavePost(_id)).then(async() => {
      if(location.pathname === '/dashboard') {
        await dispatch(fetchSavedPosts());
      }else if(location.pathname === '/') {
        dispatch(fetchAuthors());
      }
    });
  };


  return (
    <Card className="blog-card shadow">
      {posts?.isMine === false ?
          <div className="position-absolute mark">
             {posts?.isSaved ? <BsBookmarkDashFill style={{ cursor: 'pointer', fill: 'black' }} onClick={handleUnsave} /> : <BsBookmarkPlusFill style={{ cursor: 'pointer' }} onClick={handleSave} />}
          </div>
          :
          null
      }

      <Card.Img variant="top" src={cover} className="blog-cover" />
      <Card.Body as={Link} to={`/blog/${_id}`}>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <BlogAuthor {...author} />
        <div className="d-flex align-items-center justify-content-center fs-4">
          <EditMode />
          <ModalReview postId={_id} />

          {location.pathname === "/dashboard" && posts?.isMine === true &&  <TiDocumentDelete onClick={() => dispatch(fetchDeletePost(_id)).then(() => dispatch(fetchMyPosts()))} style={{ cursor: 'pointer' }} />}
          
         

        </div>

      </Card.Footer>
    </Card>

  );
};

export default BlogItem;
