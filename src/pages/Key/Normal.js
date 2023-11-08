import React from "react";

const Normal = ({ idx, car }) => {
  return (
    <div
      id={idx}
      className="flex items-center w-full h-16 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300"
    >
      <div className="w-[200px] h-full flex justify-center items-center">
        {car.carName}
      </div>
      <div className="w-[200px] h-full flex justify-center items-center">
        {car.carNumber}
      </div>
      <div className="w-[200px] h-full flex justify-center items-center">
        {car.rfid.replaceAll(" ", "-")}
      </div>
      <div className="w-[200px] h-full flex justify-center items-center">
        {car.keyState}
      </div>
      <div className="w-[250px] h-full flex justify-around items-center">
        {car.carNumber === "" ? (
          ""
        ) : (
          <>
            <button className="w-32 h-10 text-base rounded-full text-slate-500 bg-slate-200 hover:shadow-figma">
              수정
            </button>
            <button className="w-24 h-10 text-base text-red-300 border-2 border-red-300 rounded-full hover:shadow-figma">
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Normal;
