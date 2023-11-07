import React from "react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { changeInfoSelector } from "recoil/manageCarAtom";
import { useLocation } from "react-router-dom";
import { getCarInfo } from "api/manageCarAxios";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  MdLocalCarWash,
  MdOutlineDateRange,
  MdDateRange,
  MdPeopleAlt,
  MdSettings,
  MdTag,
  MdOutlineFlag,
  MdPhotoSizeSelectSmall,
  MdArrowBackIosNew,
} from "react-icons/md";

const DetailInfo = React.memo(() => {
  const location = useLocation(); // location state 정보
  const [newDetail, setNewDetail] = useRecoilState(changeInfoSelector); // detail 제어
  useEffect(() => {
    if (location.state.type === "modify") {
      // 차량 정보
      getCarInfo(location.state.carNumber)
        .then((response) => {
          console.log("관리차 / 차량상세정보 : ", response.data);
          const tmp = {
            oilType: response.data.oilType,
            carSize: response.data.carSize,
            releaseDate: response.data.releaseDate,
            createdAt: response.data.createdAt,
            transmission: response.data.transmission,
            maxPassenger: response.data.maxPassenger,
            carBrand: response.data.carBrand,
            isKorean: response.data.isKorean,
          };
          setNewDetail(tmp);
        })
        .catch((error) => {
          console.log("관리차 / 차량상세정보에러 : ", error.response);
        });
    }
  }, []);
  return (
    <div className="flex flex-col items-center w-full py-8 mt-12 bg-sky-50 rounded-2xl shadow-figma">
      {/* 타이틀 */}
      <div className="w-[700px] h-[35px] flex justify-between items-center text-blue-800 text-[30px] font-extrabold">
        차량 상세 정보
      </div>
      {/* 상세 정보 */}
      <div className="w-[750px] h-[360px] mx-auto bg-blue-200 rounded-2xl mt-4 flex justify-center items-center">
        <div className="grid w-full grid-cols-4 gap-y-4">
          {/* 유종 */}
          <div className="w-[150px] h-[150px] bg-sky-50 flex flex-col justify-around rounded-xl mx-6 px-3 py-3">
            <MdLocalCarWash className="text-[45px]" />
            <span className="text-lg font-semibold">유종</span>
            <div className="flex items-center">
              <input
                className="w-full px-2 text-base font-bold text-blue-900 border-2 border-blue-900 h-9 rounded-xl"
                placeholder=""
                value={newDetail.oilType}
                onChange={(e) => setNewDetail({ oilType: e.target.value })}
              />
            </div>
          </div>
          {/* 차량 크기 */}
          <div className="w-[150px] h-[150px] bg-sky-50 flex flex-col justify-around rounded-xl mx-6 px-3 py-3">
            <MdPhotoSizeSelectSmall className="text-[45px]" />
            <span className="text-lg font-semibold">차량 크기</span>
            <div className="flex items-center">
              <input
                className="w-full px-2 text-base font-bold text-blue-900 border-2 border-blue-900 h-9 rounded-xl"
                value={newDetail.carSize}
                onChange={(e) => setNewDetail({ carSize: e.target.value })}
              />
            </div>
          </div>
          {/* 출시일 */}
          <div className="w-[150px] h-[150px] bg-sky-50 flex flex-col justify-around rounded-xl mx-6 px-3 py-3">
            <MdOutlineDateRange className="text-[45px]" />
            <span className="text-lg font-semibold">출시일</span>
            <div className="flex items-center">
              {/* 2000 ~ 현재까지의 년도 제공 */}
              <Menu placement="bottom">
                <MenuHandler>
                  <button className="flex items-center justify-around w-full px-2 text-base font-bold text-white bg-blue-400 rounded-xl h-9 ">
                    <span id="release" className="font-bold">
                      {newDetail.releaseDate.split("-")[0]}
                    </span>
                    <MdArrowBackIosNew className="-rotate-90" />
                  </button>
                </MenuHandler>
                <MenuList className="max-h-72">
                  {Array(24)
                    .fill(2000)
                    .map((v, i) => {
                      return (
                        <MenuItem
                          className="flex items-center justify-center text-lg font-bold"
                          onClick={() => {
                            // 입력 정보로 바꾸고 저장
                            document.getElementById("release").innerText =
                              String(v + i);
                            setNewDetail({
                              releaseDate: dayjs(
                                new Date(String(v + i))
                              ).format("YYYY-MM-DDTHH:mm:ss"),
                            });
                          }}
                          key={i}
                        >
                          {v + i}
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </Menu>
            </div>
          </div>
          {/* 등록일 */}
          <div className="w-[150px] h-[150px] bg-sky-50 flex flex-col justify-around rounded-xl mx-6 px-3 py-3">
            <MdDateRange className="text-[45px]" />
            <span className="text-lg font-semibold">등록일</span>
            <span className="text-2xl font-bold text-blue-900">
              {dayjs().format("YYYY") + "년"}
            </span>
          </div>
          {/* 승차 인원 */}
          <div className="w-[150px] h-[150px] bg-sky-50 flex flex-col justify-around rounded-xl mx-6 px-3 py-3">
            <MdPeopleAlt className="text-[45px]" />
            <span className="text-lg font-semibold">승차 인원</span>
            <div className="flex items-center">
              <input
                className="w-full px-2 text-base font-bold text-blue-900 border-2 border-blue-900 h-9 rounded-xl"
                type="number"
                value={newDetail.maxPassenger}
                onChange={(e) =>
                  setNewDetail({ maxPassenger: Number(e.target.value) })
                }
              />
            </div>
          </div>
          {/* 구동기 */}
          <div className="w-[150px] h-[150px] bg-sky-50 flex flex-col justify-around rounded-xl mx-6 px-3 py-3">
            <MdSettings className="text-[45px]" />
            <span className="text-lg font-semibold">구동기</span>
            <div className="flex items-center">
              {/* 자동, 수동 중 선택 */}
              <Menu placement="bottom">
                <MenuHandler>
                  <button className="flex items-center justify-around w-full px-2 text-base font-bold text-white bg-blue-400 rounded-xl h-9 ">
                    <span id="transmission" className="font-bold">
                      {newDetail.transmission}
                    </span>
                    <MdArrowBackIosNew className="-rotate-90" />
                  </button>
                </MenuHandler>
                <MenuList className="max-h-72">
                  {["자동", "수동"].map((v, i) => {
                    return (
                      <MenuItem
                        className="flex items-center justify-center text-lg font-bold"
                        onClick={() => {
                          document.getElementById("transmission").innerText = v;
                          setNewDetail({ transmission: v });
                        }}
                        key={i}
                      >
                        {v}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </div>
          </div>
          {/* 브랜드 */}
          <div className="w-[150px] h-[150px] bg-sky-50 flex flex-col justify-around rounded-xl mx-6 px-3 py-3">
            <MdTag className="text-[45px]" />
            <span className="text-lg font-semibold">브랜드</span>
            <div className="flex items-center">
              <input
                className="w-full px-2 text-base font-bold text-blue-900 border-2 border-blue-900 h-9 rounded-xl"
                value={newDetail.carBrand}
                onChange={(e) => setNewDetail({ carBrand: e.target.value })}
              />
            </div>
          </div>
          {/* 국산/외제 */}
          <div className="w-[150px] h-[150px] bg-sky-50 flex flex-col justify-around rounded-xl mx-6 px-3 py-3">
            <MdOutlineFlag className="text-[45px]" />
            <span className="text-lg font-semibold">국산/외제</span>
            <div className="flex items-center">
              {/* 국산, 외제 중 선택 */}
              <Menu placement="bottom">
                <MenuHandler>
                  <button className="flex items-center justify-around w-full px-2 text-base font-bold text-white bg-blue-400 rounded-xl h-9 ">
                    <span id="isKorean" className="font-bold">
                      {newDetail.isKorean ? "국산" : "외제"}
                    </span>
                    <MdArrowBackIosNew className="-rotate-90" />
                  </button>
                </MenuHandler>
                <MenuList className="max-h-72">
                  {[true, false].map((v, i) => {
                    return (
                      <MenuItem
                        className="flex items-center justify-center text-lg font-bold"
                        onClick={() => {
                          document.getElementById("isKorean").innerText = v
                            ? "국산"
                            : "외제";
                          setNewDetail({ isKorean: v }); // 저장 시에는 boolean 으로
                        }}
                        key={i}
                      >
                        {v ? "국산" : "외제"}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DetailInfo;
