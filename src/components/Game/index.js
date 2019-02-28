import React, { Component } from "react";
import {TileLayer, Marker, Popup } from "react-leaflet";
import { withFirebase } from "../Firebase";
import { userContext } from "../Session";
import {GameMap, Wrapper} from "./styles";
import {SignUpIcon} from "../../styles/Icons";
import MessagesBase from '../Chat';
import L from 'leaflet';

const mapUrl =
"https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png";
const mapCenter = [59.32, 18.06];
const zoomLevel = 11;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      browserCoords: null,
      dbCoords: null,
      users: null,
      eggs: null
    };
  }

  calculateDistance = (lat1, lon1, lat2, lon2) => {
    console.log("calculateDistance");

    var R = 6371;
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round(d * 1000);
  };

  loadUsersFromDB = () => {
    console.log("loadUsersFromDB");

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      const usersOnline = usersList.filter(user => user.online === true);

      this.setState({
        users: usersOnline,
      });
    });
  }

  loadEggsFromDB = () => {

    this.props.firebase
      .eggs()
      .on('value', snapshot => {
        const eggsObject = snapshot.val();

        if (eggsObject) {
          console.log("IF");
          const eggsList = Object.keys(eggsObject).map(key => ({
            ...eggsObject[key],
            uid: key,

          }));

          this.setState({
            eggs: eggsList,
          });
          console.log("STATE", Object.keys(this.state.eggs).length);
          this.spawnEggs();


        } else {
          console.log("ELSE");
          this.addEggToDB();
        }
      });
  }

  spawnEggs = () => {
    if (Object.keys(this.state.eggs).length < 5) {
      this.addEggToDB();
    }
  }

  addEggToDB = () => {
    this.props.firebase.eggs().push({
      targetLocation: {latitude: this.positonGeneratorX(), longitude: this.positonGeneratorY()},
      position: {latitude: this.positonGeneratorX(), longitude: this.positonGeneratorY()},
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    })
  }

  positonGeneratorX = () => {
    const maxX = 59.563;
    const minX = 59.037;

    return Math.random() * (maxX - minX) + minX;
  }

  positonGeneratorY = () => {
    const maxY = 18.489;
    const minY = 17.553;

    return Math.random() * (maxY - minY) + minY;
  }

  getUserPositionFromDB = () => {
    console.log("getUserPositionFromDB");
    this.props.firebase
    .user(this.props.user.uid)
    .child("position")
    .once("value", snapshot => {
      const userPosition = snapshot.val();

      this.setState({ dbCoords: userPosition}, () => {
      });
    });
  };

  updatePosition = position => {
    console.log("updatePosition")
    this.setState({
      browserCoords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });

    if (position.coords && this.state.dbCoords) {
      const { latitude: lat1, longitude: lng1 } = position.coords;
      const { latitude: lat2, longitude: lng2 } = this.state.dbCoords;
      const dist = this.calculateDistance(lat1, lng1, lat2, lng2);
      if (dist > 1) {
        this.writeUserPositionToDB(position.coords);
      }
    }
  };

  writeUserPositionToDB = position => {
    console.log("writeUserPositionToDB");

    const { latitude, longitude } = position;
    this.props.firebase
      .user(this.props.user.uid)
      .update({ position: { latitude: latitude, longitude: longitude } });
    this.getUserPositionFromDB();
  };

  componentDidMount() {
    console.log("componentDidMount");


      if(this.props.userId) {
        this.props.firebase.user(this.props.user.uid).update({online: true});
      }

      this.getUserPositionFromDB();
      this.loadUsersFromDB();
      this.loadEggsFromDB();


      this.watchId = navigator.geolocation.watchPosition(
       this.updatePosition,
        error => {
          console.warn('ERROR(' + error.code + '): ' + error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
          distanceFilter: 1
        }
      );

    }

  componentWillUnmount() {
    console.log("componentWillUnmount");

    this.props.firebase.user(this.props.user.uid).update({online: false});
    navigator.geolocation.clearWatch(this.watchId);

  }

  render() {
    const markers = [];
    const eggMarkers = [];

    if(this.state.users) {
      let positions = this.state.users.map(userObj => {
        if(userObj.uid !== this.props.user.uid) {
          console.log(this.props.user.username);
          return {...userObj.position, username: userObj.username};
        }
      });
      markers.push(...positions)
    }

    if(this.state.eggs) {
      let eggsPosition = this.state.eggs.map(eggObj => ({ ...eggObj.position, ...eggObj.targetLocation}));
      eggMarkers.push(...eggsPosition);
    }

    const eggIcon = L.icon({
     iconUrl: require("../../assets/ball-spotted.png"),
     iconSize: [30, 40],
     iconAnchor: [15, 64],
     popupAnchor: [0, -65]
   });

   const playerIcon = L.icon({
    iconUrl: require("../../assets/player.png"),
    iconSize: [60, 70],
    iconAnchor: [15, 64],
    popupAnchor: [0, -65]
  });

  const playersIcon = L.icon({
   iconUrl: require("../../assets/players.png"),
   iconSize: [60, 70],
   iconAnchor: [15, 64],
   popupAnchor: [0, -65]
 });

    return (
      <div>
      <Wrapper>
        {this.state.dbCoords ?
        <GameMap center={Object.values(this.state.dbCoords)}
             zoom={zoomLevel}
             maxZoom={15}
             minZoom={9}
             scrollWheelZoom={false}
             markers={markers}
                      >
          <TileLayer url={mapUrl}
          />
          <Marker position={Object.values(this.state.dbCoords)} icon={playerIcon}>
            <Popup>
              <span> Me </span>
            </Popup>
          </Marker>
          {markers.map((marker, index) => (
            <Marker key={index} position={Object.values(marker)} icon={playersIcon}>
              <Popup>
                {marker.username}
              </Popup>
            </Marker>
          ))}
          {eggMarkers.map((marker, index) => (
            <Marker key={index} position={Object.values(marker)} icon={eggIcon}>
              <Popup>
                <span>Target Location: </span>
              </Popup>
            </Marker>
          ))}
        </GameMap> : <div></div>}
      </Wrapper>
      <Wrapper>
        {this.props.user && this.state.users ?
        <MessagesBase users={this.props.users} authUser={this.props.user.uid} firebase={this.props.firebase} /> : <div></div>}
      </Wrapper>
      </div>
          );
      };
}

export default Game;
