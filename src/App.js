import React from 'react';
import './App.css';
import Location from './Location';
import Weather from './Weather';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: '',
      country: '',
      lat: '',
      lng: '',
      temperature:'',
      description:'',
      image:'',
      textbox: ''
    };
  }

  componentDidMount() {
     this.getWeather('Tokyo')// calling the 'get weather function when the page loads 
  }

  getWeather = (location) =>{
    const apiKey = 'b090866d5a537a6980369da6cb8213d4'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
return fetch(url)
.then(res => res.json())
.then(json => {
  this.setState ({
    city: json.name,
    country: json.sys.country,
    lat: json.coord.lat,
    lon: json.coord.lon,
    temperature: Math.floor(json.main.temp - 273.15),
    weather:json.weather[0].description,
    image: json.weather[0].main

  });
});

};

setCity = event => {
console.log('event.target.value', event.target.value);

this.setState({ textbox: event.target.value });
};

handleSubmit = () => {
  this.getWeather(this.state.textbox)

};

  render () { // render method very important
   console.log('this.state', this.state);
    return (
      <div className='weather-app__container'>
      <div className='weather-app__searchbar'>
      <input
      className='weather-app__textbox'
      placeholder='Search a City'
      value={this.state.textbox}
      onChange={this.setCity} //got use = event => to get setState
      />
      <button className='weather-app__button' onClick ={this.handleSubmit}>
      Find
      </button>

      </div>
        <Location 
        city={this.state.city} 
        country={this.state.country} 
        lat={this.state.lat} 
        lng={this.state.lng}
        />
        <Weather
        image={this.state.image}
        description={this.state.description}
        temperature={this.state.temperature}
        />

      </div>
    );
  }
}

export default App;
