import React, { useEffect } from "react";
import "./map.css";

const { kakao } = window;

const Map = () => {
  useEffect(() => {
    const container = document.getElementById("myMap");

    //지도 중심좌표 및 확대축소 레벨
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    //지도 생성
    const map = new kakao.maps.Map(container, options);

    //마커 생성
    const marker = new kakao.maps.Marker({
      position: options.center,
    });

    //지도 위에 마커 표시
    marker.setMap(map);

    // 지도 타입 컨트롤러 - 일반지도 & 스카이뷰
    const mapTypeControl = new kakao.maps.MapTypeControl();

    //지도에 컨트롤 추가
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    //확대 축소 줌컨트롤러 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  return (
    <div
      id="myMap"
      style={{
        width: "650px",
        height: "600px",
        position: "absolute",
        right: "80px",
        top: "150px",
      }}
    ></div>
  );
};

export default Map;
