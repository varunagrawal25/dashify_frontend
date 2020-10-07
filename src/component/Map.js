import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
 

Geocode.setApiKey("AIzaSyBFffBBAkxKlHcYqWafNgQwmD-pH4JMizk");
Geocode.enableDebug();
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  render() {
   
    Geocode.fromAddress("taj mahal").then(
      response => {
        const { lati, long } = response.results[0].geometry.location;
        console.log(lati, long);
        console.log("check" ,response.results[0].geometry.location)
      },
      error => {
        console.error("error message",error);
        console.log("error message")
      }
    );
    return (
      // Important! Always set the container height explicitly
      <div id="user_map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            // text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;