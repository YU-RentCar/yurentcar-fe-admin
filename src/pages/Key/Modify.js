import { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { MdArrowBackIosNew } from "react-icons/md";

const Modify = ({ page, idx, car, ku, setMIdx, setMaxPage }) => {
  const [newKey, setNewKey] = useState({ ...car }); // 변경된 차량 정보
  const [stateMenu, setStateMenu] = useState([
    "마스터키",
    "사용중",
    "여분키",
    "도난",
  ]); // 차 키 상태
  return (
    <div
      id={idx}
      className="flex items-center w-full h-16 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300"
    >
      <div className="w-[200px] flex justify-center items-center h-full">
        <input
          className="w-5/6 px-4 text-sm border-2 border-blue-600 rounded-xl h-3/5"
          value={newKey.carName}
          onChange={(e) => {
            const tmp = { ...newKey, carName: e.target.value.trim() };
            setNewKey(tmp);
          }}
        ></input>
      </div>
      <div className="w-[200px] flex justify-center items-center h-full">
        <input
          className="w-5/6 px-4 text-sm border-2 border-blue-600 rounded-xl h-3/5"
          value={newKey.carNumber}
          onChange={(e) => {
            const tmp = { ...newKey, carNumber: e.target.value.trim() };
            setNewKey(tmp);
          }}
        ></input>
      </div>
      <div className="w-[200px] flex justify-center items-center h-full">
        <input
          className="w-5/6 px-4 text-sm border-2 border-blue-600 rounded-xl h-3/5"
          value={newKey.rfid.replaceAll(" ", "-")}
          onChange={(e) => {
            const tmp = { ...newKey, rfid: e.target.value.trim() };
            setNewKey(tmp);
          }}
        ></input>
      </div>
      <div className="w-[200px] h-full flex justify-center items-center">
        {/* 검색 */}
        <Menu>
          <MenuHandler>
            <button className="flex items-center justify-around w-5/6 px-2 text-lg text-white bg-blue-400 rounded-full h-3/5">
              <span id={`sort${idx}`} className="font-bold">
                {car.keyState}
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
                    document.getElementById(`sort${idx}`).innerText =
                      stateMenu[i];
                    const tmp = { ...newKey, keyState: stateMenu[i] };
                    setNewKey(tmp);
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
        <button
          className="w-3/5 text-lg font-bold text-white bg-blue-300 rounded-full h-3/5 hover:bg-blue-600 hover:shadow-figma"
          onClick={() => {
            const tmp = ku.changeInfo(page, idx, newKey);
            setMaxPage({ num: Math.ceil(tmp.length / 6) });
            setMIdx(-1);
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default Modify;
