import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { MdSearch, MdArrowBack, MdArrowForward } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { altResvAtom, prevResvAtom } from "recoil/reservationAtom";
import dayjs from "dayjs";
import { getChangeableCarList, patchReservation } from "api/changeResvAxios";
import { adminAtom } from "recoil/adminAtom";
import { useAlert } from "utils/useAlert";

const CarList = ({ setActiveStep }) => {
  function paddingList(list, MAX_ROW) {
    const tempList = [...list];

    for (let i = 0; i < MAX_ROW - list.length; i++) {
      tempList.push({
        carName: null,
        carNumber: null,
      });
    }

    return tempList;
  }

  // 한 페이지의 최대 row
  const MAX_ROW = 4;

  // 예약 정보
  const [cars, setCars] = useState([]);

  // 실제로 리스트에 뿌려지는 데이터
  const [listData, setListData] = useState([]);

  // 현재 페이지 숫자
  const [pageNum, setPageNum] = useState(1);

  // 최대 페이지 숫자
  const [maxPageNum, setMaxPageNum] = useState(1);

  const [rclAltResv, setRclAltResv] = useRecoilState(altResvAtom);

  const [rclPrevResv, setRclPrevResv] = useRecoilState(prevResvAtom);

  const adminInfo = useRecoilValue(adminAtom);

  // 검색 input
  const [findInput, setFindInput] = useState("");
  const [findTarget, setFindTarget] = useState("");

  // 검색중을 확인하는 boolean
  const [isFinding, setIsFinding] = useState(false);

  // 팝업 state
  const [isPopUpShow, setIsPopUpShow] = useState(false);

  const alert = useAlert();

  // 초기 useEffect
  useEffect(() => {
    const startDate = `${rclAltResv.startDate}T${rclAltResv.startTime}:00`;
    const endDate = `${rclAltResv.endDate}T${rclAltResv.endTime}:00`;

    console.log(startDate, endDate);
    console.log(rclPrevResv.reservationId);

    const dateInfo = {
      startDate: startDate,
      endDate: endDate,
    };

    getChangeableCarList(
      JSON.parse(window.sessionStorage.getItem("adminInfo")).adminUsername,
      rclPrevResv.reservationId,
      dateInfo
    )
      .then((response) => {
        console.log(response.data);
        setCars(response.data);

        const temp = response.data.slice(0, MAX_ROW);

        setListData(paddingList(temp, MAX_ROW));

        setPageNum(1);
        setMaxPageNum(Math.ceil(response.data.length / MAX_ROW));
      })
      .catch((error) => {
        console.log(error);
        console.log("예약 변경할 수 있는 차량들을 받아오지 못했다");
      });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full select-none">
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
                    const findData = cars
                      .filter((v) => v.carName === findInput)
                      .slice(0, MAX_ROW);

                    if (findData.length === 0) {
                      alert.onAndOff("검색 결과가 없습니다.");
                    } else {
                      setIsFinding(true);
                      setPageNum(1);

                      setMaxPageNum(
                        Math.ceil(
                          cars.filter((v) => v.carName === findInput).length /
                            MAX_ROW
                        )
                      );

                      setListData(paddingList(findData, MAX_ROW));
                    }
                  } else {
                    setIsFinding(false);
                    setMaxPageNum(Math.ceil(cars.length / MAX_ROW));
                    setListData(
                      paddingList(cars.slice(0, 1 * MAX_ROW), MAX_ROW)
                    );
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
          {listData.map((v, i) => {
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
              if (pageNum - 1 >= 1) {
                if (isFinding === true) {
                  setPageNum(pageNum - 1);

                  const findData = cars
                    .filter((v) => v.carName === findInput)
                    .slice(
                      (pageNum - 1 - 1) * MAX_ROW,
                      (pageNum - 1) * MAX_ROW
                    );

                  setListData(paddingList(findData, MAX_ROW));
                } else {
                  setPageNum(pageNum - 1);

                  const temp = cars.slice(
                    (pageNum - 1 - 1) * MAX_ROW,
                    (pageNum - 1) * MAX_ROW
                  );

                  setListData(paddingList(temp, MAX_ROW));
                }
              }
            }}
          />
          <div className="text-lg">
            Page <span className="text-2xl">{pageNum}</span> of{" "}
            <span className="text-2xl">{maxPageNum}</span>
          </div>
          <MdArrowForward
            className="text-5xl"
            onClick={() => {
              if (pageNum + 1 <= maxPageNum) {
                if (isFinding === true) {
                  setPageNum(pageNum + 1);

                  const findData = cars
                    .filter((v) => v.carName === findInput)
                    .slice(pageNum * MAX_ROW, (pageNum + 1) * MAX_ROW);

                  setListData(paddingList(findData, MAX_ROW));
                } else {
                  setPageNum(pageNum + 1);

                  const temp = cars.slice(
                    pageNum * MAX_ROW,
                    (pageNum + 1) * MAX_ROW
                  );

                  setListData(paddingList(temp, MAX_ROW));
                }
              }
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
                  <span>{`${rclAltResv.carNumber} 차량의 예약으로 변경하겠습니까?`}</span>
                </div>
              </div>
              <div className="flex justify-between select-none">
                <div
                  className="flex items-center justify-center px-8 py-3 bg-blue-200 rounded-full hover:bg-blue-500"
                  onClick={() => {
                    const resvInfo = {
                      startDate: `${rclAltResv.startDate}T${rclAltResv.startTime}:00`,
                      endDate: `${rclAltResv.endDate}T${rclAltResv.endTime}:00`,
                      carNumber: rclAltResv.carNumber,
                      reservationId: rclPrevResv.reservationId,
                    };

                    patchReservation(
                      JSON.parse(window.sessionStorage.getItem("adminInfo"))
                        .adminUsername,
                      resvInfo
                    )
                      .then((response) => {
                        console.log("예약 변경 완료");
                        setActiveStep(0);
                        setIsPopUpShow(false);
                      })
                      .catch((error) => {
                        console.log("예약 변경 실패");
                        setIsPopUpShow(false);
                      });
                  }}
                >
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
