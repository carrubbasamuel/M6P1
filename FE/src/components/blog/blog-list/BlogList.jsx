import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAuthors } from "../../../redux/reducers/PostSlice";
import PaginationPosts from "../../pagination/pagination";
import BlogItem from "../blog-item/BlogItem";
import BlogNotFound from "../blog-notfound/blog-notfound";

const BlogList = ({posts, setPosts}) => {
  const dispatch = useDispatch();
  let authors = useSelector((state) => state.author.data);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);



  if(posts){
    authors = posts;
  }else if(location.pathname === "/dashboard"){
    authors = null;
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
          <BlogItem key={post.title} {...post} setPosts={setPosts} />
        </Col>
      ))}
      {authors === null && <BlogNotFound />}
      
    </Row>
  );
};

export default BlogList;
