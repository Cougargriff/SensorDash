import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase'

import './home.css';
import GoogleMapReact from 'google-map-react';

import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import { firestore } from 'firebase';

var gMap = null;
var gMaps = null;

const MAP_ZOOM = 15
const INITIAL_LAT = 35.289
const INITIAL_LNG = -120.6596


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
    console.log("Home Mounted. props -> ", this);
  }

  render() {
    if(!isLoaded(this.props.auth) || isEmpty(this.props.auth)) {
      return MapViewNoAuth();
    }

    if(this.props.fire.data.triggers != null)
    {
      console.log("triggers loaded")
    }

    if(this.props.fire.data.location_history != null)
    {
      console.log("locations loaded")
      
    }

    renderPolyLines(this.props)

    return MapViewAuth(this.props);
  }
}

const renderPolyLines = (props) => {
  if(props.fire != null)
  {

    if(props.fire.data.location_history != null)
    {
      let paths = [];

      for(var location in props.fire.data.location_history)
      {
        var l = props.fire.data.location_history[location];
        paths.push({lat: l.latitude, lng: l.longitude});
      }
      console.log("gmaps", gMaps)
      let polyLine = new gMaps.Polyline({
        path: paths,
        geodesic: true,
        strokeColor: '#00a1e1',
        strokeOpacity: 1.0,
        strokeWeight: 5
      })
      polyLine.setMap(gMap)
    }
}
}

const getHRSeries = (props) => {
  var data = null;
  if(props.fire.data.hr_data != null)
  {
    console.log("hr data loaded")
    var hr_data = props.fire.data.hr_data
    var p = [];
    var keys = Object.keys(hr_data);

    for(var i = 0; i < keys.length; i++)
    {
      var time = keys[i];
      p.push([time * 1000, hr_data[time]])
    }

    data = {
      name: "Heart Rates",
      columns: ["time", "value"],
      points: p
    }

    const series1 = new TimeSeries(data)
  }
  else {
    data = {
      name: "traffic",
      columns: ["time", "value"],
      points: [
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
      ]
    };
  }

  return new TimeSeries(data);
}


const getTimeStamp = () => {
  var today = new Date()
  var date = today.getFullYear() + '-' + ( (() => {

      // inline utility function to get '0' before numbers in date format for month
      // i.e. 1999-09-10 not 1999-9-10...
      var month = today.getMonth() + 1
      if(month < 10)
      {
        return "0" + month
      }
      else {
        return month
      }
  })()) + '-' + (today.getDate());

  return date;
}

const handleMapLoad = (map, maps, props) => {
  // todo poly lines?
  gMap = map;
  gMaps = maps;  
}


const MapViewNoAuth = () => (
  <div>
  <h1>Not Logged In</h1>
  </div>
);

const MapViewAuth = (props) => (

  <div>
      <Resizable>
        <ChartContainer timeRange={getHRSeries(props).timerange()}>
          <ChartRow height="500"> 
            <YAxis id="axis1" label="BPM" min={0} max={100} width="80" type="linear"/>
            <Charts>
                <LineChart 
                  axis="axis1" 
                  series={getHRSeries(props)}
                  smooth={true}
                  />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key:  "AIzaSyDM0FwQr5XwCYchZlrqV4eHYZBi6BEA3mo"}}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={ ({map, maps, props}) => handleMapLoad(map, maps, props) }
        defaultCenter={{
          lat: INITIAL_LAT,
          lng: INITIAL_LNG
        }}
        defaultZoom={MAP_ZOOM}
      >
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
      </GoogleMapReact>
    </div>
  </div>
  
);


const mapStateToProps = state => {
  return { 
    auth: state.firebase.auth,
    fire: state.firestore
  }
}

const mapDispatchToProps = {
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(),
  firestoreConnect(props => {
      return [
        {
          collection: `users/${props.auth.uid}/triggers`,
          storeAs: 'triggers'
        },
         {
           collection: `users/${props.auth.uid}/location_history/${getTimeStamp()}/locations`,
           storeAs: 'location_history'
         },
         {
           collection: `users/${props.auth.uid}/hr_data/`,
           doc: getTimeStamp(),
           storeAs: 'hr_data'
         }
      ]
    }
  )
)(Home);
