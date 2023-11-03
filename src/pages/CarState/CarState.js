import { useEffect, useState } from "react";
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
  const [page, setPage] = useState(1); // 현재 페이지
  const [maxPage, setMaxPage] = useState(1); // 최대 페이지
  const [sortMenu, setSortMenu] = useState(["사용가능", "수리/점검", "도난"]); // 정렬 기준 = 차량 상태
  const [six, setSix] = useState([]); // 실제 화면 상에 보여질 6개
  // 선택 기준으로 변경 함수
  const changeSortMenu = (type, idx, cnt) => {
    if (type === "title") {
      const target = document.getElementById("sort");
      target.innerText = sortMenu[idx];
    } else {
      const target = document.getElementById(`sort${cnt}`);
      target.innerText = sortMenu[idx];
    }
  };
  // 특정 페이지의 6개 가져오기
  const getPageCars = (page) => {
    const pageCars = cars.slice((page - 1) * 6, page * 6);
    return pageCars;
  };
  // 비어있는 개수 채우기
  const fillSix = (beforeSix) => {
    const len = beforeSix.length;
    const tmp = [...beforeSix];
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        tmp.push({
          carName: "",
          carNumber: "",
          carState: "",
        });
      }
    }
    return tmp;
  };
  // 차량 더미 데이터
  const [cars, setCars] = useState([
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
  ]);
  useEffect(() => {
    // 6개보다 적다면 빈걸로 채워주기
    const tmp = fillSix([...cars]);
    setCars(tmp);
    // 최대 페이지 계산
    setMaxPage(Math.ceil(cars.length / 6));
    // 1페이지 6개만 잘라서 저장
    setSix(getPageCars(1));
  }, []);
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
              <button className="h-full ml-6 text-xl font-semibold text-white bg-blue-400 rounded-full w-44 hover:shadow-figma">
                차량 상태 저장
              </button>
            </div>
            <div className="flex items-center h-full">
              {/* 번호 검색 */}
              <input
                className="h-full px-8 text-xl font-semibold border-2 border-blue-500 rounded-full w-[280px]"
                placeholder="차량 번호를 입력해주세요"
              />
              {/* 정렬 */}
              <Menu>
                <MenuHandler>
                  <button className="w-[160px] h-full bg-blue-400 text-white flex justify-around items-center rounded-full px-2 ml-4 text-xl">
                    <span id="sort" className="font-bold">
                      {sortMenu[1]}
                    </span>
                    <MdArrowBackIosNew className="-rotate-90" />
                  </button>
                </MenuHandler>
                <MenuList>
                  {sortMenu.map((v, i) => {
                    return (
                      <MenuItem
                        className="flex items-center justify-center text-lg font-bold"
                        onClick={() => changeSortMenu("title", i, 0)}
                        key={i}
                      >
                        {v}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
              {/* 검색 버튼 */}
              <MdSearch className="ml-4 text-5xl text-blue-500" />
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
                {v.carNumber === "" ? (
                  ""
                ) : (
                  <div className="w-[269px] h-full flex justify-center items-center">
                    <Menu>
                      <MenuHandler>
                        <button className="w-[160px] h-10 bg-blue-400 text-white flex justify-around items-center rounded-2xl text-lg px-4">
                          <span id={`sort${i}`} className="font-bold">
                            {v.carState}
                          </span>
                          <MdArrowBackIosNew className="-rotate-90" />
                        </button>
                      </MenuHandler>
                      <MenuList>
                        {sortMenu.map((v, idx) => {
                          return (
                            <MenuItem
                              className="flex items-center justify-center text-lg font-bold"
                              onClick={() => changeSortMenu("list", idx, i)}
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
              setSix(fillSix(getPageCars(page - 1)));
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
              setSix(fillSix(getPageCars(page + 1)));
              setPage(page + 1);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CarState;
