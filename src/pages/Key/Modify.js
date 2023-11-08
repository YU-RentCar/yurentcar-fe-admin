import { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { MdArrowBackIosNew } from "react-icons/md";

const Modify = ({ idx, car, ku }) => {
  const [stateMenu, setStateMenu] = useState(["사용가능", "수리/점검", "도난"]); // 차량 상태
  return (
    <div
      id={idx}
      className="flex items-center w-full h-16 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300"
    >
      <div className="w-[200px] flex justify-center items-center h-full">
        <input
          className="w-5/6 px-4 text-sm border-2 border-blue-600 rounded-full h-4/5"
          value={car.carName}
          onChange={(e) => console.log(e.target.value.trim())}
        ></input>
      </div>
      <div className="w-[200px] flex justify-center items-center h-full">
        <input
          className="w-5/6 px-4 text-sm border-2 border-blue-600 rounded-full h-4/5"
          value={car.carNumber}
          onChange={(e) => console.log(e.target.value.trim())}
        ></input>
      </div>
      <div className="w-[200px] flex justify-center items-center h-full">
        <input
          className="w-5/6 px-4 text-sm border-2 border-blue-600 rounded-full h-4/5"
          value={car.rfid.replaceAll(" ", "-")}
          onChange={(e) => console.log(e.target.value.trim())}
        ></input>
      </div>
      <div className="w-[200px] h-full flex justify-center items-center">
        {/* 검색 */}
        <Menu>
          <MenuHandler>
            <button className="flex items-center justify-around w-5/6 px-2 text-lg text-white bg-blue-400 rounded-full h-4/5">
              <span id={`sort${idx}`} className="font-bold">
                {stateMenu[0]}
              </span>
              <MdArrowBackIosNew className="-rotate-90" />
            </button>
          </MenuHandler>
          <MenuList>
            {stateMenu.map((v, i) => {
              return (
                <MenuItem
                  className="flex items-center justify-center text-lg font-bold"
                  onClick={() => {
                    const target = document.getElementById(`sort${idx}`);
                    ku.changeMenu("list", target, stateMenu[i], 0);
                  }}
                  key={i}
                >
                  {v}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </div>
      <div className="w-[250px] h-full flex justify-center items-center">
        <button className="w-3/5 text-lg font-bold text-white bg-blue-300 rounded-2xl h-4/5 hover:bg-blue-600 hover:shadow-figma">
          저장
        </button>
      </div>
    </div>
  );
};

export default Modify;
