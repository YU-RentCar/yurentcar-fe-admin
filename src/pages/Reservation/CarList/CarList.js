import React from "react";
import { useRecoilState } from "recoil";
import { MdSearch, MdArrowBack, MdArrowForward } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import useCarList from "./utils/useCarList";
import { altResvAtom, prevResvAtom } from "recoil/reservationAtom";
import dayjs from "dayjs";

const CarList = () => {
  // 페이지 조작을 위한 커스텀 훅
  const ctrl = useCarList(4);

  const [rclAltResv, setRclAltResv] = useRecoilState(altResvAtom);
  const [rclPrevResv, setRclPrevResv] = useRecoilState(prevResvAtom);

  // 검색 input
  const [findInput, setFindInput] = useState("");
  const [findTarget, setFindTarget] = useState("");

  // 검색중을 확인하는 boolean
  const [isFinding, setIsFinding] = useState(false);

  // 현재 페이지의 내용
  const [curPage, setCurPage] = useState([]);

  const [isPopUpShow, setIsPopUpShow] = useState(false);

  useEffect(() => {
    if (isFinding === true) {
      setCurPage(ctrl.findByCarName(findTarget));
    } else {
      setCurPage(ctrl.getPage());
    }
  }, [ctrl.getCurPage(), ctrl.getMaxPage()]);

  useEffect(() => {
    console.log("확인");
    console.log(rclAltResv);
  }, [isPopUpShow]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-[1140px] mx-auto rounded-2xl bg-white shadow-xl flex flex-col justify-center items-center">
          <div className="relative flex items-center justify-center w-full h-[50px] px-8 mt-12">
            {/* 타이틀 */}
            <span className="absolute text-3xl font-bold text-blue-500 left-8">
              예약 가능 차량 리스트
            </span>

            <div className="flex items-center h-full l">
              {/* 번호 검색 */}
              <input
                className="h-full px-8 text-xl font-semibold border-4 border-blue-500 rounded-full w-"
                placeholder="차량의 이름을 입력"
                value={findInput}
                onChange={(e) => setFindInput(e.target.value)}
              />
              {/* 검색 버튼 */}
              <button
                className="ml-4 text-5xl text-blue-500"
                onClick={() => {
                  if (findInput.trim() !== "") {
                    setCurPage(ctrl.findByCarName(findInput));
                    setFindTarget(findInput);
                    setIsFinding(true);
                  } else {
                    setCurPage(ctrl.getPage());
                    setIsFinding(false);
                  }
                }}
              >
                <MdSearch />
              </button>
            </div>
          </div>
          {/* 타이틀 */}
          <div className="flex items-center w-full h-20 pl-4 pr-8 mt-8 text-xl font-semibold border-b-2 border-b-black">
            <div className="w-[500px] h-full flex justify-center items-center">
              차량 이름
            </div>
            <div className="w-[500px] h-full flex justify-center items-center">
              차량 번호
            </div>

            <div className="w-[500px] h-full flex justify-center items-center"></div>
          </div>
          {/* 리스트 */}
          {curPage.map((v, i) => {
            return (
              <div
                id={i}
                className="flex items-center w-full h-16 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300"
                key={i}
              >
                <div className="w-[500px] h-full flex justify-center items-center">
                  {v.carName || ""}
                </div>
                <div className="w-[500px] h-full flex justify-center items-center">
                  {v.carNumber || ""}
                </div>

                <div className="w-[500px] h-full flex justify-center items-center">
                  {v.carName === null ? null : (
                    <div
                      className="py-2 bg-blue-500 rounded-full px-[40px] hover:bg-amber-400"
                      onClick={() => {
                        setRclAltResv({
                          startDate: rclAltResv.startDate,
                          startTime: rclAltResv.startTime,
                          endDate: rclAltResv.endDate,
                          endTime: rclAltResv.endTime,
                          carNumber: v.carNumber,
                          carName: v.carName,
                        });

                        setIsPopUpShow(!isPopUpShow);
                      }}
                    >
                      예약 변경
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* 페이지 */}

        <div className="w-[300px] flex justify-between items-center mt-10">
          <MdArrowBack
            className="text-5xl"
            onClick={() => {
              ctrl.toPrevPage();
            }}
          />
          <div className="text-lg">
            Page <span className="text-2xl">{ctrl.getCurPage()}</span> of{" "}
            <span className="text-2xl">{ctrl.getMaxPage()}</span>
          </div>
          <MdArrowForward
            className="text-5xl"
            onClick={() => {
              ctrl.toNextPage();
            }}
          />
        </div>

        {/* 팝업 */}
        {isPopUpShow ? (
          <div className="fixed flex items-center justify-center w-full h-full -mt-[200px]">
            <div className="w-[800px] h-[400px] bg-white border-2 border-blue-500 rounded-2xl flex justify-around flex-col items-start pl-[50px]">
              <div className="text-3xl font-bold text-blue-500 ">최종 확인</div>
              <div className="text-xl">{`${rclPrevResv.nickname} 사용자의 예약을`}</div>
              <div>
                <div className="text-xl">
                  <span>{`${dayjs(rclPrevResv.startDate).format(
                    "YY년 M월 D일"
                  )} ${dayjs("2000-02-02" + rclPrevResv.startTime).format(
                    "HH:mm"
                  )}`}</span>
                  <span>~</span>
                  <span>{`${dayjs(rclPrevResv.endDate).format(
                    "YY년 M월 D일"
                  )} ${dayjs("2000-02-02" + rclPrevResv.endTime).format(
                    "HH:mm"
                  )}`}</span>
                </div>
                <div className="text-xl">
                  <span>{`${rclPrevResv.carNumber} 차량의 예약에서`}</span>
                </div>
              </div>
              <div>
                <div className="text-xl">
                  <span>{`${dayjs(rclAltResv.startDate).format(
                    "YY년 M월 D일 "
                  )}`}</span>
                  <span>{`${rclAltResv.startTime}`}</span>
                  <span>~</span>
                  <span>{`${dayjs(rclAltResv.endDate).format(
                    "YY년 M월 D일 "
                  )}`}</span>
                  <span>{`${rclAltResv.endTime}`}</span>
                </div>
                <div className="text-xl">
                  <span>{`${rclAltResv.carName} `}</span>
                  <span>{`${rclAltResv.carNumber} 차량의 예약으로 변경하겠습니까?`}</span>
                </div>
              </div>
              <div className="flex justify-between select-none">
                <div className="flex items-center justify-center px-8 py-3 bg-blue-200 rounded-full hover:bg-blue-500">
                  확인
                </div>
                <div
                  className="flex items-center justify-center px-8 py-3 mx-2 bg-gray-300 rounded-full hover:bg-red-500"
                  onClick={() => setIsPopUpShow(false)}
                >
                  취소
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CarList;