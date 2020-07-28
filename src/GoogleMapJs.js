import React, {Component, createRef} from 'react';
import axios from 'axios';

// Variables
const GOOGLE_MAP_API_KEY = 'AIzaSyDjVdfFI2EG9sYyqTkWxu2X1FjXUgQgrkw';
const myLocation = { // CN Tower Landmark
    lat: 25.774,
    lng: -80.19
};
// styles
const mapStyles = {
    width: '100%',
    height: '400px',
};

var layer1 = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
var layer2 = './westcampus.kml';

class GoogleMap extends Component {
    // refs
    googleMapRef = React.createRef();
    googleMap = createRef(null);
    marker = createRef(null);

    getTriangleCoords(src) {
     var triangleCoords = [];
      axios.get(src).then(res => {
        var  parser = new DOMParser();
        var  xmlDoc = parser.parseFromString(res.data,"text/xml");
        const coordinatesObj = xmlDoc.getElementsByTagName("coordinates");
        console.log(coordinatesObj, '...');
        if (coordinatesObj.length > 0) {
           for (var i = 0; i < coordinatesObj.length; i++) {
               var name = coordinatesObj[i].firstChild.nodeValue;
               triangleCoords.push({lat: parseFloat(name.split(",")[1]),lng:parseFloat(name.split(",")[0])})
           }
           this.createGoogleMap(triangleCoords);
       } else {
        this.createGoogleMap(triangleCoords);
       }
       
     });
    }
    
    // helper functions
    createGoogleMap (triangleCoords) {
        console.log(triangleCoords, '....');
        if(triangleCoords.lemgth > 0) {
          this.setState({center: triangleCoords[0]});
        }
        
        var map = new window.google.maps.Map(this.googleMapRef.current, {
            zoom: this.state.zoom,
            center: {
                lat: triangleCoords.lemgth > 0 ? triangleCoords[0].lat : 37.42390182131783,
                lng: triangleCoords.lemgth > 0 ? triangleCoords[0].lng : -122.0914977709329
            },
            mapTypeId: "terrain"
        });

          console.log(triangleCoords, '...traing..');
          // Construct the polygon.
          const bermudaTriangle = new window.google.maps.Polygon({
            paths: triangleCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: "#FF0000",
            fillOpacity: 0.35
          });
          bermudaTriangle.setMap(map);
          // Add a listener for the click event.
          // bermudaTriangle.addListener("click", showArrays);

          // infoWindow = new google.maps.InfoWindow();
      }
      
    createMarker() { 
      return new window.google.maps.Marker({
            position: {lat: myLocation.lat, lng: myLocation.lng},
            map: this.googleMap.current
        });
      }

    layerUpdate(layerIndex) {
        console.log(layerIndex, '...layerIndex...');
        if (layerIndex === 0) {
          this.setState({zoom: 17});
          layer1 = layer1 !== '' ? '' : 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
          this.getTriangleCoords(layer1);
        } 

        if (layerIndex === 1) {
          this.setState({zoom: 2});
          layer2 = layer2 !== '' ? '' : './westcampus.kml';
          this.getTriangleCoords(layer2);
        }
      } 

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
      
    componentDidMount() {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener('load', () => {
            this.googleMap.current = this.getTriangleCoords(layer1);
            // this.marker.current = this.createMarker()
        })
    }
    
    render() {
        return (
          <div>
            <button onClick={()=>this.layerUpdate(0)} type="button">Layer 0</button>
            <button onClick={()=>this.layerUpdate(1)} type="button">Layer 1</button>
            <div
                id="google-map"
                ref={this.googleMapRef}
                style={mapStyles}
            />
          </div>
      )
    }
}

export default GoogleMap