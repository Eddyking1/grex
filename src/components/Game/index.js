import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, TileLayer } from 'react-leaflet';

const Wrapper = styled.div `
  overflow: none;
  background: black;
  height: 500px;

`;

const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapCenter = [59.32, 18.06];
const zoomLevel = 12;

var latMax = 59.563;
var latMin = 59.037;
var lonMax = 18.489;
var lonMin = 17.553;
// var yCord =  Math.random(lonMax) + 17.5;  /* "this is longitude" */
// var xCord =  Math.random(latMax) + 59;  /* "this is lattitude" */
// var testMark = L.latLng(xCord, yCord);
class Game extends Component {
  

  state = {
  }

  componentDidMount() {

  }

  render() {
    return (
      
        <Map style={{height:"500px", width:"500px"}}
            center={mapCenter}
            zoom={zoomLevel}
            maxZoom={15}
            minZoom={9}

        >
            <TileLayer url={mapUrl} attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
/>
        </Map>
    )
  } 
  };

export default Game;
