import React from 'react';
import './App.css';

import './index.js'
import Form from 'react-bootstrap';
import Button from 'bootstrap';


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
          <Form.Label>City Name</Form.Label>
          <Button>Explore!</Button>
        </Form>

      </main>
    )
  }
}


export default App;


// Build a form to collect a city name from the user. Give the submit button the text of "Explore!"
