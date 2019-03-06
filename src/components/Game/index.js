import React, { Component } from "react";
import {TileLayer, Marker, Popup } from "react-leaflet";
import { withFirebase } from "../Firebase";
import { userContext } from "../Session";
import {GameMap, Wrapper, PopupContent} from "./styles";
import {SignUpIcon} from "../../styles/Icons";
import MessagesBase from '../Chat';
import L from 'leaflet';
import {
  withAuthorization,
} from '../Session';

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
      selectedEgg: null,
      pickedUp: false,
      pickUpEnabled: false,
    };
  }

  calculateDistance = (lat1, lon1, lat2, lon2) => {
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
          const eggsList = Object.keys(eggsObject).map(key => ({
            ...eggsObject[key],
            uid: key,
          }));

          this.setState({
            eggs: eggsList,
          }, () => {
              this.spawnEggs();
          });
        } else {
          this.addEggToDB();
        }
      });
  }
updateEggInDB = (uid) => {
  const userID = this.props.authUser.uid;
  this.props.firebase
    .egg(uid).update({ pickedUpBy: userID });
  this.props.firebase.user(userID).update({ hasEggID: uid});
}

  spawnEggs = () => {
    console.log(Object.keys(this.state.eggs).length);
    if (Object.keys(this.state.eggs).length < 5 && !this.state.hasEgg) {
      this.addEggToDB();
    }
  }

  addEggToDB = () => {
    let targetX = this.positionGeneratorX();
    let targetY = this.positionGeneratorY();
    let positionX = this.positionGeneratorX();
    let positonY = this.positionGeneratorY();

    this.props.firebase.eggs().push({
      targetLocation: {latitude: targetX, longitude: targetY},
      position: {latitude: positionX, longitude: positonY},
      points: this.setPoints(targetX, positionX, targetY ,positonY),
      isPickedUpBy: false,
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

  positionGeneratorX = () => {
    const maxX = 59.563;
    const minX = 59.037;
    return Math.random() * (maxX - minX) + minX;
  }

  positionGeneratorY = () => {
    const maxY = 18.489;
    const minY = 17.553;

    return Math.random() * (maxY - minY) + minY;
  }

  getUserPositionFromDB = () => {
    console.log("getUserPositionFromDB");
    this.props.firebase
    .user(this.props.authUser.uid)
    .child("position")
    .once("value", snapshot => {
      const userPosition = snapshot.val();

      this.setState({ dbCoords: userPosition}, () => {
      });
    });
  };


  updatePosition = position => {
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
        this.calcEggs();
      }
    }
  };

  calcEggs = () =>{
    const eggDistances = this.state.eggs.map(egg => {

      const { latitude: lat1, longitude: lng1 } = egg.position;
      const { latitude: lat2, longitude: lng2 } = this.state.dbCoords;
      const dist = this.calculateDistance(lat1, lng1, lat2, lng2);
      //if (dist < 500 && !this.state.pickedUp) {
      egg.pickUpEnabled = (dist < 500 && !egg.pickedUpBy) ? true : false;
      //egg.distance = dist;
      return egg;
      //}
    });
    this.setState({ eggDistances });
  }



  dropEgg = () =>  {
    console.log("Drop Egg");
    this.setState({pickedUp: false});
  };

  writeUserPositionToDB = position => {

    const { latitude, longitude } = position;
    this.props.firebase
      .user(this.props.authUser.uid)
      .update({ position: { latitude: latitude, longitude: longitude } });
    this.getUserPositionFromDB();
  };

  componentDidMount() {
      this.props.firebase.user(this.props.authUser.uid).update({
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

  resetValues = () => {
    this.setState(prevState => ({
      targetLocation: null,
      selectedEgg: null
    }))
  }

  resetEgg = (target, selectEgg) => {
    this.resetValues();
    this.setState(prevState => ({
      targetLocation: target,
      selectedEgg: selectEgg
    }))
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    this.props.firebase.user(this.props.authUser.uid).update({
      online: false,
      lastSeen: this.props.firebase.serverValue.TIMESTAMP,
    });
    this.props.firebase
      .eggs()
      .off();
  }

  render() {
    const markers = [];

    if(this.state.users) {
      let positions = this.state.users.filter(userObj => userObj.uid !== this.props.authUser.uid);
      markers.push(...positions)
    }

  const eggIcon = L.icon({
    iconUrl: require("../../assets/ball-spotted.png"),
    iconSize: [30, 60],
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

 const targetIcon = L.icon({
   iconUrl: require("../../assets/target.png"),
   iconSize: [50, 60],
   iconAnchor: [20, 64],
   popupAnchor: [10, -65]
 })

    return (
      <div>
      { this.state.eggs && this.state.users ?
      <Wrapper>
        {this.state.dbCoords ?
        <GameMap onClick={() => this.resetValues()} center={Object.values(this.state.dbCoords)}
             zoom={zoomLevel}
             maxZoom={15}
             minZoom={9}
             scrollWheelZoom={false}
             markers={markers}
                      >
          <TileLayer url={mapUrl}
          />
          {this.state.targetLocation ?
          <Marker position={Object.values(this.state.targetLocation)} icon={targetIcon}></Marker> : null}
          <Marker onClick={() => this.resetValues()} position={Object.values(this.state.dbCoords)} icon={playerIcon}>
            <Popup className="Game-popup">
              <PopupContent>
                <span> Me </span>

                {this.state.pickedUp ? <button onClick={() => this.dropEgg()}>Drop Egg</button> : null}
              </PopupContent>
            </Popup>
          </Marker>
          {markers.map((marker, index) => (
            <Marker onClick={() => this.resetValues()} key={index} position={Object.values(marker.position)} icon={playersIcon}>
              <Popup className="Game-popup">
                <PopupContent>
                  <span>{marker.username}</span>
                </PopupContent>
              </Popup>
            </Marker>
          ))}
          {this.state.eggs.map((marker, index,) => (
            !marker.pickedUpBy ?
            <Marker onClick={() => this.resetEgg(marker.targetLocation, marker.uid)} key={index} position={Object.values(marker.position)} icon={eggIcon}>
              <Popup className="Game-popup">
                <PopupContent>
                  <span>Points: {marker.points}</span>
                  {marker.pickUpEnabled ? <button onClick={() => this.updateEggInDB(marker.uid)}>Pick Up</button> : null}
                </PopupContent>
              </Popup>
            </Marker> : (marker.pickedUpBy === this.props.authUser.uid) ? <Marker position={Object.values(marker.targetLocation)} icon={targetIcon}></Marker> : null
          ))}
        </GameMap> : <div></div>}
      </Wrapper>
    : null }
        {this.props.authUser && this.state.users && this.state.selectedEgg ?
        <Wrapper>
          <MessagesBase eggId={this.state.selectedEgg} users={this.props.users} userId={this.props.authUser.uid} firebase={this.props.firebase} />
        </Wrapper>: <div></div>}
      </div>
          );
      };
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Game);
