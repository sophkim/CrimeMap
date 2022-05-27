import React, { useEffect } from "react";
import axios from "axios";
import "./map.css";

const { Tmapv2 } = window;

const Map = () => {
  useEffect(() => {
    const map = new Tmapv2.Map("myMap", {
      center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
      httpsMode: true,
      zoom: 15,
    });

    let marker_s, marker_e, marker;

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

    var headers = {};
    headers["appKey"] = "l7xxf4d6ce3985d1419b9a268be498b40d48";

    axios.get({
      type: "POST",
      headers: headers,
      url: "https://apis.openapi.sk.com/tmap/routes/routeOptimization10?version=1&format=json", //
      async: false,
      contentType: "application/json",
      data: JSON.stringify({
        reqCoordType: "WGS84GEO",
        resCoordType: "EPSG3857",
        startName: "출발",
        startX: "126.98605733268329",
        startY: "37.568085523663385",
        startTime: "201711121314",
        endName: "도착",
        endX: "127.00973587385866",
        endY: "37.56445848334345",
        searchOption: "0",
        viaPoints: [
          {
            viaPointId: "test01",
            viaPointName: "test01",
            viaX: "126.98735015742581",
            viaY: "37.56626352138058",
          },
          {
            viaPointId: "test02",
            viaPointName: "test02",
            viaX: "127.00221495976581",
            viaY: "37.56568310756034",
          },
          {
            viaPointId: "test03",
            viaPointName: "test03",
            viaX: "126.992153",
            viaY: "37.570369",
          },
          {
            viaPointId: "test04",
            viaPointName: "test04",
            viaX: "127.00352387777271",
            viaY: "37.56335290252303",
          },
          {
            viaPointId: "test05",
            viaPointName: "test05",
            viaX: "127.00186090818215",
            viaY: "37.570721714117965",
          },
          {
            viaPointId: "test06",
            viaPointName: "test06",
            viaX: "126.99066536776698",
            viaY: "37.56515390827723",
          },
        ],
      }),
      success: function (response) {
        var resultData = response.properties;
        var resultFeatures = response.features;

        // 결과 출력
        var tDistance =
          "총 거리 : " + (resultData.totalDistance / 1000).toFixed(1) + "km,  ";
        var tTime =
          "총 시간 : " + (resultData.totalTime / 60).toFixed(0) + "분,  ";
        var tFare = "총 요금 : " + resultData.totalFare + "원";

        document.getElementById("result").text(tDistance + tTime + tFare);
        //$("#result").text(tDistance + tTime + tFare);

        for (var i in resultFeatures) {
          var geometry = resultFeatures[i].geometry;
          var properties = resultFeatures[i].properties;
          var polyline_;

          let drawInfoArr = [];

          if (geometry.type == "LineString") {
            for (var j in geometry.coordinates) {
              // 경로들의 결과값(구간)들을 포인트 객체로 변환
              var latlng = new Tmapv2.Point(
                geometry.coordinates[j][0],
                geometry.coordinates[j][1]
              );
              // 포인트 객체를 받아 좌표값으로 변환
              var convertPoint =
                new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
              // 포인트객체의 정보로 좌표값 변환 객체로 저장
              var convertChange = new Tmapv2.LatLng(
                convertPoint._lat,
                convertPoint._lng
              );

              drawInfoArr.push(convertChange);
            }

            polyline_ = new Tmapv2.Polyline({
              path: drawInfoArr,
              strokeColor: "#FF0000",
              strokeWeight: 6,
              map: map,
            });
          }
        }
      },
      error: function (request, status, error) {
        console.log(
          "code:" +
            request.status +
            "\n" +
            "message:" +
            request.responseText +
            "\n" +
            "error:" +
            error
        );
      },
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
