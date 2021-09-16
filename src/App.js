import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Navbar, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { API_URL } from './constants';

function App() {
  const [response, setResponse] = useState();
  const [request, setRequest] = useState({});

  useEffect(() => {
    document.title = "Distance API";
  });

  function onSubmit(event) {
    event.preventDefault();
    axios.get(API_URL, {
      params: {
        src: request.src,
        dest: request.dest
      }
    })
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        setResponse(JSON.stringify(error?.response?.data?.message || error.message));
      });
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className="navbar-brand">Distance API</Navbar.Brand>
        </Container>
      </Navbar>

      <Form className="m-5 form" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="source">
          <Form.Label>Source</Form.Label>
          <Form.Control type="text" name="src" placeholder="Enter Source Location" onChange={(event) => { setRequest({ ...request, src: event.target.value }) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="destination">
          <Form.Label>Destination</Form.Label>
          <Form.Control type="text" name="dest" placeholder="Enter Destination Location" onChange={(event) => { setRequest({ ...request, dest: event.target.value }) }} />
        </Form.Group>
        <Button variant="primary" type="submit" className="df">
          Submit
        </Button>
      </Form>

      <div className="m-5">
        <h2>{response}</h2>
      </div>
    </div>
  );
}

export default App;
