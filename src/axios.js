import axios from "axios";
import { Modal } from "antd";

function throwUnknownError(err) {
  Modal.error({
    title: "错误",
    content: "未知错误: " + JSON.stringify(err),
    centered: true,
    okText: "确认"
  });
}

const axiosOptions = {
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "cache-control": "no-cache",
    cache: "no-cache"
  },
  withCredentials: true
};

const service = axios.create(axiosOptions);

service.interceptors.response.use(
  res => {
    if (res.data && res.data.Result) {
      return res.data.Result;
    }
    return res.data;
  },
  err => {
    if (!err.response) {
      throwUnknownError(err);
    }
    switch (err.response.status) {
      case 401: {
        Modal.warning({
          centered: true,
          content: "登录超时",
          okText: "确认",
          autoFocusButton: "ok",
          onOk: () => undefined
        });
        break;
      }
      default: {
        throwUnknownError(err);
      }
    }
  }
);

export default service;
