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
  },
  {
    id: 326160,
    customerId: 358919,
    name: "LB巡检班长-德华",
    token: "0PzZfB9zxDIHNfGqbV0e48iuMx10F50kyMeB3piUamj4F+MXtbrb4JDYsmQR30fj3OiPNmiXmvK+Y7qx0DCF8Q=="
  },
  {
    id: 326161,
    customerId: 358919,
    name: "LB驻场工程师-伟霆",
    token: "yvfcYQwz2EptPc45gYbjKnCXAq8cXTyA6CNEVfNqJPQP2Y00rNJM25OvQ4T8Swk40Tt6vtwhyOZgmNYA8V4C0g=="
  },
  {
    id: 326162,
    customerId: 358919,
    name: "LB驻场工程师-华建",
    token: "X5Xsc5qx1yplAZdvU4G2a61p+lVZIZGdQO+THKJUf3HoncsLkJHLtzVHbvQaSVsMCe72RmcnzJH0egUauX/4Ww=="
  },
  {
    id: 326163,
    customerId: 358919,
    name: "LB驻场工程师-天乐",
    token: "x06HOKmLINSwdWufqZSNVFsLGeqhGEQtbamCqGuB2BcFU+kZ7VTjOhy6A/BZvNqTwpO39pL+nBlvk0Wf0VJCCg=="
  },
  {
    id: 326154,
    customerId: 374510,
    name: "巡检王班长",
    token: "Jl7kWPCXDvJZ7TQDPOr5xOsdV65f0Vxgw2dtMuUlwiapkLRnjysmeqFveQM/SAcf"
  },
  {
    id: 326155,
    customerId: 374510,
    name: "巡检-赵班长",
    token: "gftRZ0+jzfF36redYtlYAxHBDcwAdsazi15AnE6pbnfEPPK6mLfr+y+4QGqdRtNI"
  },
  {
    id: 326156,
    customerId: 374510,
    name: "驻场-小八",
    token: "zfT9T5zhK8hkJISFEFtaYj97jLYfLLT51OTE8Uf3fSXeaG4uwzG9VXFRNoQg4C1d"
  },
  {
    id: 326157,
    customerId: 374510,
    name: "驻场-小花",
    token: "sUUzDVP+6GyWpZdIxC/1hoeCiA4h48Lo2XDYVVDkkAuzOQbRU134Ira2v1h2pKYX"
  },
  {
    id: 326158,
    customerId: 374510,
    name: "巡检-周班长",
    token: "VfXmKuvLUC7coBNG7+pxEZett4N1F9Adft4cXlFD06nM6TArHJ/S9DkPszaZ5U9G"
  },
  {
    id: 326159,
    customerId: 374510,
    name: "驻场-小牛",
    token: "rJZ9vkzJPhxEbuULgexMSl9JeoL7WpcTwYC19oED3JoN4CUmwIO5CSehB9Oaph9i"
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
