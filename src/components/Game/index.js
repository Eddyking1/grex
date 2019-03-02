import React, { Component } from "react";
import {TileLayer, Marker, Popup } from "react-leaflet";
import { withFirebase } from "../Firebase";
import { userContext } from "../Session";
import {GameMap, Wrapper, popupContent} from "./styles";
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
      eggs: null,
      targetLocation: null,
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
    let targetX = this.positonGeneratorX();
    let targetY = this.positonGeneratorY();
    let positionX = this.positonGeneratorX();
    let positonY = this.positonGeneratorY();

    this.props.firebase.eggs().push({
      targetLocation: {latitude: targetX, longitude: targetY},
      position: {latitude: positionX, longitude: positonY},
      points: this.setPoints(targetX, positionX, targetY ,positonY),
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    })
  }

  setPoints = (targetX, positionX, targetY, positionY) => {

    let a;
    let b;

    if(targetX > positionX) {
      a = (targetX - positionX);
    } else {
      a = (positionX - targetX);
    }
    if(targetY > positionY) {
      b = (targetY - positionY);
    } else {
      b = (positionY - targetY);
    }
     return Math.round(Math.sqrt((a * a) + (b * b))* 1000);
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

        this.props.firebase.user(this.props.user.uid).update({
          online: true,
        });

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
    navigator.geolocation.clearWatch(this.watchId);
      this.props.firebase.user(this.props.user.uid).update({
        online: false,
        lastSeen: this.props.firebase.serverValue.TIMESTAMP,
      });

  }

  showTarget = (target) => {
    this.setState({targetLocation: target});
  };

  render() {
    const markers = [];

    if(this.state.users) {
      let positions = this.state.users.filter(userObj => userObj.uid !== this.props.user.uid);
      markers.push(...positions)
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
    iconAnchor: [20, 64],
    popupAnchor: [10, -65]
  });

  const playersIcon = L.icon({
   iconUrl: require("../../assets/players.png"),
   iconSize: [60, 70],
   iconAnchor: [20, 64],
   popupAnchor: [10, -65]
 });

    return (
      <div>
      { this.state.eggs ?
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
          {this.state.targetLocation ?
          <Marker position={Object.values(this.state.targetLocation)}>
            <Popup className="Game-popup">
            <div style={popupContent}>
              <span> Eggs target Location </span>
              </div>
            </Popup>
          </Marker> : null}
          <Marker position={Object.values(this.state.dbCoords)} icon={playerIcon}>
            <Popup className="Game-popup">
            <div style={popupContent}>
              <span> Me </span>
              </div>
            </Popup>
          </Marker>
          {markers.map((marker, index) => (
            <Marker key={index} position={Object.values(marker.position)} icon={playersIcon}>
              <Popup className="Game-popup">
              <div style={popupContent}>
                {marker.username}
                </div>
              </Popup>
            </Marker>
          ))}
          {this.state.eggs.map((marker, index,) => (
            <Marker key={index} position={Object.values(marker.position)} icon={eggIcon}>
              <Popup className="Game-popup">
              <div style={popupContent}> 
                <span>Points: {marker.points} <br/> Target Location: {Object.values(marker.targetLocation)}</span>
                <button
                  type="button"
                  onClick={() => this.showTarget(marker.targetLocation)}
                  >
                  Show target Location
                </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </GameMap> : <div></div>}
      </Wrapper>
    : null }
      <Wrapper>
        {this.props.user && this.state.users ?
        <MessagesBase users={this.props.users} authUser={this.props.user.uid} firebase={this.props.firebase} /> : <div></div>}
      </Wrapper>
      </div>
          );
      };
}

export default Game;
