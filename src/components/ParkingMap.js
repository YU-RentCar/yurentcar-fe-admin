import React from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import { useEffect, useState, useRef } from "react";
import { MdCreate, MdZoomIn, MdZoomOut } from "react-icons/md";

const ParkingMap = () => {
  const DEFAULT_SIZE = 50;

  const SELECTED_BTN =
    "flex flex-col items-center justify-center p-5 mx-5 text-2xl rounded-xl bg-blue-500";
  const UNSELECTED_BTN =
    "flex flex-col items-center justify-center p-5 mx-5 text-2xl rounded-xl bg-blue-200";

  const [clickMode, setClickMode] = useState("init");
  const [zoom, setZoom] = useState(1);
  const [size, _] = useState(DEFAULT_SIZE * zoom);

  const INITIAL_STATE = (() => {
    const row = 45;
    const col = 80;

    const max = row * col;

    return [...Array(max)].map((v, i) => {
      const temp = {
        id: i.toString(),
        x: (i % col) * (DEFAULT_SIZE * zoom),
        y: Math.floor(i / col) * (DEFAULT_SIZE * zoom),
        fill: "white",
      };
      return temp;
    });
  })();

  const [rects, setRects] = useState(INITIAL_STATE);

  useEffect(() => {
    const newTile = (() => {
      const row = 45;
      const col = 80;

      const max = row * col;

      return [...Array(max)].map((v, i) => {
        const temp = {
          id: i.toString(),
          x: (i % col) * (DEFAULT_SIZE * zoom),
          y: Math.floor(i / col) * (DEFAULT_SIZE * zoom),
          fill: rects[i].fill,
        };
        return temp;
      });
    })();

    setRects(newTile);
  }, [zoom]);

  const createClick = (e) => {
    const id = e.target.attrs.id;
    console.log(id);

    setRects(
      rects.map((v, i) => {
        if (id === v.id) {
          return {
            ...v,
            fill: "blue",
          };
        } else {
          return v;
        }
      })
    );
  };

  const deleteClick = (e) => {
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
  };

  return (
    <>
      <div className="">
        <div className="flex items-center justify-start py-2 my-5">
          <div className="text-4xl font-bold">주차장 관리</div>
        </div>
        <div className="w-[1140px] h-[180px] bg-white flex justify-around items-center rounded-2xl mb-2 border">
          <div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
              <div className="flex items-center justify-start p-2 text-xl font-bold border border-gray-500 rounded-2xl">
                <div className="bg-[#4ADE80] w-[30px] h-[30px] ml-2 mr-4"></div>
                <div>인도</div>
              </div>
              <div className="flex items-center justify-start p-2 text-xl font-bold border border-gray-500 rounded-2xl">
                <div className="bg-[#60A5FA] w-[30px] h-[30px] ml-2 mr-4"></div>
                <div>주차 가능</div>
              </div>
              <div className="flex items-center justify-start p-2 text-xl font-bold border border-gray-500 rounded-2xl">
                <div className="bg-slate-400 w-[30px] h-[30px] ml-2 mr-4"></div>
                <div>차도</div>
              </div>
              <div className="flex items-center justify-start p-2 text-xl font-bold border border-gray-500 rounded-2xl">
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
                현재 배율 : {"베배"}
              </h1>
              <div className="flex">
                <div className="flex flex-col items-center justify-center px-4 py-2 mr-5 font-bold text-black text-md bg-slate-200 rounded-xl">
                  <MdZoomIn className="text-2xl"></MdZoomIn>
                  <p>배율 증가</p>
                </div>
                <div className="flex flex-col items-center justify-center px-4 py-2 mr-5 font-bold text-black pflex-col text-md bg-slate-200 rounded-xl">
                  <MdZoomOut className="text-2xl"></MdZoomOut>
                  <p>배율 감소</p>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="px-4 py-3 ml-8 font-bold text-black bg-blue-300 text-md rounded-xl">
                지도 미리보기
              </div>

              <div className="px-4 py-3 ml-4 font-bold text-black text-md bg-amber-400 rounded-xl">
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
                width={size}
                height={size}
                stroke="black"
                fill={rect.fill}
                onPointerClick={
                  clickMode === "create" ? createClick : deleteClick
                }
              ></Rect>
            );
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default ParkingMap;
