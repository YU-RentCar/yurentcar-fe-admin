import title from "./title";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useRecoilState } from "recoil";
import { keyInfoSelector } from "recoil/keyAtom";
import { useAlert } from "utils/useAlert";

const Modify = ({ idx, car, ku, setMIdx }) => {
  const alert = useAlert(); // alert 제어
  const [newKey, setNewKey] = useState({ ...car }); // 변경된 차량 정보
  const [newInfo, setNewInfo] = useRecoilState(keyInfoSelector);
  useEffect(() => {
    if (newInfo.addOrModify) {
      setNewKey({
        carNumber: "",
        kioskId: -1,
        rfid: "",
        slotNumber: -1,
        keyState: "사용중",
      });
    }
  }, []);
  return (
    <div
      id={idx}
      className="flex items-center w-full h-16 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300"
    >
      <div className="w-[180px] flex justify-center items-center h-full">
        <input
          className="w-5/6 px-4 text-sm border-2 border-blue-600 rounded-xl h-3/5"
          placeholder="차량 번호"
          value={newKey.carNumber}
          onChange={(e) => {
            const tmp = { ...newKey, carNumber: e.target.value.trim() };
            setNewKey(tmp);
          }}
        ></input>
      </div>
      <div className="w-[180px] flex justify-center items-center h-full">
        <input
          className="w-5/6 px-4 text-sm border-2 border-blue-600 rounded-xl h-3/5"
          placeholder="태그 ID (RFID)"
          value={newKey.rfid}
          onChange={(e) => {
            const tmp = { ...newKey, rfid: e.target.value.trim() };
            setNewKey(tmp);
          }}
        ></input>
      </div>
      <div className="w-[180px] flex justify-center items-center h-full">
        <input
          className="w-1/2 px-4 text-sm border-2 border-blue-600 rounded-xl h-3/5"
          type="number"
          value={newKey.kioskId < 0 ? 0 : newKey.kioskId}
          onChange={(e) => {
            const tmp = { ...newKey, kioskId: Number(e.target.value) };
            setNewKey(tmp);
          }}
        ></input>
        &nbsp;번
      </div>
      <div className="w-[180px] flex justify-center items-center h-full">
        <input
          className="w-1/2 px-4 text-sm border-2 border-blue-600 rounded-xl h-3/5"
          type="number"
          value={newKey.slotNumber < 0 ? 0 : newKey.slotNumber}
          onChange={(e) => {
            const tmp = { ...newKey, slotNumber: Number(e.target.value) };
            setNewKey(tmp);
          }}
        ></input>
        &nbsp;번
      </div>
      <div className="w-[180px] h-full flex justify-center items-center">
        {/* 상태 지정 */}
        <Menu>
          <MenuHandler>
            <button className="flex items-center justify-around w-5/6 px-2 text-lg text-white bg-blue-400 rounded-full h-3/5">
              <span id={`sort${idx}`} className="font-bold">
                {car.state === "" ? newInfo.stateMenu[1] : car.state}
              </span>
              <MdArrowBackIosNew className="-rotate-90" />
            </button>
          </MenuHandler>
          <MenuList>
            {newInfo.stateMenu.map((v, i) => {
              return (
                <MenuItem
                  className="flex items-center justify-center text-lg font-bold"
                  onClick={() => {
                    document.getElementById(`sort${idx}`).innerText =
                      newInfo.stateMenu[i];
                    const tmp = {
                      ...newKey,
                      keyState: newInfo.stateMenu[i],
                    };
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
      <div className="w-[230px] h-full flex justify-center items-center">
        <button
          className="w-3/5 text-lg font-bold text-white bg-blue-300 rounded-full h-3/5 hover:bg-blue-600 hover:shadow-figma"
          onClick={() => {
            const tmp = { ...newKey, state: title[newKey.keyState] };
            if (validateInfo(tmp)) {
              newInfo.addOrModify
                ? ku.addKey("first_admin", { ...tmp })
                : ku.modifyKey("first_admin", { ...tmp });
              setMIdx(-1);
            }
          }}
        >
          저장
        </button>
      </div>
    </div>
  );

  function validateInfo(newKey) {
    if (newKey.carNumber === "") {
      alert.onAndOff("차량 번호를 입력해주세요");
      return false;
    } else if (newKey.rfid < 0) {
      alert.onAndOff("태그 ID 를 입력해주세요");
      return false;
    } else if (newKey.kioskId <= 0) {
      alert.onAndOff("키오스크 번호를 입력해주세요");
      return false;
    } else if (newKey.slotNumber < 0) {
      alert.onAndOff("키박스 번호를 입력해주세요");
      return false;
    } else return true;
  }
};

export default Modify;
