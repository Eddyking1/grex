import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {Wrapper, GameMap} from './styles';
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from '../Session';


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

    this.state = {
      user: null,
      users: null,
      eggs: null,
    }
  }

  componentDidMount() {
  }

  render() {
    return (
    <AuthUserContext.Consumer>
      {authUser => (
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
              <Popup>dadw</Popup>
            </Marker>
          </GameMap>
        </Wrapper>
      )}
      </AuthUserContext.Consumer>
    )
  };
}

export default Game;
