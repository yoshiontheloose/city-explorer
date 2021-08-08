import React from 'react';
import axios from 'axios';
import './App.css';

import './index.js'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Weather from './Weather.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      city: '',
      lat: '',
      lon: '',
      displayMap: false,
      renderError: false,
      errorMessage: '',
      weather: [],
    }
  }

  // gets location info from api
  getLocation = async (e) => {
    //prevents form input from disappearing
    e.preventDefault();
    try {
      let location = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)

      this.setState({
        lat: location.data[0].lat,
        lon: location.data[0].lon,
        display_name: location.data[0].display_name,
        displayMap: true,
      });

      this.getWeather();

      //check demo code for error handling, put in bootstrap compt
    } catch (error) {
      console.log(error.response);
      this.setState({
        renderError: true,
        errorMessage: `Error: ${error.response.status}, Status: ${error.response.data.error}`,
      });
    }
  }

  getWeather = async () => {
    try {
      let weather = await axios.get(`http://localhost:3001/weather`, {
        params: {
          lat: this.state.lat,
          lon: this.state.lon,
          searchQuery: this.state.city,
        }
      })
      this.setState({
        weather: weather.data,
      })
    }
    catch (error) {
      console.log(error.response);
      this.setState({
        renderError: true,
        errorMessage: `Error: ${error.response.status}, Status: ${error.response.data.error}`,
      });
    }
  }

  // event handler for form(city) submission
  handleChange = (event) => {
    this.setState({ city: event.target.value });
  }

  render() {
    return (
      <main>
        <Form onSubmit={this.getLocation}>
          <Form.Group>
            <Form.Label>Enter a City Name</Form.Label>
            <Form.Control onChange={this.handleChange}></Form.Control>
            <Button>Explore!</Button>
          </Form.Group>
        </Form>
        <Container>
          <p>{this.state.display_name}</p>
          <p>{this.state.lat}</p>
          <p>{this.state.lon}</p>
          {this.state.displayMap ? <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`} alt='map' /> : ''}
        </Container>

        <Weather weather={this.state.weather} />

        <Alert variant="danger" onClose={() => this.setState({ renderError: false })} show={this.state.renderError} dismissible>
          {this.state.errorMessage}
        </Alert>
      </main>
    )
  }
}


export default App;
//NOTE: ADD CSS