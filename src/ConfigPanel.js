import React, { useState } from "react";
import { Drawer, Select, Form } from "antd";
import * as amap from "./amap";

function Arrow(props) {
  return (
    <div className="config-panel-arrow" onClick={props.onClick}>
      <p title="隐藏">‹</p>
    </div>
  );
}

export const users = [
  {
    id: 326109,
    customerId: 358919,
    name: "LB大屏用户1",
    token: "P4o3JpiVW/6xzn+uYd/AyewjMOVMZ8LVY3CC6y8TFpZuuVVvS9s0AQ5rh2j/UVer"
  },
  {
    id: 326110,
    customerId: 358919,
    name: "LB大屏用户2",
    token: "EAoTk2Va/kbf3lmlvGxcneqRq+pMsyPSnOQROOvYldii6TMK0cIbUNZK1DbwPMew"
  },
  {
    id: 326111,
    customerId: 358919,
    name: "LB大屏用户3",
    token: "1QHTRV4vAMFdlIvjqTfy//dR1kPQox2/b2qPaICez3r0L8J7vmX/IxxY2MjkjyK4"
  }
];

export default function ConfigPanel(props) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(users[0]);

  if (!visible) {
    return (
      <div className="config-panel-anchor" onClick={() => setVisible(true)}>
        {"｜配置栏｜"}
      </div>
    );
  }

  const handleChange = value => {
    const selected = users.find(c => c.id === value);
    setUser(selected);
    amap.setUser(selected);
  };

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
      <Form.Item name="customer" label="用户" style={{ margin: "10px 20px" }}>
        <Select defaultValue={user.id} onChange={handleChange}>
          {users.map(c => {
            return (
              <Select.Option key={c.id} value={c.id}>
                {c.name + " | " + c.id + "|" + c.customerId}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Drawer>
  );
}
