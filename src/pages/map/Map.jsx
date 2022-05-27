import React, { useEffect } from "react";
import axios from "axios";
import cctvData from "./cctvData.json";
import "./map.css";

const { Tmapv2 } = window;

const Map = () => {
  useEffect(() => {
    const map = new Tmapv2.Map("myMap", {
      center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
      httpsMode: true,
      zoom: 15,
    });

    let marker_s, marker_e, marker, cctv;

    //시작 마커
    marker_s = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.568085523663385, 126.98605733268329),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });

    //도착 마커
    marker_e = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.56445848334345, 127.00973587385866),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });

    //경유지 6개
    marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.56626352138058, 126.98735015742581),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });

    marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.56568310756034, 127.00221495976581),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_2.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });

    marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.570369, 126.992153),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_3.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });

    marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.56335290252303, 127.00352387777271),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_4.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });

    marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.570721714117965, 127.00186090818215),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_5.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });

    marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.56515390827723, 126.99066536776698),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_6.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: map,
    });

    let cctvMarker = JSON.stringify(cctvData);

    // CCTV 마커 생성
    cctv = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_g_m_c.png",
      iconSize: new Tmapv2.Size(16, 24),
      map: map, //Marker가 표시될 Map 설정.
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
