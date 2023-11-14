import Normal from "./Normal";
import Modify from "./Modify";
import Alert from "popUp/Alert";
import Delete from "popUp/Key/Delete";
import { useRecoilValue, useRecoilState } from "recoil";
import { keyInfoSelector } from "recoil/keyAtom";
import { alertAtom } from "recoil/alertAtom";
import { useEffect, useState } from "react";
import { useKey } from "./utils/useKey";
import { usePopUp } from "utils/usePopUp";
import { useAlert } from "utils/useAlert";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  MdArrowBackIosNew,
  MdSearch,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";

const Key = () => {
  const ku = useKey(); // Key 의 Utils
  const popUp = usePopUp("Key/Delete"); // Delete 팝업 제어
  const alertInfo = useRecoilValue(alertAtom); // alert 제어
  const alert = useAlert(); // alert 제어
  const [newInfo, setNewInfo] = useRecoilState(keyInfoSelector); // 차 키 정보
  const [six, setSix] = useState([]); // 실제 화면 상에 보여질 6개
  const [searchTarget, setSearchTarget] = useState(""); // 검색할 차량 번호
  const [mIdx, setMIdx] = useState(-1); // 현재 수정 중인 차 키 index
  useEffect(() => {
    ku.getKeyList("first_admin"); // 서버로부터 차량 리스트 조회
  }, []);
  // maxPage 가 바뀌면 -> 새로운 데이터셋
  useEffect(() => {
    if (newInfo.addOrModify) {
      setSix(ku.fillEmpty(ku.getPageKeys(newInfo.maxPage.num)));
    } else {
      setSix(ku.fillEmpty(ku.getPageKeys(1)));
      newInfo.maxPage.num ? setNewInfo({ page: 1 }) : setNewInfo({ page: 0 });
    }
  }, [newInfo.maxPage]);
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="w-[1140px] mx-auto rounded-2xl bg-white shadow-xl flex flex-col justify-center items-center">
          <div className="flex items-center justify-between w-full h-[50px] px-8 mt-12">
            {/* 타이틀 */}
            <div className="w-[300px] flex items-center">
              <span className="text-3xl font-bold text-blue-500">
                차 키 관리
              </span>
              <button
                className="w-[120px] h-[50px] ml-4 bg-blue-400 text-white font-bold flex justify-around items-center rounded-full px-2 text-xl hover:shadow-figma"
                onClick={() => {
                  // 수정이 끝나지 않았다면 막아야 함
                  if (mIdx !== -1)
                    alert.onAndOff("기존 수정 내용을 저장해주세요");
                  else {
                    const tmp = [...newInfo.keys];
                    tmp.push({
                      carNumber: "",
                      kioskId: -1,
                      rfid: "",
                      slotNumber: -1,
                      state: "",
                    });
                    setNewInfo({
                      keys: [...tmp],
                      maxPage: { num: Math.ceil(tmp.length / 6) },
                      addOrModify: true,
                      page: Math.ceil(tmp.length / 6),
                    });
                    if ((tmp.length % 6) - 1 >= 0)
                      setMIdx((tmp.length % 6) - 1);
                    else setMIdx(5);
                  }
                }}
              >
                차 키 추가
              </button>
            </div>
            {/* 번호 검색 */}
            <div className="flex justify-center items-center w-[300px] h-full">
              <input
                className="h-full px-8 text-xl font-semibold border-2 border-blue-500 rounded-full"
                placeholder="차량 번호를 입력해주세요"
                onChange={(e) => setSearchTarget(e.target.value.trim())}
              />
            </div>
            <div className="w-[300px] h-full flex justify-end items-center">
              {/* 검색 */}
              <Menu>
                <MenuHandler>
                  <button className="w-[160px] h-full bg-blue-400 text-white flex justify-around items-center rounded-full px-2 text-xl">
                    <span id="sort" className="font-bold">
                      {newInfo.filterMenu[0]}
                    </span>
                    <MdArrowBackIosNew className="-rotate-90" />
                  </button>
                </MenuHandler>
                <MenuList>
                  {newInfo.filterMenu.map((v, i) => {
                    return (
                      <MenuItem
                        className="flex items-center justify-center text-lg font-bold"
                        onClick={() =>
                          (document.getElementById("sort").innerText =
                            newInfo.filterMenu[i])
                        }
                        key={i}
                      >
                        {v}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
              {/* 검색 버튼 */}
              <button
                className="ml-4 text-5xl text-blue-500"
                onClick={() => {
                  if (mIdx !== -1)
                    alert.onAndOff("기존 수정 내용을 저장해주세요");
                  else {
                    ku.searchKey(
                      "first_admin",
                      searchTarget,
                      document.getElementById("sort").innerText
                    );
                  }
                }}
              >
                <MdSearch />
              </button>
            </div>
          </div>
          {/* 타이틀 */}
          <div className="flex items-center w-full h-20 pl-4 pr-8 mt-8 text-xl font-semibold border-b-2 border-b-black">
            <div className="w-[180px] h-full flex justify-center items-center">
              차량 번호
            </div>
            <div className="w-[180px] h-full flex justify-center items-center">
              태그 ID
            </div>
            <div className="w-[180px] h-full flex justify-center items-center">
              키오스크 No.
            </div>
            <div className="w-[180px] h-full flex justify-center items-center">
              키박스 No.
            </div>
            <div className="w-[180px] h-full flex justify-center items-center">
              차 키 상태
            </div>
            <div className="w-[230px] h-full flex justify-center items-center">
              차 키 관리
            </div>
          </div>
          {/* 리스트 */}
          {six.map((v, i) => {
            // 해당 index 의 컴포넌트는 정보 수정 중인 경우
            return i !== mIdx ? (
              <Normal
                idx={i}
                car={v}
                ku={ku}
                mIdx={mIdx}
                setMIdx={setMIdx}
                key={i}
              />
            ) : (
              <Modify idx={i} car={v} ku={ku} setMIdx={setMIdx} />
            );
          })}
        </div>
        {/* 페이지 */}
        <div className="w-[300px] flex justify-between items-center mt-10">
          <MdArrowBack
            className="text-5xl"
            onClick={() => {
              // 수정이 끝나지 않았다면 막아야 함
              if (mIdx !== -1) alert.onAndOff("기존 수정 내용을 저장해주세요");
              else {
                if (newInfo.page === 1) return;
                setSix(ku.fillEmpty(ku.getPageKeys(newInfo.page - 1)));
                setNewInfo({ page: newInfo.page - 1 });
              }
            }}
          />
          <div className="text-lg">
            Page <span className="text-2xl">{newInfo.page}</span> of{" "}
            <span className="text-2xl">{newInfo.maxPage.num}</span>
          </div>
          <MdArrowForward
            className="text-5xl"
            onClick={() => {
              if (mIdx !== -1) alert.onAndOff("기존 수정 내용을 저장해주세요");
              else {
                if (newInfo.page === newInfo.maxPage.num) return;
                setSix(ku.fillEmpty(ku.getPageKeys(newInfo.page + 1)));
                setNewInfo({ page: newInfo.page + 1 });
              }
            }}
          />
        </div>
      </div>
      {alertInfo.state ? <Alert /> : null}
      {popUp.isClicked ? <Delete ku={ku} /> : null}
    </>
  );
};

export default Key;
