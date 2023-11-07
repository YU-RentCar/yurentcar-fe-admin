import React from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { changeInfoSelector } from "recoil/manageCarAtom";
import { useLocation } from "react-router-dom";
import { getCarAccident } from "api/manageCarAxios";
import { MdClose } from "react-icons/md";

const Accident = React.memo(() => {
  const location = useLocation(); // location state 정보
  const [newAccident, setNewAccident] = useRecoilState(changeInfoSelector); // detail 제어
  const [startDate, setStartDate] = useState([new Date()]); // datepicker 날짜
  useEffect(() => {
    if (location.state.type === "modify") {
      // 차량 정보
      getCarAccident(location.state.carNumber)
        .then((response) => {
          console.log("관리차 / 수리정보 : ", response.data);
          const tmp = { accidents: [...response.data] };
          setNewAccident(tmp);
          // 날짜 정보
          const dateTmp = [];
          tmp.accidents.forEach((v) => dateTmp.push(new Date(v.eventDate)));
          setStartDate([...dateTmp]);
        })
        .catch((error) => {
          console.log("관리차 / 수리정보에러 : ", error.response);
        });
    }
  }, []);
  return (
    <div className="flex flex-col items-center w-full py-8 mt-12 bg-sky-50 rounded-2xl shadow-figma">
      {/* 타이틀 */}
      <div className="w-[700px] h-[35px] flex justify-between items-center text-blue-800 text-[30px] font-bold">
        차량 수리 내역
        {/* 내역 추가 버튼 */}
        <button
          className="h-full text-lg font-bold text-white rounded-lg w-28 bg-sky-600 hover:shadow-figma"
          onClick={() => {
            const tmp = [...newAccident.accidents];
            tmp.push({
              title: "",
              eventDate: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:SS"),
              content: "",
            });
            setNewAccident({ accidents: [...tmp] }); // 빈 객체 추가
            const newDate = [...startDate];
            newDate.push(new Date());
            setStartDate(newDate); // 오늘 날짜로 추가
          }}
        >
          추가
        </button>
      </div>
      {/* 상세 정보 */}
      <div className="w-[750px] rounded-2xl bg-blue-200 mt-4 py-4">
        {newAccident.accidents.map((v, i) => {
          return (
            <div
              className="w-[700px] h-[160px] mx-auto mt-2 bg-white rounded-xl border-2 border-blue-600 flex justify-center items-center flex-col"
              key={i}
            >
              <div className="flex items-center w-full px-2 border-b-2 border-blue-600 border-dashed h-[60px]">
                {/* 사고 날짜 선택 */}
                <DatePicker
                  className="w-[140px] h-[45px] text-base pl-2 border-2 border-slate-300 rounded-lg"
                  dateFormat={"yyyy-MM-dd"}
                  onChange={(date) => {
                    const tmp = [...newAccident.accidents];
                    const newObj = {
                      ...tmp[i],
                      eventDate: dayjs(date).format("YYYY-MM-DDTHH:mm:SS"),
                    };
                    tmp.splice(i, 1, newObj);
                    setNewAccident({ accidents: [...tmp] }); // 변경 정보 저장
                    // 선택 날짜로 변경
                    const dateTmp = [...startDate];
                    dateTmp.splice(i, 1, date);
                    setStartDate(dateTmp);
                  }}
                  selected={startDate[i]}
                  peekNextMonth // 다음 월 도 미리보기
                  showMonthDropdown // 월 드롭다운
                  showYearDropdown // 년도 드롭다운
                  shouldCloseOnSelect // 선택 시 close
                  dropdownMode="select"
                  locale={ko}
                ></DatePicker>
                {/* 타이틀 */}
                <input
                  className="w-[530px] h-5/6 text-base rounded-lg border-2 border-slate-300 px-2 ml-2 placeholder:text-slate-500"
                  placeholder="제목은 한 줄로 짧게(최대 45자)"
                  maxLength={45}
                  value={v.title}
                  onChange={(e) => {
                    const tmp = [...newAccident.accidents];
                    const newObj = {
                      ...tmp[i],
                      title: e.target.value,
                    };
                    tmp.splice(i, 1, newObj);
                    setNewAccident({ accidents: [...tmp] });
                  }}
                ></input>
                {/* 내역 삭제 버튼 */}
                <button
                  className="w-[30px] h-[30px] ml-2 text-red-500"
                  onClick={() => {
                    const tmp = [...newAccident.accidents];
                    tmp.splice(i, 1);
                    const tmpDate = [...startDate];
                    tmpDate.splice(i, 1);
                    setNewAccident({ accidents: [...tmp] }); // 삭제 반영
                    setStartDate(tmpDate);
                  }}
                >
                  <MdClose className="w-full h-full" />
                </button>
              </div>
              <div className="flex items-center justify-center w-full h-[100px] p-2">
                {/* 사고 세부 내용 */}
                <textarea
                  className="w-full h-full p-2 text-base border-2 rounded-lg border-slate-300 placeholder:text-slate-500"
                  placeholder="차량에 대한 설명"
                  value={v.content}
                  onChange={(e) => {
                    const tmp = [...newAccident.accidents];
                    const newObj = {
                      ...tmp[i],
                      content: e.target.value,
                    };
                    tmp.splice(i, 1, newObj);
                    setNewAccident({ accidents: [...tmp] });
                  }}
                ></textarea>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Accident;
