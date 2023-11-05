import { useEffect, useState } from "react";
import { useCarState } from "./utils/useCarState";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  MdArrowBackIosNew,
  MdSearch,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";

const CarState = () => {
  const csu = useCarState(); // CarState 의 Utils
  const [page, setPage] = useState(1); // 현재 페이지
  const [maxPage, setMaxPage] = useState(1); // 최대 페이지
  const [filterMenu, setFilterMenu] = useState([
    "전체",
    "사용가능",
    "수리/점검",
    "도난",
  ]); // 검색 필터
  const [stateMenu, setStateMenu] = useState(["사용가능", "수리/점검", "도난"]); // 차량 상태
  const [six, setSix] = useState([]); // 실제 화면 상에 보여질 6개
  const [searchTarget, setSearchTarget] = useState(""); // 검색할 차량 번호
  useEffect(() => {
    const tmp = [...csu.getCarList()]; // 서버로부터 차량 리스트 조회
    setMaxPage(Math.ceil(tmp.length / 6));
  }, []);
  // maxPage 가 바뀌면 -> 새로운 데이터셋
  useEffect(() => {
    setSix(csu.fillSix(csu.getPageCars(1)));
    setPage(1);
  }, [maxPage]);
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-[1140px] mx-auto rounded-2xl bg-white shadow-xl flex flex-col justify-center items-center">
          <div className="flex items-center justify-between w-full h-[50px] px-8 mt-12">
            <div className="flex items-center h-full">
              {/* 타이틀 */}
              <span className="text-3xl font-bold text-blue-500">
                차량 상태 관리
              </span>
              {/* 상태 저장 버튼 */}
              <button
                className="h-full ml-6 text-xl font-semibold text-white bg-blue-400 rounded-full w-44 hover:shadow-figma"
                onClick={() => {
                  const tmp = csu.saveChange();
                  console.log(tmp);
                }}
              >
                차량 상태 저장
              </button>
            </div>
            <div className="flex items-center h-full">
              {/* 번호 검색 */}
              <input
                className="h-full px-8 text-xl font-semibold border-2 border-blue-500 rounded-full w-[280px]"
                placeholder="차량 번호를 입력해주세요"
                onChange={(e) => setSearchTarget(e.target.value.trim())}
              />
              {/* 검색 */}
              <Menu>
                <MenuHandler>
                  <button className="w-[160px] h-full bg-blue-400 text-white flex justify-around items-center rounded-full px-2 ml-4 text-xl">
                    <span id="sort" className="font-bold">
                      {filterMenu[0]}
                    </span>
                    <MdArrowBackIosNew className="-rotate-90" />
                  </button>
                </MenuHandler>
                <MenuList>
                  {filterMenu.map((v, i) => {
                    return (
                      <MenuItem
                        className="flex items-center justify-center text-lg font-bold"
                        onClick={() => {
                          const target = document.getElementById("sort");
                          csu.changeMenu("title", target, filterMenu[i], 0);
                        }}
                        key={i}
                      >
                        {v}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
              {/* 검색 버튼 */}
              <button
                className="ml-4 text-5xl text-blue-500"
                onClick={() => {
                  const tmp = csu.searchCars(
                    searchTarget,
                    document.getElementById("sort").innerText
                  );
                  setMaxPage(Math.ceil(tmp.length / 6)); // 검색 결과 -> 새로운 데이터 셋
                }}
              >
                <MdSearch />
              </button>
            </div>
          </div>
          {/* 타이틀 */}
          <div className="flex items-center w-full h-20 pl-4 pr-8 mt-8 text-xl font-semibold border-b-2 border-b-black">
            <div className="w-[269px] h-full flex justify-center items-center">
              차량 이름
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              차량 번호
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              차량 상태
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              차량 상태 관리
            </div>
          </div>
          {/* 리스트 */}
          {six.map((v, i) => {
            return (
              <div
                id={i}
                className="flex items-center w-full h-16 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300"
                key={i}
              >
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.carName}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.carNumber}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.carState}
                </div>
                {v.afterChange === "" ? (
                  ""
                ) : (
                  <div className="w-[269px] h-full flex justify-center items-center">
                    <Menu>
                      <MenuHandler>
                        <button className="w-[160px] h-10 bg-blue-400 text-white flex justify-around items-center rounded-2xl text-lg px-4">
                          <span id={`sort${i}`} className="font-bold">
                            {v.afterChange}
                          </span>
                          <MdArrowBackIosNew className="-rotate-90" />
                        </button>
                      </MenuHandler>
                      <MenuList>
                        {stateMenu.map((v, idx) => {
                          return (
                            <MenuItem
                              className="flex items-center justify-center text-lg font-bold"
                              onClick={() => {
                                const target = document.getElementById(
                                  `sort${i}`
                                );
                                csu.changeMenu(
                                  "list",
                                  target,
                                  stateMenu[idx],
                                  (page - 1) * 6 + i
                                );
                              }}
                              key={idx}
                            >
                              {v}
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* 페이지 */}
        <div className="w-[300px] flex justify-between items-center mt-10">
          <MdArrowBack
            className="text-5xl"
            onClick={() => {
              if (page === 1) return;
              setSix(csu.fillSix(csu.getPageCars(page - 1)));
              setPage(page - 1);
            }}
          />
          <div className="text-lg">
            Page <span className="text-2xl">{page}</span> of{" "}
            <span className="text-2xl">{maxPage}</span>
          </div>
          <MdArrowForward
            className="text-5xl"
            onClick={() => {
              if (page === maxPage) return;
              setSix(csu.fillSix(csu.getPageCars(page + 1)));
              setPage(page + 1);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CarState;
