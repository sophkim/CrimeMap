import React, { useEffect } from "react";
import "./map.css";

//const { kakao } = window;
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
    <div
      id="myMap"
      style={{
        width: "900px",
        height: "600px",
        position: "absolute",
        right: "70px",
        top: "150px",
      }}
    ></div>
  );
};

export default Map;
