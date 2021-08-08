import React from 'react';
import Container from 'react-bootstrap/Container';

class Weather extends React.Component {
  render() {
    return (
      <Container>
        {this.props.weather &&
          this.props.weather.map((forecast, index) => {
            return <div key={index}>
              <p>{forecast.date}</p>
              <p>{forecast.description}</p>
            </div>
          })}
      </Container>
    )
  }
}

export default Weather;