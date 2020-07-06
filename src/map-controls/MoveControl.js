import React, { useState, useEffect } from "react";
import "./index.less";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import * as amap from "../amap";

export default function MoveControl(props) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    amap.setPaused(paused);
  }, [paused]);

  const Comp = paused ? PlayCircleOutlined : PauseCircleOutlined;
  return (
    <div
      className="map-control move-control"
      onClick={() => setPaused(!paused)}
    >
      <Comp style={{ fontSize: 35 }} />
    </div>
  );
}
