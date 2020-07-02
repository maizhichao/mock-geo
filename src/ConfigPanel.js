import React, { useState } from "react";
import { Drawer } from "antd";

function Arrow(props) {
  return (
    <div className="config-panel-arrow" onClick={props.onClick}>
      <p title="隐藏">‹</p>
    </div>
  );
}

export default function ConfigPanel(props) {
  const [visible, setVisible] = useState(false);
  if (!visible) {
    return (
      <div className="config-panel-anchor" onClick={() => setVisible(true)}>
        {"｜配置栏｜"}
      </div>
    );
  }

  return (
    <Drawer
      width={340}
      placement="left"
      title={"配置栏"}
      visible={true}
      mask={false}
      closable={false}
      bodyStyle={{ padding: 0 }}
    >
      <Arrow onClick={() => setVisible(false)} />
    </Drawer>
  );
}
