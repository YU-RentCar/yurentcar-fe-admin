import { useEffect, useState } from "react";
import { MdSearch, MdArrowBack, MdArrowForward } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { altResvAtom, prevResvAtom } from "recoil/reservationAtom";
import dayjs from "dayjs";
import { adminAtom } from "recoil/adminAtom";
import { getResvList } from "api/changeResvAxios";

const ResvList = ({ handleNext }) => {
  function paddingList(list, MAX_ROW) {
    const tempList = [...list];

    for (let i = 0; i < MAX_ROW - list.length; i++) {
      tempList.push({
        nickname: null,
        resvID: null,
        carNumber: null,
        startDate: null,
        endDate: null,
      });
    }

    return tempList;
  }

  // 한 페이지의 최대 row
  const MAX_ROW = 4;

  // 예약 정보
  const [resvs, setResvs] = useState([]);

  // 실제로 리스트에 뿌려지는 데이터
  const [listData, setListData] = useState([]);

  // 현재 페이지 숫자
  const [pageNum, setPageNum] = useState(1);

  // 최대 페이지 숫자
  const [maxPageNum, setMaxPageNum] = useState(1);

  // 새로운 예약 정보 저장
  const [rclAltResv, setRclAltResv] = useRecoilState(altResvAtom);

  // 기존 예약 정보 저장
  const [rclPrevResv, setRclPrevResv] = useRecoilState(prevResvAtom);

  // 검색 input
  const [findInput, setFindInput] = useState("");

  // 검색중을 확인하는 boolean
  const [isFinding, setIsFinding] = useState(false);

  const adminInfo = useRecoilValue(adminAtom);

  // 초기 useEffect
  useEffect(() => {
    // 리스트 서버에서 받아오는 코드
    getResvList(adminInfo.adminUsername)
      .then((response) => {
        // 초기 리스트 세팅 작업
        setResvs(response.data);

        const temp = response.data.slice(0, MAX_ROW);

        setListData(paddingList(temp, MAX_ROW));

        setPageNum(1);
        setMaxPageNum(Math.ceil(response.data.length / MAX_ROW));
      })
      .catch((error) => {
        console.log("지점에 걸려있는 예약들을 받아오지 못했다");
      });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full select-none">
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
                    setIsFinding(true);
                    setPageNum(1);

                    const findData = resvs.filter(
                      (v) => v.nickname === findInput
                    );

                    setListData(paddingList(findData, MAX_ROW));
                  } else {
                    setIsFinding(false);
                    setListData(
                      paddingList(resvs.slice(0, 1 * MAX_ROW), MAX_ROW)
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
              시작 시간
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              종료 시간
            </div>
            <div className="w-[269px] h-full flex justify-center items-center"></div>
          </div>
          {/* 리스트 */}
          {listData.map((v, i) => {
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
                  {v.reservationId || ""}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.carNumber || ""}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.startDate
                    ? dayjs(v.startDate).format("YY-MM-DD / HH:mm")
                    : ""}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.endDate ? dayjs(v.endDate).format("YY-MM-DD / HH:mm") : ""}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.nickname === null ? null : (
                    <div
                      className="py-2 bg-blue-500 rounded-full px-[40px] hover:bg-amber-400"
                      onClick={() => {
                        setRclAltResv({
                          ...rclAltResv,
                          nickname: v.nickname,
                        });

                        setRclPrevResv({
                          resvID: v.resvID,
                          nickname: v.nickname,
                          carNumber: v.carNumber,
                          startDate: dayjs(v.startDate).format("YYYY-MM-DD"),
                          startTime: dayjs(v.startDate).format("HH:mm:ss"),
                          endDate: dayjs(v.endDate).format("YYYY-MM-DD"),
                          endTime: dayjs(v.endDate).format("HH:mm:ss"),
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
                if (pageNum - 1 >= 1) {
                  setPageNum(pageNum - 1);

                  const temp = resvs.slice(
                    (pageNum - 1 - 1) * MAX_ROW,
                    (pageNum - 1) * MAX_ROW
                  );

                  setListData(paddingList(temp, MAX_ROW));
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
                  setPageNum(pageNum + 1);

                  const temp = resvs.slice(
                    pageNum * MAX_ROW,
                    (pageNum + 1) * MAX_ROW
                  );

                  setListData(paddingList(temp, MAX_ROW));
                }
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ResvList;
