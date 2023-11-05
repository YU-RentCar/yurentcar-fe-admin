import ParkingMap from "components/ParkingMap/ParkingMap";
import React from "react";

const MapManage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-[1140px] flex flex-col justify-center items-center mb-10">
        <div className="text-[50px] font-bold self-start mb-10 mt-[130px]">
          주차장 관리
        </div>
        <ParkingMap></ParkingMap>
      </div>
    </div>
  );
};

export default MapManage;
