import React from 'react';
import Paper from 'material-ui/Paper';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyCevAQFOgvKGgw1Rz2xACa7zvsk7hs4W-Q';

const options = {
  center: {
    lat: 39.116852, 
    lng:-77.539673
  },
  zoom: 11
};

const scrHeight = window.screen.height;
const height = scrHeight - (scrHeight / 3) - 170;
      
export default React.createClass({
  componentDidMount() {
    GoogleMapsLoader.load((google) => {
      var map = new google.maps.Map(this.refs.map, options)
      var marker = new google.maps.Marker({
        map: map,
        position: options.center,
        title: 'Metromed Urgent Care',
        animation: google.maps.Animation.DROP
      })
    })
  },
  render() {
    return (
      <Paper style={{width:'100%', height}}>
        <div ref="map" style={{height: "100%"}} />
      </Paper>
    );
  }
});