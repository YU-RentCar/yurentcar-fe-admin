import React from "react";
import { useRecoilState } from "recoil";
import { MdSearch, MdArrowBack, MdArrowForward } from "react-icons/md";
import { reservationAtom, selectedInfoAtom } from "recoil/reservationAtom";
import { useEffect, useState, useRef } from "react";
import useCarList from "./utils/useCarList";

const CarList = () => {
  // 페이지 조작을 위한 커스텀 훅
  const ctrl = useCarList(4);

  const [rclResvAtom, setRclResvAtom] = useRecoilState(reservationAtom);
  const [rclSelected, setRclSelected] = useRecoilState(selectedInfoAtom);

  // 현재 페이지 쪽수
  const [pageNum, setPageNum] = useState(1);

  // 검색 input
  const [findInput, setFindInput] = useState("");

  // 검색중을 확인하는 boolean
  const [isFinding, setIsFinding] = useState(false);

  // 현재 페이지의 내용
  const [curPage, setCurPage] = useState([]);

  useEffect(() => {
    setCurPage(ctrl.getPage(pageNum));
    console.log("atom 확인 ", rclResvAtom);
    console.log("이전 확인 ", rclSelected);
  }, [pageNum]);

  const [selectedUser, _] = useRecoilState(selectedInfoAtom);

  // 새로 변경할 예약 내용을 저장
  const [newResvInfo, setNewResvInfo] = useRecoilState(reservationAtom);

  const [isPopUpShow, setIsPopUpShow] = useState(false);

  useEffect(() => {
    console.log(selectedUser);
    console.log(newResvInfo);
  }, []);

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
                    setCurPage(ctrl.findByCarName(findInput.trim()));
                    setIsFinding(true);
                  } else {
                    setCurPage(ctrl.getPage(pageNum));
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
                        setNewResvInfo({
                          startDate:
                            rclResvAtom.startDate + rclResvAtom.startTime,
                          endDate: rclResvAtom.endDate + rclResvAtom.endTime,
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
        {!isFinding ? (
          <div className="w-[300px] flex justify-between items-center mt-10">
            <MdArrowBack
              className="text-5xl"
              onClick={() => {
                if (pageNum === 1) return;
                setPageNum(pageNum - 1);
              }}
            />
            <div className="text-lg">
              Page <span className="text-2xl">{pageNum}</span> of{" "}
              <span className="text-2xl">{ctrl.getMaxPage()}</span>
            </div>
            <MdArrowForward
              className="text-5xl"
              onClick={() => {
                if (pageNum === ctrl.getMaxPage()) return;
                setPageNum(pageNum + 1);
              }}
            />
          </div>
        ) : null}

        {/* 팝업 */}
        {isPopUpShow ? (
          <div className="fixed flex items-center justify-center w-full h-full -mt-[300px]">
            <div className="w-[800px] h-[300px] bg-white border-4 border-blue-500 rounded-2xl flex justify-center flex-col items-center">
              <div className="pb-8 text-3xl font-bold text-blue-500">
                최종 확인
              </div>
              <div>{`${rclSelected.nickname} 사용자의 차량번호 : ${rclSelected.carNumber} 에 대한`}</div>
              <div>{`${rclSelected.startDate} ~ ${rclSelected.endDate} 까지의 예약을`}</div>
              <div>{`${newResvInfo.carName} : ${newResvInfo.carNumber} ${newResvInfo.startDate} ~ ${newResvInfo.endDate} 에 대한 예약으로 변경하겠습니까?`}</div>
              <div className="flex justify-between select-none">
                <div className="flex items-center justify-center px-8 py-3 mx-2 bg-blue-200 rounded-full">
                  확인
                </div>
                <div
                  className="flex items-center justify-center px-8 py-3 mx-2 bg-red-200 rounded-full"
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
