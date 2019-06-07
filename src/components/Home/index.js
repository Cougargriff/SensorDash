import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase'

import './maps.css';
import GoogleMapReact from 'google-map-react';

import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";


// example data
const data = {
  name: "traffic",
  columns: ["time", "value"],
  points: [
      [1, 1],
      [2, 8],
      [3, 27],
      [4, 64],
  ]
};

const series1 = new TimeSeries(data);

var timerange = series1.timerange(); // range of times for given set
// or
// ... define your own ... = new TimeRange([begin, end]);

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),
  }

  componentDidMount() {
    console.log("Home Mounted. props -> ", series1);
  }

  render() {
    if(!isLoaded(this.props.auth) || isEmpty(this.props.auth)) {
      return MapViewNoAuth();
    }

    return MapViewAuth();
  }
}

const handleMapLoad = (map, maps) => {
  console.log("Map Load Callback")
}

const MapViewNoAuth = () => (
  <div>
  <h1>Not Logged In</h1>
  </div>
);

const MapViewAuth = () => (

  <div>
      <Resizable>
        <ChartContainer timeRange={series1.timerange()}> 
          <ChartRow height="500"> 
            <YAxis id="axis1" label="Y AXIS!" min={0} max={100} width="80" type="linear"/>
            <Charts>
                <LineChart axis="axis1" series={series1}/>
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key:  "AIzaSyDM0FwQr5XwCYchZlrqV4eHYZBi6BEA3mo"}}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={ ({map, maps}) => handleMapLoad(map, maps) }
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
