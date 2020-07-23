import React, { Component } from "react";
import GoogleApiKML from "./GoogleApiKML";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div id="react-root" style={{ width: "100%" }}>
        <div>Google Map</div>
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleApiKML />
        </div>
      </div>
    );
  }
};

export default App;
