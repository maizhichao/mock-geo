import React, { useState } from "react";
import "./index.less";
import { MessageOutlined } from "@ant-design/icons";
import { Popconfirm, Form, Input, message } from "antd";
import service from "../axios";
import * as amap from "../amap";

export default function AcceptTicket(props) {
  const [ticketId, setTicketId] = useState(null);
  const onChange = e => {
    setTicketId(e.target.value);
  };
  const title = (
    <Form.Item label="工单 ID">
      <Input onChange={onChange} />
    </Form.Item>
  );
  const onConfirm = () => {
    const user = amap.getUser();
    service({
      url: `/accept`,
      method: "POST",
      data: {
        ticketId: ticketId
      },
      headers: {
        token: user.token
      }
    })
      .then(res => {
        console.log(res);
        if (res && res.Error) {
          throw res.Error;
        }
        message.success(`【${user.name}】成功接单：${ticketId}`);
      })
      .catch(e => {
        message.error(`【${user.name}】接单失败：${ticketId}, Error: ${e}`);
      });
  };
  return (
    <Popconfirm
      title={title}
      okText="接单"
      cancelText="取消"
      onConfirm={onConfirm}
    >
      <div className="map-control accept-ticket">
        <MessageOutlined style={{ fontSize: 35 }} />
      </div>
    </Popconfirm>
  );
}
