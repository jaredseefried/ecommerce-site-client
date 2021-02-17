import React, { useRef, useState, useEffect } from "react";
// import ReactDOM from 'react-dom'
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewProduct.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";


export default function NewNote() {
  const file = useRef(null);
  // const [files, setFiles] = useState("")
  const history = useHistory();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("")


  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }


  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
        1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;
      await createProduct({ price, title, content, attachment });
      history.push("/products");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }


  function createProduct(product) {
    return API.post("products", "/products", {
      body: product
    });
  }


  return (
    <>
      <div className="NewProduct col-6 new-product-page">

        <Form onSubmit={handleSubmit}>
          <h5>Title</h5>
          <Form.Group controlId="title">
            <Form.Control
              value={title}
              as="input"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <h5>Price</h5>
          <Form.Group controlId="price">
            <Form.Control
              value={price}
              as="input"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <h5>Description</h5>
          <Form.Group controlId="content">
            <Form.Control
              value={content}
              as="textarea"
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group controlId="file">
            <Form.Label>Attachment</Form.Label>
            <Form.Control onChange={handleFileChange} type="file" />
          </Form.Group>
          <LoaderButton
            block
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Create
        </LoaderButton>
        </Form>
      </div>
      <div className="preview-container col-6 new-product-page">
        <div className="card">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{content}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Price: {price}</li>
            <li className="list-group-item">Posted: 5 minutes ago </li>
          </ul>

        </div>
      </div>
    </>
  );
}