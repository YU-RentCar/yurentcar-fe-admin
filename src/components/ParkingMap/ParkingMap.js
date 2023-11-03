import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useEffect, useState } from "react";
import { MdZoomIn, MdZoomOut } from "react-icons/md";
import Alert from "popUp/Alert";
import { useAlert } from "utils/useAlert";
import { useRecoilValue } from "recoil";
import { alertAtom } from "recoil/alertAtom";
import option from "./option";
import colorSet from "./colorSet";
import MapController from "./MapController";

const axiosList = [
  { type: "인도", x: 1, y: 1 },
  { type: "차도", x: 2, y: 1 },
  { type: "주차 가능", x: 1, y: 2 },
  { type: "주차 불가능", x: 2, y: 2 },
  { type: "인도", x: 3, y: 3 },
  { type: "주차 가능", x: 3, y: 4 },
  { type: "차도", x: 4, y: 3 },
  { type: "인도", x: 5, y: 3 },
  { type: "주차 불가능", x: 3, y: 5 },
];

const ParkingMap = () => {
  // 버튼 스타일 상수
  const UNSELECTED_STYLE =
    "flex items-center justify-start p-2 text-xl font-bold border border-gray-500 rounded-2xl";

  // 컨트롤러
  const mapController = new MapController(50, 45, 80);

  // alert 표시
  const alert = useAlert();
  const alertState = useRecoilValue(alertAtom);

  // state
  const [drawOption, setDrawOption] = useState("init");
  const [zoom, setZoom] = useState(1);
  const [rects, setRects] = useState(
    [...Array(mapController.MAX)].map((v, i) => {
      return {
        id: i.toString(),
        x: mapController.getX(i, zoom),
        y: mapController.getY(i, zoom),
        fill: "white",
      };
    })
  );

  //배율이 바뀌면 원래 위치를 유지하며 리렌더링
  useEffect(() => {
    setRects(
      [...Array(mapController.MAX)].map((v, i) => ({
        id: i.toString(),
        x: mapController.getX(i, zoom),
        y: mapController.getY(i, zoom),
        fill: rects[i].fill,
      }))
    );
  }, [zoom]);

  // 초기에 서버에 저장되어있는 지도를 가져와 렌더링
  // axiosList로 지도 정보를 받았다고 가정
  useEffect(() => {
    for (const item of axiosList) {
      const idx = item.y * mapController.COL + item.x;

      rects[idx] = {
        id: idx.toString(),
        x: mapController.getX(idx, zoom),
        y: mapController.getY(idx, zoom),
        fill: colorSet[option[item.type]],
      };
    }

    setRects([...rects]);
  }, []);

  return (
    <>
      <div className="w-[1140px] h-[180px] bg-white flex justify-around items-center rounded-2xl mb-2 border select-none">
        <div>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div
              className={
                drawOption === option.sidewalk
                  ? getSelectedStyle(colorSet[option.sidewalk])
                  : UNSELECTED_STYLE
              }
              onClick={() => setDrawOption(option.sidewalk)}
            >
              <div className="bg-[#4ADE80] w-[30px] h-[30px] ml-2 mr-4"></div>
              <div>인도</div>
            </div>
            <div
              className={
                drawOption === option.parkingAvailable
                  ? getSelectedStyle(colorSet[option.parkingAvailable])
                  : UNSELECTED_STYLE
              }
              onClick={() => setDrawOption(option.parkingAvailable)}
            >
              <div className="bg-[#60A5FA] w-[30px] h-[30px] ml-2 mr-4"></div>
              <div>주차 가능</div>
            </div>
            <div
              className={
                drawOption === option.driveway
                  ? getSelectedStyle(colorSet[option.driveway])
                  : UNSELECTED_STYLE
              }
              onClick={() => setDrawOption(option.driveway)}
            >
              <div className="bg-[#94A3B8] w-[30px] h-[30px] ml-2 mr-4"></div>
              <div>차도</div>
            </div>
            <div
              className={
                drawOption === option.parkingDisable
                  ? getSelectedStyle(colorSet[option.parkingDisable])
                  : UNSELECTED_STYLE
              }
              onClick={() => setDrawOption(option.parkingDisable)}
            >
              <div className="bg-[#F87171] w-[30px] h-[30px] ml-2 mr-4"></div>
              <div>주차 불가능</div>
            </div>
          </div>
          <p className="mt-2">
            원하는 버튼을 선택하고 지도의 원하는 위치에 표시해 보세요
          </p>
          <p>더블 클릭으로 삭제할 수 있습니다.</p>
        </div>

        <div className="w-[650px] h-[160px] rounded-xl border border-black flex justify-between items-center px-10">
          <div className="flex flex-col items-center">
            <h1 className="px-2 pr-5 mb-3 mr-2 text-xl font-bold">
              현재 배율 : {`${Math.round(zoom * 100) / 100}배`}
            </h1>
            <div className="flex">
              <div
                className="flex flex-col items-center justify-center px-4 py-2 mr-5 font-bold text-black text-md bg-slate-200 rounded-xl"
                onClick={() =>
                  Math.round(zoom * 100) / 100 !== 1.4
                    ? setZoom(zoom + 0.2)
                    : null
                }
              >
                <MdZoomIn className="text-2xl"></MdZoomIn>
                <p>배율 증가</p>
              </div>
              <div
                className="flex flex-col items-center justify-center px-4 py-2 mr-5 font-bold text-black pflex-col text-md bg-slate-200 rounded-xl"
                onClick={() =>
                  Math.round(zoom * 100) / 100 !== 0.2
                    ? setZoom(zoom - 0.2)
                    : null
                }
              >
                <MdZoomOut className="text-2xl"></MdZoomOut>
                <p>배율 감소</p>
              </div>
            </div>
          </div>

          <div className="flex">
            <div
              className="px-4 py-3 ml-4 font-bold text-black text-md bg-amber-400 rounded-xl hover:bg-amber-500"
              onClick={() => submitMapInfo()}
            >
              변경 상태 저장
            </div>
          </div>
        </div>
      </div>

      <Stage
        width={1136}
        height={550}
        draggable
        className="border-2 border-yellow-700 bg-purple-50"
      >
        <Layer>
          {rects.map((rect, idx) => {
            return (
              <Rect
                key={idx}
                id={rect.id}
                x={rect.x}
                y={rect.y}
                width={mapController.DEFAULT_SIZE * zoom}
                height={mapController.DEFAULT_SIZE * zoom}
                stroke="black"
                strokeWidth={0.3}
                fill={rect.fill}
                onPointerClick={handleOnClick}
                onPointerDblClick={handleOnDblClick}
              ></Rect>
            );
          })}
        </Layer>
      </Stage>

      {/* Alert 구역 */}
      {alertState.state && <Alert />}
    </>
  );

  // Axios 태워서 보내기만 하면 끝
  function submitMapInfo() {
    const payload = JSON.stringify({
      parkingSpotRequestList: rects
        .map((item) => {
          return {
            x: item.x / (mapController.DEFAULT_SIZE * zoom),
            y: item.y / (mapController.DEFAULT_SIZE * zoom),
            type: (() => {
              for (let type in colorSet) {
                if (item.fill === colorSet[type]) {
                  return type;
                }
              }
            })(),
          };
        })
        .filter((item) => item.type),
    });

    console.log(payload);
  }

  // 클릭 시 색칠
  function handleOnClick(e) {
    const id = e.target.attrs.id;

    if (e.target.attrs.fill === colorSet[option.parkingAvailable]) {
      // Axios 확인한번 해보기
      alert.onAndOff("현재 주차중인 차가 있어, 바꿀 수 없습니다");
    }

    setRects(
      rects.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            fill: drawOption === "init" ? item.fill : colorSet[drawOption],
          };
        } else {
          return item;
        }
      })
    );
  }

  // 더블클릭시 삭제
  function handleOnDblClick(e) {
    const id = e.target.attrs.id;
    console.log(id);

    if (e.target.attrs.fill === colorSet[option.parkingAvailable]) {
      // Axios 확인한번 해보기
      alert.onAndOff("현재 주차중인 차가 있어, 바꿀 수 없습니다");
    }

    setRects(
      rects.map((v, i) => {
        if (id === v.id) {
          return {
            ...v,
            fill: "white",
          };
        } else {
          return v;
        }
      })
    );
  }

  // 색상을 받아 tailwind 스타일로 return
  function getSelectedStyle(color) {
    return UNSELECTED_STYLE + " bg-[" + color + "]";
  }
};

export default ParkingMap;
