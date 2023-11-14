import React from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { changeInfoSelector } from "recoil/manageCarAtom";
import { useLocation } from "react-router-dom";
import { getCarRepair } from "api/manageCarAxios";
import { MdClose } from "react-icons/md";

const Repair = React.memo(() => {
  const location = useLocation(); // location state 정보
  const [newRepair, setNewRepair] = useRecoilState(changeInfoSelector); // repair 제어
  const [startDate, setStartDate] = useState([new Date()]); // datepicker 날짜
  useEffect(() => {
    if (location.state.type === "modify") {
      // 차량 정보
      getCarRepair(location.state.carNumber)
        .then((response) => {
          console.log("관리차 / 수리정보 : ", response.data);
          const tmp = { repairs: [...response.data] };
          setNewRepair(tmp);
          // 날짜 정보
          const dateTmp = [];
          tmp.repairs.forEach((v) => dateTmp.push(new Date(v.eventDate)));
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
            const tmp = [...newRepair.repairs];
            tmp.push({
              title: "",
              eventDate: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
              content: "",
            });
            setNewRepair({ repairs: [...tmp] }); // 빈 객체 추가
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
        {newRepair.repairs.map((v, i) => {
          return (
            <div
              className="w-[700px] h-[160px] mx-auto mt-2 bg-white rounded-xl border-2 border-blue-600 flex justify-center items-center flex-col"
              key={i}
            >
              <div className="flex items-center w-full px-2 border-b-2 border-blue-600 border-dashed h-[60px]">
                {/* 수리 날짜 선택 */}
                <DatePicker
                  className="w-[140px] h-[45px] text-base pl-2 border-2 border-slate-300 rounded-lg"
                  dateFormat={"yyyy-MM-dd"}
                  onChange={(date) => {
                    const tmp = [...newRepair.repairs];
                    const newObj = {
                      ...tmp[i],
                      eventDate: dayjs(date).format("YYYY-MM-DDTHH:mm:ss"),
                    };
                    tmp.splice(i, 1, newObj);
                    setNewRepair({ repairs: [...tmp] }); // 변경 정보 저장
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
                    const tmp = [...newRepair.repairs];
                    const newObj = {
                      ...tmp[i],
                      title: e.target.value,
                    };
                    tmp.splice(i, 1, newObj);
                    setNewRepair({ repairs: [...tmp] });
                  }}
                ></input>
                {/* 내역 삭제 버튼 */}
                <button
                  className="w-[30px] h-[30px] ml-2 text-red-500"
                  onClick={() => {
                    const tmp = [...newRepair.repairs];
                    tmp.splice(i, 1);
                    const tmpDate = [...startDate];
                    tmpDate.splice(i, 1);
                    setNewRepair({ repairs: [...tmp] }); // 삭제 반영
                    setStartDate(tmpDate);
                  }}
                >
                  <MdClose className="w-full h-full" />
                </button>
              </div>
              <div className="flex items-center justify-center w-full h-[100px] p-2">
                {/* 수리 세부 내용 */}
                <textarea
                  className="w-full h-full p-2 text-base border-2 rounded-lg border-slate-300 placeholder:text-slate-500"
                  placeholder="차량에 대한 설명"
                  value={v.content}
                  onChange={(e) => {
                    const tmp = [...newRepair.repairs];
                    const newObj = {
                      ...tmp[i],
                      content: e.target.value,
                    };
                    tmp.splice(i, 1, newObj);
                    setNewRepair({ repairs: [...tmp] });
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

export default Repair;
