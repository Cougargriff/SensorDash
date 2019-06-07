import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty, populate, firestoreConnect } from 'react-redux-firebase'

import './maps.css';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const HomePage = ({ authUser }) => (
  <div>{ authUser ? <MapViewAuth /> : <MapViewNoAuth /> }</div>
);

const trigger_pops = [
  { child: 'users', root: 'triggers'}
]


class Home extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),
  }

  componentDidMount() {
    console.log("HOME DID mount", this.props);
  

  }

  render() {
    console.log(this)

    if(!isLoaded(this.props.auth) || isEmpty(this.props.auth)) {
      return MapViewNoAuth();
    }

    return MapViewAuth();
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


const mapStateToProps = state => {
  return { 
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = {
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(),
  firestoreConnect()
)(Home);
