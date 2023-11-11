import Accident from "./Accident";
import DefaultInfo from "./DefaultInfo";
import DetailInfo from "./DetailInfo";
import Repair from "./Repair";
import Alert from "popUp/Alert";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "utils/useAlert";
import { alertAtom } from "recoil/alertAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  manageCarAtom,
  changeTypeSelector,
  clearInfoSelector,
} from "recoil/manageCarAtom";

const ManageCar = () => {
  const alert = useAlert(); // alert 제어
  const nav = useNavigate(); // nav 제어
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
              if (validateInfo(newInfo)) {
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
                  isModified: newInfo.isModified,
                };
                const blob = new Blob([JSON.stringify({ ...tmp })], {
                  type: "application/json",
                });
                let formData = new FormData();
                formData.append("file", newInfo.picture);
                formData.append("carRequest", blob);
                if (location.state.type === "add") {
                  axios
                    .post(
                      "/branches/cars?adminUsername=first_admin",
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        baseURL: "http://be.yurentcar.kro.kr:1234/api/v1",
                      }
                    )
                    .then((response) => {
                      console.log("차 / 차등록 : ", response.data);
                      nav("/car");
                    })
                    .catch((error) => {
                      console.log("차 / 차등록에러 : ", error.response);
                    });
                } else if (location.state.type === "modify") {
                  axios
                    .patch(
                      `/branches/cars?adminUsername=first_admin&carId=${location.state.carId}`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        baseURL: "http://be.yurentcar.kro.kr:1234/api/v1",
                      }
                    )
                    .then((response) => {
                      console.log("차 / 차수정 : ", response.data);
                      nav("/car");
                    })
                    .catch((error) => {
                      console.log("차 / 차수정에러 : ", error.response);
                    });
                }
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
      {useRecoilValue(alertAtom).state && <Alert />}
    </>
  );

  function validateInfo(newInfo) {
    if (newInfo.carNumber === "") {
      alert.onAndOff("차량 번호를 입력해주세요");
      return false;
    } else if (newInfo.totalDistance < 0) {
      alert.onAndOff("총 주행거리는 0 이상 입력해주세요");
      return false;
    } else if (newInfo.beforePrice <= 0) {
      alert.onAndOff("금액을 1 이상 입력해주세요");
      return false;
    } else if (newInfo.discountRate < 0) {
      alert.onAndOff("할인 비율을 0 이상 입력해주세요");
      return false;
    } else if (newInfo.discountReason === "") {
      alert.onAndOff("할인 사유를 입력해주세요");
      return false;
    } else if (newInfo.carDescription === "") {
      alert.onAndOff("차량 설명을 입력해주세요");
      return false;
    } else if (newInfo.carName === "") {
      alert.onAndOff("차종을 입력해주세요");
      return false;
    } else if (newInfo.maxPassenger <= 0) {
      alert.onAndOff("승차 인원은 1 이상 입력해주세요");
      return false;
    } else if (newInfo.carSize === "") {
      alert.onAndOff("차량 크기를 입력해주세요");
      return false;
    } else if (newInfo.oilType === "") {
      alert.onAndOff("유종을 입력해주세요");
      return false;
    } else if (newInfo.transmission === "") {
      alert.onAndOff("구동기를 선택해주세요");
      return false;
    } else if (newInfo.carBrand === "") {
      alert.onAndOff("브랜드를 선택해주세요");
      return false;
    } else if (newInfo.releaseDate === "") {
      alert.onAndOff("출시년도를 선택해주세요");
      return false;
    } else return true;
  }
};

export default ManageCar;
