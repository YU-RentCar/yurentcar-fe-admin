import Accident from "./Accident";
import DefaultInfo from "./DefaultInfo";
import DetailInfo from "./DetailInfo";
import Repair from "./Repair";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  manageCarAtom,
  changeTypeSelector,
  clearInfoSelector,
} from "recoil/manageCarAtom";
import axios from "axios";

const ManageCar = () => {
  const location = useLocation(); // nav state 정보 제어
  const newInfo = useRecoilValue(manageCarAtom); // 입력된 차량 정보
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
          <button
            className="flex items-center justify-center h-10 ml-12 text-base font-bold w-28 rounded-xl bg-sky-200 hover:shadow-figma"
            onClick={async () => {
              if (type === "add") {
              } else if (type === "modify") {
                console.log("hello", newInfo.picture);
                const tmp = {
                  carNumber: newInfo.carNumber,
                  totalDistance: newInfo.totalDistance,
                  carPrice: newInfo.beforePrice,
                  discountRate: newInfo.discountRate,
                  discountReason: newInfo.discountReason,
                  carDescription: newInfo.carDescription,
                  carName: newInfo.carName,
                  maxPassenger: newInfo.maxPassenger,
                  carSize: newInfo.carSize,
                  oilType: newInfo.oilType,
                  transmission: newInfo.transmission,
                  carBrand: newInfo.carBrand,
                  releaseDate: newInfo.releaseDate,
                  repairList: [...newInfo.repairs],
                  accidentList: [...newInfo.accidents],
                };
                const formData = new FormData();
                formData.append("file", newInfo.picture);
                formData.append("carRequest", { ...tmp });

                await axios
                  .patch(
                    "/branches/cars?adminUsername=first_admin&carId=6",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                      baseURL: "http://be.yurentcar.kro.kr:1234/api/v1",
                    }
                  )
                  .then((response) => console.log(response.data))
                  .catch((error) => console.log(error.response));
              }
            }}
          >
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
