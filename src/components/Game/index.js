import React, { Component } from "react";
import {TileLayer, Marker, Popup } from "react-leaflet";
import { withFirebase } from "../Firebase";
import { userContext } from "../Session";
import {GameMap, Wrapper} from "./styles";
import {SignUpIcon} from "../../styles/Icons"
import L from 'leaflet';


const mapUrl =
"https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png";
const mapCenter = [59.32, 18.06];
const zoomLevel = 12;

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

          const eggsList = Object.keys(eggsObject).map(key => ({
            ...eggsObject[key],
            uid: key,

          }));

          this.setState({
            eggs: eggsList,
          });

          console.log(Object.keys(this.state.eggs).length);
          this.spawnEggs(Object.keys(this.state.eggs).length);

        } else {
          this.setState({ eggs: null});
        }
      });

      this.addEggToDB();

  }

  spawnEggs = (number) => {
    console.log(number, " INC number");
    for (number; number < 5; number++) {
      this.addEggToDB();
    }
  }

  addEggToDB = () => {
    this.props.firebase.eggs().push({
      userId: null,
      targetLocation: {latitude: this.positonGeneratorX(), longitude: this.positonGeneratorY()},
      position: {latitude: this.positonGeneratorX(), longitude: this.positonGeneratorY()},
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    })
  }

  positonGeneratorX = () => {
    const maxX = 59.350879;
    const minX = 59.290619;

    return Math.random() * (maxX - minX) + minX;
  }

  positonGeneratorY = () => {
    const maxY = 18.132512;
    const minY = 18.003479;

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

    if(this.state.users) {
      var positions = this.state.users.map(userObj => ({ ...userObj.position, username: userObj.username}));
      markers.push(...positions)
    }

    return (
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
          {markers.map((marker, index) => (
            <Marker key={index} position={Object.values(marker)}>
              <Popup>
                {marker.username}
              </Popup>
            </Marker>
          ))}
        </GameMap> : <div></div>}
      </Wrapper>
          );
      };
}

export default Game;
