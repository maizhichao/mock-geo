import React, { useState, useEffect } from "react";
import "antd/dist/antd.less";
import "./App.less";
import * as amap from "./amap";
import ConfigPanel, { customers } from "./ConfigPanel";

function App() {
  useEffect(() => {
    amap.setCustomer(customers[0]);
    amap.init();
    amap.drive();
    return () => {
      amap.destroy();
    };
  });

  return (
    <div className="map-container">
      <div id="__map"></div>
      <div id="__panel"></div>
      <ConfigPanel />
    </div>
  );
}

export default App;
