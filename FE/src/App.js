import React from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/BlogNavbar";
import Blog from "./views/blog/Blog";
import Dashboard from "./views/dashboard/dashboard";
import Home from "./views/home/Home";
import Login from "./views/login/login";
import NewBlogPost from "./views/new/New";
import Register from "./views/register/register";

function App() {
  const { userLogged } = useSelector((state) => state.login);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={userLogged && userLogged.statusCode === 200  ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={userLogged && userLogged.statusCode === 200 && <Dashboard user={userLogged.user._id} />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
