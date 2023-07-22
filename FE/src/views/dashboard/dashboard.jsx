import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../../components/blog/blog-list/BlogList";
import { fetchMyPosts } from "../../redux/reducers/PostSlice";
import "./style.css";

export default function Dashboard() {
    const dispatch = useDispatch();
    const author = useSelector((state) => state.author.data);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => { 
        dispatch(fetchMyPosts())
    }, [dispatch]);



    return (
        <Container className="dash">
            <BlogList posts={author}/>
        </Container>
    );
}
