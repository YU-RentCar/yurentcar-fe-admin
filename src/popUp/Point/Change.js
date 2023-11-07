import dayjs from "dayjs";
import { usePopUp } from "utils/usePopUp";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { pointAtom, changeRecordsSelector } from "recoil/pointAtom";
import { useAlert } from "utils/useAlert";

const Change = () => {
  const popUp = usePopUp("Point/Change"); // 팝업 제어
  const alert = useAlert(); // alert 제어
  const user = useRecoilValue(pointAtom); // 유저 정보
  const [records, setRecords] = useRecoilState(changeRecordsSelector); // 유저의 포인트 내역
  const [change, setChange] = useState({
    // 입력 정보
    price: "",
    reason: "",
    createdTime: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:SS"),
  });
  return (
    <div className="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
      <div className="w-[600px] h-[350px] rounded-2xl bg-white px-8">
        <div className="flex justify-between pl-8 mt-4">
          {/* 타이틀 */}
          <div className="mt-2 text-2xl font-extrabold text-blue-600">
            <span className="text-black">{user.nickname}</span> 님의 포인트 변경
          </div>
          {/* 팝업 끄기 위한 아이콘 */}
          <MdOutlineClose
            size={35}
            color="gray"
            onClick={() => popUp.toggle()}
          />
        </div>
        <div className="w-full mx-auto mt-4 h-[200px] rounded-2xl bg-sky-50 flex flex-col justify-around items-center">
          <div className="flex items-center justify-between w-full px-8">
            {/* 현재 포인트 */}
            <div className="flex flex-col items-center justify-center h-20">
              <span className="text-base font-medium">현재 포인트</span>
              <span className="text-xl font-bold">{user.point}점</span>
            </div>
            {/* 포인트 입력 */}
            <div className="flex flex-col items-center justify-center h-20 w-[150px]">
              <span className="text-base font-medium">+/- 포인트</span>
              <input
                className="w-2/3 h-8 px-2 text-lg bg-white border-2 border-blue-600 rounded-xl"
                type="number"
                onChange={(e) => {
                  const tmp = { ...change, price: e.target.value.trim() };
                  setChange(tmp);
                }}
              />
            </div>
            {/* 변경 후 포인트 */}
            <div className="flex flex-col items-center justify-center h-20">
              <span className="text-base font-medium">변경 후 포인트</span>
              <span className="text-xl font-bold">
                {change.price === ""
                  ? user.point
                  : user.point + Number(change.price)}
                점
              </span>
            </div>
          </div>
          {/* 사유 */}
          <div className="flex flex-col justify-center w-full h-20 px-8 text-lg font-semibold">
            사유
            <input
              className="w-full h-10 px-4 mt-2 border-2 border-blue-600 rounded-xl placeholder:text-base"
              placeholder="사유를 입력해주세요"
              onChange={(e) => {
                const tmp = { ...change, reason: e.target.value.trim() };
                setChange(tmp);
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-10 mt-4">
          {/* 정보 등록 버튼 */}
          <button
            className="w-1/3 h-10 text-lg font-semibold text-white bg-blue-500 rounded-full hover:shadow-figma"
            onClick={() => {
              if (change.price === "" || change.reason === "")
                alert.onAndOff("내용을 모두 입력해주세요");
              else if (user.point + Number(change.price) < 0)
                alert.onAndOff("변경 후 포인트는 0 이상이어야 합니다");
              else {
                console.log("success");
                const tmp = [...records];
                tmp.push({ ...change, price: Number(change.price) });
                setRecords(tmp);
                popUp.toggle();
              }
            }}
          >
            정보 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Change;
