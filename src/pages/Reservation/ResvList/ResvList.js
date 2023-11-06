import { useEffect, useState } from "react";
import { MdSearch, MdArrowBack, MdArrowForward } from "react-icons/md";
import useResvList from "./utils/useResvList";
import { useRecoilState } from "recoil";
import { reservationAtom } from "recoil/reservationAtom";

const ResvList = ({ handleNext }) => {
  // 페이지 조작을 위한 커스텀 훅
  const ctrl = useResvList(4);

  const [rclResvAtom, setRclResvAtom] = useRecoilState(reservationAtom);

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
  }, [pageNum]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-[1140px] mx-auto rounded-2xl bg-white shadow-xl flex flex-col justify-center items-center">
          <div className="relative flex items-center justify-center w-full h-[50px] px-8 mt-12">
            {/* 타이틀 */}
            <span className="absolute text-3xl font-bold text-blue-500 left-8">
              지점 예약 리스트
            </span>

            <div className="flex items-center h-full l">
              {/* 번호 검색 */}
              <input
                className="h-full px-8 text-xl font-semibold border-4 border-blue-500 rounded-full w-"
                placeholder="사용자의 닉네임을 입력"
                value={findInput}
                onChange={(e) => setFindInput(e.target.value)}
              />
              {/* 검색 버튼 */}
              <button
                className="ml-4 text-5xl text-blue-500"
                onClick={() => {
                  if (findInput.trim() !== "") {
                    setCurPage(ctrl.findByNickname(findInput.trim()));
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
            <div className="w-[269px] h-full flex justify-center items-center">
              닉네임
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              예약 번호
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              차량 번호
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              시작/종료 시간
            </div>
            <div className="w-[269px] h-full flex justify-center items-center"></div>
          </div>
          {/* 리스트 */}
          {curPage.map((v, i) => {
            return (
              <div
                id={i}
                className="flex items-center w-full h-16 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300"
                key={i}
              >
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.nickname || ""}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.resvID || ""}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.carNumber || ""}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.startDate || ""} {v.startDate && v.endDate && "/"}
                  {v.endDate || ""}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.nickname === null ? null : (
                    <div
                      className="py-2 bg-blue-500 rounded-full px-[40px] hover:bg-blue-800 hover:text-white"
                      onClick={() => {
                        console.log(curPage[i]);
                        setRclResvAtom({
                          ...rclResvAtom,
                          nickname: v.nickname,
                        });
                        handleNext();
                      }}
                    >
                      선택
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
      </div>
    </>
  );
};

export default ResvList;
