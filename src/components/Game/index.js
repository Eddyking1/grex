import React, { Component } from "react";
import {TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import {GameMap, Wrapper} from "./styles";

const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapCenter = [59.32, 18.06];
const zoomLevel = 12;

const Coords = props => (
  <div>
    {props.position ? (
      <div>
        <div>{props.position.latitude}</div>
        <div>{props.position.longitude}</div>
      </div>
    ) : null}
  </div>
);

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      browserCoords: null,
      dbCoords: null,
      users: null
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
      }
    }
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
  getUserPositionFromDB = () => {
    console.log("getUserPositionFromDB");
    this.props.firebase
      .user(this.props.userId)
      .child("position")
      .once("value", snapshot => {
        const userPosition = snapshot.val();

        this.setState({ dbCoords: userPosition}, () => {
        });
      });
  };

  writeUserPositionToDB = position => {
    const { latitude, longitude } = position;
    this.props.firebase
      .user(this.props.userId)
      .update({ position: { latitude: latitude, longitude: longitude } });
    this.getUserPositionFromDB();
  };

  componentDidMount() {
<<<<<<< HEAD

=======
      this.props.firebase.user(this.props.userId).update({online: true});

      this.getUserPositionFromDB();
      this.loadUsersFromDB();
      this.watchId = navigator.geolocation.getCurrentPosition(
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
    this.props.firebase.user(this.props.userId).update({online: false});
    navigator.geolocation.clearWatch(this.watchId);
>>>>>>> Possible to render users on map based on location
  }


  render() {
  const markers = [];
  if (this.state.users) {
    var positions = this.state.users.map(userObj => ({ ...userObj.position, username: userObj.username}));
    markers.push(...positions)
  }

    return (
<<<<<<< HEAD

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
=======
      <Wrapper>
        {this.state.dbCoords ?
        <GameMap center={mapCenter}
             zoom={zoomLevel}
             maxZoom={15}
             minZoom={9}
             scrollWheelZoom={false}
             markers={markers}
                      >
          <TileLayer url={mapUrl}
                     attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
>>>>>>> Possible to render users on map based on location

export default Game;
