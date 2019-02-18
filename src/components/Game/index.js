import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {Wrapper, GameMap} from './styles';
import { AuthUserContext, withAuthorization } from '../Session';
import { compose } from "recompose";


const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapCenter = [59.32, 18.06];
const zoomLevel = 12;

var latMax = 59.563;
var latMin = 59.037;
var lonMax = 18.489;
var lonMin = 17.553;
var yCord =  Math.random(lonMax) + 17.5;  /* "this is longitude" */
var xCord =  Math.random(latMax) + 59;  /* "this is lattitude" */
var testMark = [xCord, yCord];

class Game extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    console.log(this.props);

  }

  render() {
    return (
        <Wrapper>
          <GameMap center={mapCenter}
               zoom={zoomLevel}
               maxZoom={15}
               minZoom={9}
          >
            <TileLayer url={mapUrl}
               attribution='&amp;copy
               <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               />
            <Marker position={testMark}>
              <Popup>{}</Popup>
            </Marker>
          </GameMap>
        </Wrapper>
    )
  };
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Game);
