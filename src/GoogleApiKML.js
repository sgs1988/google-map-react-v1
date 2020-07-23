import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from 'axios';

class GoogleApiKML extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 30.42419403634421,
        lng: 90.0926995893311
      },
      zoom: 17
    };
  }

  componentDidMount(){
  }

  onGoogleApiLoaded = (map, maps) => {
  var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
  //var KMZUrl = 'http://iblogbox.github.io/js/gpx/sample/Blackbirds.kmz';
  //var KMZUrl = 'https://github.com/kannannce1/google-map-react/blob/master/public/otherRestrictionsRas.kmz';
  
  var triangleCoords = [];
   axios.get(src).then(res => {
     var  parser = new DOMParser();
     var  xmlDoc = parser.parseFromString(res.data,"text/xml");
     const coordinatesObj = xmlDoc.getElementsByTagName("coordinates");
     if (coordinatesObj.length > 0) {
        for (var i = 0; i < coordinatesObj.length; i++) {
            var name = coordinatesObj[i].firstChild.nodeValue;
            triangleCoords.push({lat: parseFloat(name.split(",")[1]),lng:parseFloat(name.split(",")[0])})
        }
        this.setState({center: triangleCoords[0]});
        
        // Construct the polygon.
        var bermudaTriangle = new maps.Polygon({
          paths: triangleCoords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35
        });
      bermudaTriangle.setMap(map);
    }
  });
};

render() {
  return (
      <GoogleMapReact
          // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          center={this.state.center}
          defaultZoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.onGoogleApiLoaded(map, maps)}
        />
  )
}
};
export default GoogleApiKML;
