import React, { useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../../components/blog/blog-list/BlogList";
import ProfileDash from "../../components/profiledash/profiledash";
import { fetchMyPosts, fetchSavedPosts } from "../../redux/reducers/PostSlice";
import "./style.css";

export default function Dashboard() {
    const dispatch = useDispatch();
    const author = useSelector((state) => state.author.data);
    const saved = useSelector((state) => state.author.saved);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(fetchMyPosts())
    }, [dispatch]);



    return (
        <Container className="dash">
            <ProfileDash />

            <Tabs
                defaultActiveKey="dashboard"
                id="fill-tab-example"
                className="mb-3 text-dark"
                fill
            >
                <Tab eventKey="dashboard" title="DashBoard" >
                    <BlogList posts={author} />
                </Tab>
                <Tab eventKey="saved" title="Saved Posts" onEnter={()=> dispatch(fetchSavedPosts())}>
                    <BlogList posts={saved} saveZone={true} />
                </Tab>
            </Tabs>

         
        </Container>
    );
}
