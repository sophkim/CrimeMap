import React, { useEffect } from "react";
import axios from "axios";
import "./map.css";
import $ from "jquery";
//import OpenLayers from "openlayers";
//import proj4 from "proj4/dist/proj4";

const { Tmapv2 } = window;

const Map = () => {
  useEffect(
    () => {
      const map = new Tmapv2.Map("myMap", {
        center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
        httpsMode: true,
        zoom: 15,
      });

      // 생활안전지도
      // function addWmsLayer() {
      //   var param = {
      //     name: "치안사고통계(전체)",
      //     serverUrl:
      //       "www.safemap.go.kr/sm/apis.do?apikey=[DFU3CGVL-DFU3-DFU3-DFU3-DFU3CGVLH9]&layer=A2SM_CRMNLSTATS&style=A2SM_CrmnlStats_Tot",
      //     layername: "A2SM_CRMNLSTATS",
      //     styles: "A2SM_CrmnlStats_Tot",
      //   };
      //   var wmsLayer = new OpenLayers.Layer.WMS(
      //     param.name,
      //     param.serverUrl,
      //     {
      //       layers: "" + param.layername,
      //       styles: param.styles,
      //       format: "image/png",
      //       exceptions: "text/xml",
      //       transparent: true,
      //     },
      //     { isBaseLayer: false }
      //   );
      //   map.addLayer(wmsLayer);
      // }

      // 출발지 설정 - POI 통합 검색 API 요청
      var markerArr = [];
      var lonlat;

      $("#startPoint").keydown(
        function (key) {
          if (key.keyCode === 13) {
            var searchKeyword = $("#startPoint").val();
            $.ajax({
              method: "GET",
              url: "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result",
              async: false,
              data: {
                appKey: "l7xxf4d6ce3985d1419b9a268be498b40d48",
                searchKeyword: searchKeyword,
                resCoordType: "EPSG3857",
                reqCoordType: "WGS84GEO",
                count: 10,
              },
              success: function (response) {
                var resultpoisData = response.searchPoiInfo.pois.poi;

                // 기존 마커, 팝업 제거
                if (markerArr.length > 0) {
                  for (var i in markerArr) {
                    markerArr[i].setMap(null);
                  }
                }

                var innerHtml = "";
                var positionBounds = new Tmapv2.LatLngBounds();

                // 결과값 리스트 생성
                for (var k in resultpoisData) {
                  var noorLat = Number(resultpoisData[k].noorLat);
                  var noorLon = Number(resultpoisData[k].noorLon);
                  var name = resultpoisData[k].name;

                  var pointCng = new Tmapv2.Point(noorLon, noorLat);
                  var projectionCng =
                    new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(pointCng);

                  var lat = projectionCng._lat;
                  var lon = projectionCng._lng;

                  var markerPosition = new Tmapv2.LatLng(lat, lon);

                  // 마커 형태로 표시
                  marker = new Tmapv2.Marker({
                    position: markerPosition,
                    icon:
                      "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
                      k +
                      ".png",
                    iconSize: new Tmapv2.Size(24, 38),
                    title: name,
                    map: map,
                  });

                  innerHtml +=
                    "<li><img src='http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
                    k +
                    ".png' style='vertical-align:middle;'/><span>" +
                    name +
                    "</span></li>";

                  markerArr.push(marker);
                  positionBounds.extend(markerPosition);

                  map.addListener("click", startP);

                  //출발지 마커 클릭 이벤트
                  function startP(e) {
                    if (typeof marker_s === "undefined") {
                      lonlat = e.latLng;

                      marker_s = new Tmapv2.Marker({
                        position: new Tmapv2.LatLng(lonlat.lat(), lonlat.lng()),
                        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
                        iconSize: new Tmapv2.Size(24, 38),
                        map: map,
                      });

                      for (var i in markerArr) {
                        markerArr[i].setMap(null);
                      }

                      $("#searchResult").html("도착지를 설정하세요!");
                      markerArr.push(marker);
                    }
                  }
                }

                $("#searchResult").html(innerHtml);
                map.panToBounds(positionBounds);
                map.zoomOut();
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
              }, //error
            }); //ajax
          } //if
        } //startPoint
      ); //$("#strartPoint")

      // 도착지 설정 - POI 통합 검색 API 요청
      var markerArr = [];

      $("#endPoint").keydown(
        function (key) {
          if (key.keyCode === 13) {
            var searchKeyword = $("#endPoint").val();
            $.ajax({
              method: "GET",
              url: "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result",
              async: false,
              data: {
                appKey: "l7xxf4d6ce3985d1419b9a268be498b40d48",
                searchKeyword: searchKeyword,
                resCoordType: "EPSG3857",
                reqCoordType: "WGS84GEO",
                count: 10,
              },
              success: function (response) {
                var resultpoisData = response.searchPoiInfo.pois.poi;

                // 기존 마커, 팝업 제거
                if (markerArr.length > 0) {
                  for (var i in markerArr) {
                    markerArr[i].setMap(null);
                  }
                }
                var innerHtml = ""; // Search Reulsts 결과값 노출 위한 변수
                var positionBounds = new Tmapv2.LatLngBounds(); //맵에 결과물 확인 하기 위한 LatLngBounds객체 생성

                // 결과값 리스트 생성
                for (var k in resultpoisData) {
                  var noorLat = Number(resultpoisData[k].noorLat);
                  var noorLon = Number(resultpoisData[k].noorLon);
                  var name = resultpoisData[k].name;

                  var pointCng = new Tmapv2.Point(noorLon, noorLat);
                  var projectionCng =
                    new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(pointCng);

                  var lat = projectionCng._lat;
                  var lon = projectionCng._lng;

                  var markerPosition = new Tmapv2.LatLng(lat, lon);

                  // 마커 형태로 표시
                  marker = new Tmapv2.Marker({
                    position: markerPosition,
                    icon:
                      "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
                      k +
                      ".png",
                    iconSize: new Tmapv2.Size(24, 38),
                    title: name,
                    map: map,
                  });

                  innerHtml +=
                    "<li><img src='http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
                    k +
                    ".png' style='vertical-align:middle;'/><span>" +
                    name +
                    "</span></li>";

                  markerArr.push(marker);
                  positionBounds.extend(markerPosition);

                  map.addListener("click", endP);

                  //도착지 마커 클릭 이벤트
                  function endP(e) {
                    if (typeof marker_e == "undefined") {
                      for (var i in markerArr) {
                        markerArr[i].setMap(null);
                      }

                      lonlat = e.latLng;

                      marker_e = new Tmapv2.Marker({
                        position: new Tmapv2.LatLng(lonlat.lat(), lonlat.lng()),
                        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
                        iconSize: new Tmapv2.Size(24, 38),
                        map: map,
                      });

                      $("#searchResult").html("안전경로를 확인해보세요!");
                      markerArr.push(marker);
                    }
                  }
                }

                $("#searchResult").html(innerHtml);
                map.panToBounds(positionBounds);
                map.zoomOut();
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
              }, //error
            }); //ajax
          } //if
        } //startPoint
      );

      let marker_s, marker_e, marker;

      //경로 선 그리기
      let headers = {};
      headers["appKey"] = "l7xxf4d6ce3985d1419b9a268be498b40d48";

      $("#btn_select").click(function (key) {
        //시작 마커
        // marker_s = new Tmapv2.Marker({
        //   position: new Tmapv2.LatLng(37.568085523663385, 126.98605733268329),
        //   icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
        //   iconSize: new Tmapv2.Size(24, 38),
        //   map: map,
        // });

        //도착 마커
        // marker_e = new Tmapv2.Marker({
        //   position: new Tmapv2.LatLng(37.56445848334345, 127.00973587385866),
        //   icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
        //   iconSize: new Tmapv2.Size(24, 38),
        //   map: map,
        // });

        //경유지 2개
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

        //경로 그리기
        let headers = {};
        headers["appKey"] = "l7xxf4d6ce3985d1419b9a268be498b40d48";

        $.ajax({
          type: "POST",
          headers: headers,
          url: "https://apis.openapi.sk.com/tmap/routes/routeOptimization20?version=1&format=json", //
          async: false,
          contentType: "application/json",
          data: JSON.stringify({
            reqCoordType: "WGS84GEO",
            resCoordType: "EPSG3857",
            startName: "출발",
            startX: String(marker_s.getPosition()._lng),
            startY: String(marker_s.getPosition()._lat),
            startTime: "202111121314",
            endName: "도착",
            endX: String(marker_e.getPosition()._lng),
            endY: String(marker_e.getPosition()._lat),
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
            ],
          }),

          success: function (response) {
            var resultData = response.properties;
            var resultFeatures = response.features;

            console.log(resultFeatures);

            for (var i in resultFeatures) {
              var geometry = resultFeatures[i].geometry;
              var properties = resultFeatures[i].properties;
              var polyline_;

              let drawInfoArr = [];

              if (geometry.type === "LineString") {
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
        }); //경로 그리기
      });
    }, //useEffect
    []
  );

  return (
    <div className="Map">
      <div className="sidebar">
        <input
          type="text"
          className="startPoint"
          id="startPoint"
          name="startPoint"
          placeholder="출발지를 입력해주세요."
        ></input>
        <div className="sidebarEnd"></div>
        <input
          type="text"
          className="endPoint"
          id="endPoint"
          name="endPoint"
          placeholder="도착지를 입력해주세요."
        ></input>
        <button id="btn_select">시작하기</button>
      </div>

      <div className="sidebar2">
        <div className="title"></div>
        <div className="rst_wrap">
          <div className="rst mCustomScrollbar">
            <ul id="searchResult" name="searchResult">
              <p>
                안전경로를 추천해 줍니다:)
                <br />
                우선 출발지와 도착지를 입력해주세요!
              </p>
            </ul>
          </div>
        </div>
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
