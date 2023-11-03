import React from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import { useEffect, useState, useRef } from "react";
import { MdCreate, MdZoomIn, MdZoomOut } from "react-icons/md";

const ParkingMap = () => {
  // 기본 정사각형 크기
  const DEFAULT_WIDTH = 50;

  // 버튼 스타일
  const UNSELECTED_STYLE =
    "flex items-center justify-start p-2 text-xl font-bold border border-gray-500 rounded-2xl";

  // 색상 hex
  const COLOR_STYLE = {
    green: "#4ADE80",
    red: "#F87171",
    blue: "#60A5FA",
    gray: "#94A3B8",
  };

  const [clickMode, setClickMode] = useState("init");
  const [zoom, setZoom] = useState(1);
  const [size, _] = useState(DEFAULT_WIDTH * zoom);

  const INITIAL_STATE = (() => {
    const row = 45;
    const col = 80;

    const max = row * col;

    return [...Array(max)].map((v, i) => {
      const temp = {
        id: i.toString(),
        x: (i % col) * (DEFAULT_WIDTH * zoom),
        y: Math.floor(i / col) * (DEFAULT_WIDTH * zoom),
        fill: "white",
        carNumber: "",
      };
      return temp;
    });
  })();

  const [rects, setRects] = useState(INITIAL_STATE);

  // 색상을 받아 tailwind 스타일로 return
  const getSelectedStyle = (color) => {
    switch (color) {
      case "green":
        return UNSELECTED_STYLE + " bg-[#4ADE80]";
      case "red":
        return UNSELECTED_STYLE + " bg-[#F87171]";
      case "blue":
        return UNSELECTED_STYLE + " bg-[#60A5FA]";
      case "gray":
        return UNSELECTED_STYLE + " bg-slate-400";
      default:
    }
  };

  useEffect(() => {
    const newTile = (() => {
      const row = 45;
      const col = 80;

      const max = row * col;

      return [...Array(max)].map((v, i) => {
        const temp = {
          id: i.toString(),
          x: (i % col) * (DEFAULT_WIDTH * zoom),
          y: Math.floor(i / col) * (DEFAULT_WIDTH * zoom),
          fill: rects[i].fill,
        };
        return temp;
      });
    })();

    setRects(newTile);
  }, [zoom]);

  // 초기에 서버에 저장되어있는 지도를 가져오는 코드
  useEffect(() => {
    const row = 45;
    const col = 80;

    const max = row * col;

    // Axios 코드를 받아 옴.
    // {
    //   type: "인도",
    //   x: 1,
    //   y: 1,
    // }

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

    const initMap = [...Array(max)].map((v, i) => {
      const temp = {
        id: i.toString(),
        x: (i % col) * (DEFAULT_WIDTH * zoom),
        y: Math.floor(i / col) * (DEFAULT_WIDTH * zoom),
        fill: "white",
      };
      return temp;
    });

    for (const item of axiosList) {
      const idx = item.y * col + item.x;

      let fill = "";

      switch (item.type) {
        case "인도":
          fill = COLOR_STYLE["green"];
          break;
        case "차도":
          fill = COLOR_STYLE["gray"];
          break;
        case "주차 가능":
          fill = COLOR_STYLE["blue"];
          break;
        case "주차 불가능":
          fill = COLOR_STYLE["red"];
          break;
        default:
          break;
      }

      initMap[idx] = {
        id: idx.toString(),
        x: (idx % col) * (DEFAULT_WIDTH * zoom),
        y: Math.floor(idx / col) * (DEFAULT_WIDTH * zoom),
        fill: fill,
      };
    }

    setRects(initMap);
  }, []);

  return (
    <>
      <div className="">
        <div className="flex items-center justify-start py-2 my-5">
          <div className="text-4xl font-bold">주차장 관리</div>
        </div>
        <div className="w-[1140px] h-[180px] bg-white flex justify-around items-center rounded-2xl mb-2 border select-none">
          <div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
              <div
                className={
                  clickMode === "green"
                    ? getSelectedStyle("green")
                    : UNSELECTED_STYLE
                }
                onClick={() => setClickMode("green")}
              >
                <div className="bg-[#4ADE80] w-[30px] h-[30px] ml-2 mr-4"></div>
                <div>인도</div>
              </div>
              <div
                className={
                  clickMode === "blue"
                    ? getSelectedStyle("blue")
                    : UNSELECTED_STYLE
                }
                onClick={() => setClickMode("blue")}
              >
                <div className="bg-[#60A5FA] w-[30px] h-[30px] ml-2 mr-4"></div>
                <div>주차 가능</div>
              </div>
              <div
                className={
                  clickMode === "gray"
                    ? getSelectedStyle("gray")
                    : UNSELECTED_STYLE
                }
                onClick={() => setClickMode("gray")}
              >
                <div className="bg-slate-400 w-[30px] h-[30px] ml-2 mr-4"></div>
                <div>차도</div>
              </div>
              <div
                className={
                  clickMode === "red"
                    ? getSelectedStyle("red")
                    : UNSELECTED_STYLE
                }
                onClick={() => setClickMode("red")}
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
                  onClick={() => {
                    if (Math.round(zoom * 100) / 100 !== 1.4)
                      setZoom(zoom + 0.2);
                  }}
                >
                  <MdZoomIn className="text-2xl"></MdZoomIn>
                  <p>배율 증가</p>
                </div>
                <div
                  className="flex flex-col items-center justify-center px-4 py-2 mr-5 font-bold text-black pflex-col text-md bg-slate-200 rounded-xl"
                  onClick={() => {
                    if (Math.round(zoom * 100) / 100 !== 0.2)
                      setZoom(zoom - 0.2);
                  }}
                >
                  <MdZoomOut className="text-2xl"></MdZoomOut>
                  <p>배율 감소</p>
                </div>
              </div>
            </div>

            <div className="flex">
              <div
                className="px-4 py-3 ml-4 font-bold text-black text-md bg-amber-400 rounded-xl hover:bg-amber-500"
                onClick={() => getCondensedRects()}
              >
                변경 상태 저장
              </div>
            </div>
          </div>
        </div>
      </div>
      <Stage
        width={1136}
        height={550}
        draggable
        className="border-2 border-yellow-700 bg-slate-800"
      >
        <Layer>
          {rects.map((rect, idx) => {
            return (
              <Rect
                key={idx}
                id={rect.id}
                x={rect.x}
                y={rect.y}
                width={size * zoom}
                height={size * zoom}
                stroke="black"
                fill={rect.fill}
                onPointerClick={createClick}
                onPointerDblClick={deleteClick}
              ></Rect>
            );
          })}
        </Layer>
      </Stage>
    </>
  );

  // Axios 태워서 보내기만 하면 끝
  function getCondensedRects() {
    const payload = JSON.stringify({
      parkingSpotRequestList: rects
        .map((v, i) => {
          let type = "";

          switch (v.fill) {
            case COLOR_STYLE["green"]:
              type = "인도";
              break;
            case COLOR_STYLE["gray"]:
              type = "차도";
              break;
            case COLOR_STYLE["blue"]:
              type = "주차 가능";
              break;
            case COLOR_STYLE["red"]:
              type = "주차 불가능";
              break;
            default:
          }

          return {
            x: v.x / (DEFAULT_WIDTH * zoom),
            y: v.y / (DEFAULT_WIDTH * zoom),
            type: type,
          };
        })
        .filter((v, i) => v.type !== ""),
    });

    console.log(payload);
  }

  function createClick(e) {
    const id = e.target.attrs.id;
    console.log(e.target.attrs);

    setRects(
      rects.map((v, i) => {
        if (id === v.id) {
          return {
            ...v,
            fill: clickMode === "init" ? v.fill : COLOR_STYLE[clickMode],
          };
        } else {
          return v;
        }
      })
    );
  }

  function deleteClick(e) {
    const id = e.target.attrs.id;
    console.log(id);

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
};

export default ParkingMap;
