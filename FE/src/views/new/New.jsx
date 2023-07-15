import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { fetchNewPost } from "../../redux/reducers/PostSlice";
import { useNavigate } from "react-router-dom";
import "./styles.css";



const NewBlogPost = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cover = useRef(null);
  const title = useRef(null);
  const category = useRef(null);
  const content = useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault(); 
    const newBlog = {
      cover: cover.current.value,
      title: title.current.value,
      category: category.current.value,
      content: content.current.value,
    };
    dispatch(fetchNewPost(newBlog)).then(()=> navigate('/') )
  }

  
  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
      <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control size="lg" placeholder="Title" ref={cover} />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" ref={title} />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label >Categoria</Form.Label>
          <Form.Control ref={category} size="lg" as="select">
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Form.Control size="lg" as="textarea" rows={10} ref={content} />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
