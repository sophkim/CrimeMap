import React, { useEffect } from "react";
import "./map.css";

const { Tmapv2 } = window;

const Map = () => {
  useEffect(() => {
    const map = new Tmapv2.Map("myMap", {
      center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
      httpsMode: true,
      zoom: 15,
    });
  }, []);

  return (
    <div className="Map">
      <div className="sidebar">
        <input
          className="sidebarStart"
          type="text"
          placeholder="출발지를 입력해주세요."
        ></input>
        <div className="sidebarEnd"></div>
        <input
          className="sidebarStart"
          type="text"
          placeholder="도착지를 입력해주세요."
        ></input>
        <button className="sidebarBtn">시작하기</button>
      </div>
      <div className="sidebar2">
        <p>
          안전경로를 추천해 줍니다:)
          <br />
          우선 출발지와 도착지를 입력해주세요!
        </p>
      </div>
      <div
        id="myMap"
        style={{
          width: "900px",
          height: "600px",
          position: "absolute",
          right: "70px",
          top: "150px",
          textAlign: "right",
        }}
      ></div>
    </div>
  );
};

export default Map;
