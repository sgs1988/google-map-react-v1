import React from "react";
import GoogleMap from "google-map-react";
import axios from 'axios';

const GOOGLE_API_KEY = "AIzaSyDjVdfFI2EG9sYyqTkWxu2X1FjXUgQgrkw";



class GMapReact extends React.Component {

    onGoogleApiLoaded = (map, maps, src) => {
        // var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
        //var KMZUrl = 'http://iblogbox.github.io/js/gpx/sample/Blackbirds.kmz';
        //var KMZUrl = 'https://github.com/kannannce1/google-map-react/blob/master/public/otherRestrictionsRas.kmz';
        console.log('here...');
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
              // this.setState({center: triangleCoords[0]});
              console.log(triangleCoords[0], '...');

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
    const { center, zoom, src } = this.props;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <GoogleMap
          bootstrapURLKeys={{ key: [GOOGLE_API_KEY] }}
          center={center}
          zoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.onGoogleApiLoaded(map, maps, src)}
        >
        </GoogleMap>
      </div>
    );
  }
}

class MapUpdate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        src: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml',
        center: {
          lat: 37.42390182131783,
          lng: -122.0914977709329
        },
        form: {
            lat: 37.42390182131783,
            lng: -122.0914977709329
          }
        // form: {
        //   lat: 37.7824134,
        //   lng: -122.4088472
        // }
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleChange() {
      this.setState({
        form: {
          lat: Number(this.refs.lat.value),
          lng: Number(this.refs.lng.value)
        }
      });
    }
  
    handleClick() {
      this.setState({
        center: this.state.form
      });
      this.setState({
        src: 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus1.kml'
      });
      console.log(this.state.src);
    }
  
    render() {
      const center = this.state.center;
      var src = this.state.src;
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <div>
            <input
              ref="lat"
              type="text"
              value={this.state.form.lat}
              onChange={this.handleChange}
            />
            <input
              ref="lng"
              type="text"
              value={this.state.form.lng}
              onChange={this.handleChange}
            />
            <input onClick={this.handleClick} type="button" value="update" />
          </div>
          <div style={{ width: "100%", height: "100%" }}>
            <GMapReact center={center} zoom={17} src = {src}/>
          </div>
        </div>
      );
    }
  }

  export default MapUpdate;