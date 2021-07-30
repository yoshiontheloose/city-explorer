import React from 'react';
import './App.css';

import './index.js'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: true,
    }
  }

  render() {
    return (
      <main>
        <Form>
          <Form.Group>
          <Form.Label>City Name</Form.Label>
          <Form.Control></Form.Control>
          <Button>Explore!</Button>
          </Form.Group>
        </Form>
      </main>
    )
  }
}


export default App;


// Build a form to collect a city name from the user. Give the submit button the text of "Explore!"
