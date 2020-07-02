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

export const customers = [
  {
    id: 100107,
    name: "shareuserA",
    token: "CRvWk2g/Sa4rH5DTm4aIngOZzsF7K6s+FxdFal5ZswQjse6k5tp0OGF9i4ek0fOZ"
  },
  {
    id: 100108,
    name: "TODO",
    token: "CRvWk2g/Sa4rH5DTm4aIngOZzsF7K6s+FxdFal5ZswQjse6k5tp0OGF9i4ek0fOZ"
  }
];

export default function ConfigPanel(props) {
  const [visible, setVisible] = useState(false);
  const [customer, setCustomer] = useState(customers[0]);

  if (!visible) {
    return (
      <div className="config-panel-anchor" onClick={() => setVisible(true)}>
        {"｜配置栏｜"}
      </div>
    );
  }

  const handleChange = value => {
    const selected = customers.find(c => c.id == value);
    setCustomer(selected);
    amap.setCustomer(selected);
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
        <Select defaultValue={customer.id} onChange={handleChange}>
          {customers.map(c => {
            return (
              <Select.Option key={c.id} value={c.id}>
                {c.name + " | " + c.id}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Drawer>
  );
}
