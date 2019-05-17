import React, { Component } from 'react';
import { withFirebase } from '../Firebase';


import './maps.css';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const HomePage = ({ authUser }) => (
  <div>{ authUser ? <MapViewAuth /> : <MapViewNoAuth /> }</div>
);


class Home extends Component {

  constructor(props) {
    super(props);

    console.log("props", this.props);
    console.log("auth", this);

    this.state = {
      loading: false,
      authUser: this.props.authUser,
      users: {},
    };

    console.log("is user auth?", this.state);

  }

  componentDidMount() {
    console.log("home mount", this);
    this.setState({ loading: true });
  }


  render() {
    return (
      (this.state.authUser && MapViewAuth()) || MapViewNoAuth()
    );
  }
}

const MapViewNoAuth = () => (
  <div>
  <h1>Not Logged In</h1>
  </div>
);

const MapViewAuth = () => (
  <div className="map">
    <GoogleMapReact
      bootstrapURLKeys={{ key:  "AIzaSyDM0FwQr5XwCYchZlrqV4eHYZBi6BEA3mo"}}
      defaultCenter={{
  lat: 35.282753,
  lng: -120.659615
}}
      defaultZoom={10}
    >
      <AnyReactComponent
        lat={59.955413}
        lng={30.337844}
        text="My Marker"
      />
    </GoogleMapReact>
  </div>
);

export default withFirebase(Home);
