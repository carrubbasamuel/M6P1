import React from "react";
import { Card } from "react-bootstrap";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { TiDocumentDelete } from 'react-icons/ti';
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  fetchDeletePost,
  fetchMyPosts,
} from "../../../redux/reducers/PostSlice";
import { fetchGetReviews, setPostToReview, setShowModal } from "../../../redux/reducers/ReviewSlice";
import BlogSaveButton from "../../blog-save/blogsave";
import BlogLikeButton from "../../likes/BlogLike";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";


const BlogItem = ({ posts }) => {
  const { title, cover, author, _id } = posts;
  const location = useLocation();
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(setPostToReview(_id));
    dispatch(setShowModal(true));
    dispatch(fetchGetReviews());
  };

  

  return (
    <Card className="blog-card shadow">
      {/* Save button */}
      <BlogSaveButton posts={posts}/>
      <Card.Img variant="top" src={cover} className="blog-cover" />
      <Card.Body as={Link} to={`/blog/${_id}`}>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <BlogAuthor {...author} />
        <div className="d-flex align-items-center justify-content-center fs-4">

          {/* Like button */}
          <BlogLikeButton posts={posts} />
          
          {/* Comment button */}
          <div className='d-flex align-items-center justify-content-center fs-4 ms-2'>
            <AiOutlineComment onClick={handleShow} style={{ cursor: 'pointer' }} />
          </div>

          {/* Delate button */}
          {location.pathname === "/dashboard" && posts?.isMine === true &&
            <div className="d-flex align-items-center">
              <TiDocumentDelete onClick={() => dispatch(fetchDeletePost(_id)).then(() => dispatch(fetchMyPosts()))} style={{ cursor: 'pointer' }} />
            </div>
          }
        </div>

      </Card.Footer>
    </Card>

  );
};

export default BlogItem;
