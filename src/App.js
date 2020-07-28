import React, { Component } from "react";
// import GoogleApiKML from "./GoogleApiKML";
// import MapUpdate from "./GoogleMap";
import GoogleMap from "./GoogleMapJs";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div id="react-root" style={{ width: "100%" }}>
        <div>Google Map</div>
        <div style={{ height: "400px", width: "100%" }}>
          {/* <GoogleApiKML /> */}
          {/* <MapUpdate/> */}
          <GoogleMap/>
        </div>
      </div>
    );
  }
};

export default App;
