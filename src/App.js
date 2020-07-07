import React, { useEffect } from "react";
import "antd/dist/antd.less";
import "./App.less";
import * as amap from "./amap";
import ConfigPanel, { users } from "./ConfigPanel";
import MoveControl from "./map-controls/MoveControl";
import AcceptTicket from "./map-controls/AcceptTicket";

function App() {
  useEffect(() => {
    amap.setUser(users[0]);
    amap.init();
    return () => {
      amap.destroy();
    };
  });

  return (
    <div className="map-container">
      <div id="__map"></div>
      <div id="__panel"></div>
      <ConfigPanel />
      <MoveControl />
      <AcceptTicket />
    </div>
  );
}

export default App;
