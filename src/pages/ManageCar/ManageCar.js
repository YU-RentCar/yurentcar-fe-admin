import Accident from "./Accident";
import DefaultInfo from "./DefaultInfo";
import DetailInfo from "./DetailInfo";
import Repair from "./Repair";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { changeTypeSelector, clearInfoSelector } from "recoil/manageCarAtom";

const ManageCar = () => {
  const location = useLocation(); // nav state 정보 제어
  const [type, setType] = useRecoilState(changeTypeSelector); // type 제어
  const [clear, setClear] = useRecoilState(clearInfoSelector); // 정보 초기화
  useEffect(() => {
    // "add" 라면 정보 초기화
    if (location.state.type === "add") setClear();
    else setType(location.state.type);
  }, []);
  return (
    <>
      <div className="w-[800px] mx-auto py-20">
        {/* 타이틀 */}
        <div className="flex items-center w-full text-4xl font-bold">
          {location.state.type === "add" ? "차량 등록" : "제원 변경"}
          <button className="flex items-center justify-center h-10 ml-12 text-base font-bold w-28 rounded-xl bg-sky-200 hover:shadow-figma">
            {location.state.type === "add" ? "차량 등록" : "제원 변경"}
          </button>
        </div>
        {/* 차량 기본 정보 */}
        <DefaultInfo />
        {/* 차량 상세 정보 */}
        <DetailInfo />
        {/* 차량 수리 내역 */}
        <Repair />
        {/* 차량 사고 내역 */}
        <Accident />
      </div>
    </>
  );
};

export default ManageCar;
