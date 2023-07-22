
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import BlogList from "../../components/blog/blog-list/BlogList";
import { fetchMyPosts } from "../../redux/reducers/PostSlice";
import "./style.css";


export default function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    useEffect(() => { 
        dispatch(fetchMyPosts()).then(()=> console.log('mypost'));
    }, [dispatch]);


    return(
        <Container className="dash">

          <BlogList />
    
        </Container>
    )
}