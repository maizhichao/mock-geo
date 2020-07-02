import React, { useState, useEffect } from "react";
import service from "./axios";
import "antd/dist/antd.less";
import "./App.less";
import { message } from "antd";
import ConfigPanel from "./ConfigPanel";

const AMap = window.AMap;

let startPos = [116.379028, 39.865042];
let endPos = [116.427281, 39.903719];
let startPosMarker;
let endPosMarker;
let updateInterval;
let map;
let driving;
let contextMenu;

function getPath(steps) {
  return steps.reduce((acc, current) => {
    const geo = current.path.map(p => [p.lng, p.lat]);
    return [...acc, ...geo];
  }, []);
}

function updateGeo([lng, lat]) {
  const geo = {
    customerId: 100107,
    lat: lat,
    lon: lng
  };
  console.log("Update geo", geo);
  message.success(JSON.stringify(geo));
  service({ url: "/location", method: "POST", data: geo });
}

function drive() {
  if (!map) {
    map = new AMap.Map("__map", {
      resizeEnable: true,
      center: [116.397428, 39.90923], //地图中心点
      zoom: 13 //地图显示的缩放级别
    });
  }
  if (!driving) {
    driving = new AMap.Driving({
      map: map,
      panel: "__panel"
    });
  } else {
    clearInterval(updateInterval);
  }

  // 根据起终点经纬度规划驾车导航路线
  driving.search(startPos, endPos, function (status, result) {
    if (status === "complete") {
      const paths = getPath(result.routes[0].steps);
      updateInterval = setInterval(() => {
        const path = paths.shift();
        if (!path) {
          clearInterval(updateInterval);
          return;
        }
        updateGeo(path);
      }, 5000);
    }
  });
  //创建右键菜单
  if (!contextMenu) {
    contextMenu = new AMap.ContextMenu();
    let contextMenuPositon;

    contextMenu.addItem(
      "设置为起点",
      function (e) {
        startPos = [contextMenuPositon.lng, contextMenuPositon.lat];
        if (startPosMarker) {
          startPosMarker.setPosition(contextMenuPositon);
        } else {
          startPosMarker = new AMap.Marker({
            map: map,
            position: contextMenuPositon //基点位置
          });
        }
      },
      1
    );

    contextMenu.addItem(
      "设置为终点",
      function (e) {
        endPos = [contextMenuPositon.lng, contextMenuPositon.lat];
        if (endPosMarker) {
          endPosMarker.setPosition(contextMenuPositon);
        } else {
          endPosMarker = new AMap.Marker({
            map: map,
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
            position: contextMenuPositon //基点位置
          });
        }
        drive();
      },
      2
    );

    //地图绑定鼠标右击事件——弹出右键菜单
    map.on("rightclick", function (e) {
      contextMenu.open(map, e.lnglat);
      contextMenuPositon = e.lnglat;
    });
  }
}

function App() {
  useEffect(() => {
    drive();
    return () => {
      clearInterval(updateInterval);
    };
  });

  return (
    <div className="map-container">
      <div id="__map"></div>
      <div id="__panel"></div>
    </div>
  );
}

export default App;
