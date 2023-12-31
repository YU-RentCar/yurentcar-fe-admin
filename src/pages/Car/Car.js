import Delete from "popUp/Car/Delete";
import Alert from "popUp/Alert";
import { useEffect, useState } from "react";
import { useCar } from "pages/Car/utils/useCar";
import { MdSearch, MdArrowBack, MdArrowForward } from "react-icons/md";
import { usePopUp } from "utils/usePopUp";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { carInfoSelector } from "recoil/carAtom";
import { alertAtom } from "recoil/alertAtom";

const Car = () => {
  const nav = useNavigate(); // nav 제어
  const popUp = usePopUp("Car/Delete"); // Delete 팝업 제어
  const cu = useCar(); // Car 의 Utils
  const [newInfo, setNewInfo] = useRecoilState(carInfoSelector);
  const [six, setSix] = useState([]); // 실제 화면 상에 보여질 6개
  const [searchTarget, setSearchTarget] = useState(""); // 검색할 차량 번호
  useEffect(() => {
    // 서버로부터 차량 리스트 불러오기
    cu.getCarList("first_admin");
  }, []);
  // maxPage 가 바뀌면 -> 새로운 데이터셋
  useEffect(() => {
    setSix(cu.fillEmpty(cu.getPageCars(1)));
    newInfo.maxPage.num ? setNewInfo({ page: 1 }) : setNewInfo({ page: 0 });
  }, [newInfo.maxPage]);
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="w-[1140px] mx-auto rounded-2xl bg-white shadow-xl flex flex-col justify-center items-center">
          <div className="flex items-center justify-between w-full h-[50px] px-8 mt-12">
            {/* 타이틀 */}
            <span className="text-3xl font-bold text-blue-500 w-44">
              차량 관리
            </span>
            <div className="flex items-center h-full">
              {/* 번호 검색 */}
              <input
                className="h-full text-xl font-semibold border-2 border-blue-500 rounded-full w-[360px] px-8"
                placeholder="차량 번호를 입력해주세요"
                onChange={(e) => setSearchTarget(e.target.value)}
              />
              {/* 검색 버튼 */}
              <button
                className="ml-2 text-4xl text-blue-500"
                onClick={() =>
                  cu.searchCars("first_admin", searchTarget.trim())
                }
              >
                <MdSearch />
              </button>
            </div>
            {/* 신규 등록 버튼 */}
            <button
              className="h-full text-xl font-semibold text-white bg-blue-400 rounded-full w-44 hover:shadow-figma"
              onClick={() => {
                nav("/managecar", { state: { type: "add" } });
              }}
            >
              신규 차량 등록
            </button>
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
                {v.carNumber === "" ? (
                  ""
                ) : (
                  <div className="w-[269px] h-full flex justify-around items-center px-6">
                    <button
                      className="w-[130px] h-2/3 rounded-full bg-slate-200 text-lg font-medium text-slate-500 hover:shadow-figma"
                      onClick={() => {
                        nav("/managecar", {
                          state: {
                            type: "modify",
                            carNumber: v.carNumber,
                            carId: v.carId,
                          },
                        });
                      }}
                    >
                      제원 변경
                    </button>
                    <button
                      className="w-[70px] h-2/3 rounded-full border-2 border-red-300 text-lg font-medium text-red-300 hover:shadow-figma"
                      onClick={() => {
                        setNewInfo({ deleteTarget: v.carNumber });
                        popUp.toggle();
                      }}
                    >
                      삭제
                    </button>
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
              if (newInfo.page === 1) return;
              setSix(cu.fillEmpty(cu.getPageCars(newInfo.page - 1)));
              setNewInfo({ page: newInfo.page - 1 });
            }}
          />
          <div className="text-lg">
            Page <span className="text-2xl">{newInfo.page}</span> of{" "}
            <span className="text-2xl">{newInfo.maxPage.num}</span>
          </div>
          <MdArrowForward
            className="text-5xl"
            onClick={() => {
              if (newInfo.page === newInfo.maxPage.num) return;
              setSix(cu.fillEmpty(cu.getPageCars(newInfo.page + 1)));
              setNewInfo({ page: newInfo.page + 1 });
            }}
          />
        </div>
      </div>
      {popUp.isClicked ? <Delete cu={cu} /> : null}
      {useRecoilValue(alertAtom).state && <Alert />}
    </>
  );
};

export default Car;
