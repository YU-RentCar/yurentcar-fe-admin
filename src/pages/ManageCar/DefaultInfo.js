import React from "react";
import title from "./title";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCarInfo } from "api/manageCarAxios";
import { useLocation } from "react-router-dom";
import { changeInfoSelector } from "recoil/manageCarAtom";
import {
  MdOutlineDirectionsCarFilled,
  MdOutlineConfirmationNumber,
  MdOutlineEditRoad,
  MdMoney,
  MdOutlineDiscount,
  MdOutlineArticle,
  MdOutlineDocumentScanner,
} from "react-icons/md";

const DefaultInfo = React.memo(() => {
  const location = useLocation(); // location state 정보
  const [newDefault, setNewDefault] = useRecoilState(changeInfoSelector); // default 제어
  const [imgSrc, setImgSrc] = useState(""); // 사진 경로
  const [iconList, setIconList] = useState([
    // 아이콘
    <MdOutlineDirectionsCarFilled className="ml-4 text-[22px] text-blue-600" />,
    <MdOutlineConfirmationNumber className="ml-4 text-[22px] text-blue-600" />,
    <MdOutlineEditRoad className="ml-4 text-[22px] text-blue-600" />,
    <MdMoney className="ml-4 text-[22px] text-blue-600" />,
    <MdMoney className="ml-4 text-[22px] text-blue-600" />,
    <MdOutlineDiscount className="ml-4 text-[22px] text-blue-600" />,
    <MdOutlineArticle className="ml-4 text-[22px] text-blue-600" />,
    <MdOutlineDocumentScanner className="ml-4 text-[22px] text-blue-600" />,
  ]);
  useEffect(() => {
    if (location.state.type === "modify") {
      // 차량 정보
      getCarInfo(location.state.carNumber)
        .then((response) => {
          console.log("관리차 / 차량정보 : ", response.data);
          const tmp = {
            carName: response.data.carName,
            carNumber: response.data.carNumber,
            totalDistance: response.data.totalDistance,
            beforePrice: response.data.beforePrice,
            afterPrice: response.data.afterPrice,
            discountRate: response.data.discountRate,
            discountReason: response.data.discountRate,
            carDescription: response.data.carDescription,
            picture: response.data.photoUrl,
            isModified: false,
          };
          setNewDefault(tmp);
          // 차량 사진
          setImgSrc(
            `http://be.yurentcar.kro.kr:1234/api/v1/images/display/${response.data.photoUrl}`
          );
        })
        .catch((error) => {
          console.log("관리차 / 차량정보에러 : ", error.response);
        });
    }
  }, []);
  return (
    <div className="flex flex-col items-center w-full py-4 mt-12 bg-sky-50 rounded-2xl shadow-figma">
      {/* 타이틀 */}
      <div className="w-[700px] h-[35px] flex justify-between items-center text-blue-800 text-[30px] font-extrabold">
        차량 기본 정보
      </div>
      {/* 차량 정보 */}
      <div className="flex items-center justify-around w-full mt-3">
        {/* 차량 사진 업로드 */}
        <div className="w-[300px] h-[250px] flex flex-col justify-around items-center">
          <input
            type="file"
            id="image"
            accept="image/*"
            className="mx-auto w-[200px]"
            onChange={(e) => {
              const reader = new FileReader();
              // 업로드한 사진 url 저장
              reader.onload = function (e) {
                setImgSrc(e.target.result);
              };
              reader.readAsDataURL(e.target.files[0]);
              const tmp = { picture: e.target.files[0], isModified: true };
              setNewDefault(tmp); // 변경 정보 저장
            }}
          />
          <div className="w-[300px] h-[200px] rounded-2xl border-2 border-dashed border-slate-300">
            <img
              src={imgSrc}
              alt="차량 사진"
              className="object-cover w-full h-full rounded-2xl"
            ></img>
          </div>
        </div>
        {/* 기본 정보 */}
        <div className="w-[450px] flex flex-col justify-around items-center bg-blue-100 rounded-2xl pt-2 pb-4">
          {/* 차종, 차 번호, 총 주행거리 */}
          {Object.keys(title.default).map((v, i) => {
            return (
              <div
                className="w-[420px] h-[45px] bg-sky-200 flex items-center rounded-lg mt-2"
                key={i}
              >
                {iconList[i]}
                <span className="ml-3 text-lg font-semibold">
                  {`${title.default[v]} : `}
                </span>
                <input
                  type={
                    v === "afterPrice" ||
                    v === "beforePrice" ||
                    v === "totalDistance" ||
                    v === "discountRate"
                      ? "number"
                      : "text"
                  }
                  className="w-[200px] px-2 ml-2 text-lg font-semibold border-2 border-blue-600 rounded-lg"
                  value={newDefault[v]}
                  onChange={(e) => {
                    const tmp = {};
                    v === "afterPrice" ||
                    v === "beforePrice" ||
                    v === "totalDistance" ||
                    v === "discountRate"
                      ? (tmp[v] = Number(e.target.value))
                      : (tmp[v] = e.target.value);
                    setNewDefault(tmp); // 변경 정보 저장
                  }}
                />
                <span className="ml-2 text-lg font-semibold">
                  {`${
                    i === 2
                      ? "km"
                      : i === 3
                      ? "원"
                      : i === 4
                      ? "원"
                      : i === 5
                      ? "%"
                      : ""
                  }`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default DefaultInfo;
