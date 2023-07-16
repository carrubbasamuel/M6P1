
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import BlogList from "../../components/blog/blog-list/BlogList";
import { fetchMyPosts } from "../../redux/reducers/PostSlice";
import "./style.css";


export default function Dashboard() {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    useEffect(() => { 
        dispatch(fetchMyPosts()).then((res) => setPosts(res.payload)).catch((err) => console.log(err))
    }, [dispatch]);

    console.log(posts);

    return(
        <Container className="dash">

          <BlogList posts={posts} />
    
        </Container>
    )
}