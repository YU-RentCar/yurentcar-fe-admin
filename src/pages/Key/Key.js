import Normal from "./Normal";
import Modify from "./Modify";
import Alert from "popUp/Alert";
import Delete from "popUp/Key/Delete";
import { useRecoilValue } from "recoil";
import { alertAtom } from "recoil/alertAtom";
import { useEffect, useState } from "react";
import { useKey } from "./utils/useKey";
import { usePopUp } from "utils/usePopUp";
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
  const [page, setPage] = useState(1); // 현재 페이지
  const [maxPage, setMaxPage] = useState({ num: 1 }); // 최대 페이지
  const [delTarget, setDelTarget] = useState({}); // 삭제 타겟
  const [filterMenu, setFilterMenu] = useState([
    "전체",
    "마스터키",
    "사용중",
    "여분키",
    "도난",
  ]); // 검색 필터
  const [six, setSix] = useState([]); // 실제 화면 상에 보여질 6개
  const [searchTarget, setSearchTarget] = useState(""); // 검색할 차량 번호
  const [mIdx, setMIdx] = useState(-1); // 현재 수정 중인 차 키 index
  useEffect(() => {
    const tmp = [...ku.getKeyList()]; // 서버로부터 차량 리스트 조회
    setMaxPage({ num: Math.ceil(tmp.length / 6) });
  }, []);
  // maxPage 가 바뀌면 -> 새로운 데이터셋
  useEffect(() => {
    setSix(ku.fillSix(ku.getPageKeys(1)));
    setPage(1);
  }, [maxPage]);
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="w-[1140px] mx-auto rounded-2xl bg-white shadow-xl flex flex-col justify-center items-center">
          <div className="flex items-center justify-between w-full h-[50px] px-8 mt-12">
            {/* 타이틀 */}
            <div className="w-[300px]">
              <span className="text-3xl font-bold text-blue-500">
                차 키 관리
              </span>
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
                      {filterMenu[0]}
                    </span>
                    <MdArrowBackIosNew className="-rotate-90" />
                  </button>
                </MenuHandler>
                <MenuList>
                  {filterMenu.map((v, i) => {
                    return (
                      <MenuItem
                        className="flex items-center justify-center text-lg font-bold"
                        onClick={() =>
                          (document.getElementById("sort").innerText =
                            filterMenu[i])
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
                  const tmp = ku.searchKeys(
                    searchTarget,
                    document.getElementById("sort").innerText
                  );
                  setMaxPage({ num: Math.ceil(tmp.length / 6) }); // 검색 결과 -> 새로운 데이터 셋
                }}
              >
                <MdSearch />
              </button>
            </div>
          </div>
          {/* 타이틀 */}
          <div className="flex items-center w-full h-20 pl-4 pr-8 mt-8 text-xl font-semibold border-b-2 border-b-black">
            <div className="w-[200px] h-full flex justify-center items-center">
              차량 이름
            </div>
            <div className="w-[200px] h-full flex justify-center items-center">
              차량 번호
            </div>
            <div className="w-[200px] h-full flex justify-center items-center">
              태그 ID
            </div>
            <div className="w-[200px] h-full flex justify-center items-center">
              차 키 상태
            </div>
            <div className="w-[250px] h-full flex justify-center items-center">
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
                setDelTarget={setDelTarget}
                setMaxPage={setMaxPage}
              />
            ) : (
              <Modify
                page={page}
                idx={i}
                car={v}
                ku={ku}
                setMIdx={setMIdx}
                setMaxPage={setMaxPage}
              />
            );
          })}
        </div>
        {/* 페이지 */}
        <div className="w-[300px] flex justify-between items-center mt-10">
          <MdArrowBack
            className="text-5xl"
            onClick={() => {
              if (page === 1) return;
              setSix(ku.fillSix(ku.getPageKeys(page - 1)));
              setPage(page - 1);
            }}
          />
          <div className="text-lg">
            Page <span className="text-2xl">{page}</span> of{" "}
            <span className="text-2xl">{maxPage.num}</span>
          </div>
          <MdArrowForward
            className="text-5xl"
            onClick={() => {
              if (page === maxPage.num) return;
              setSix(ku.fillSix(ku.getPageKeys(page + 1)));
              setPage(page + 1);
            }}
          />
        </div>
      </div>
      {alertInfo.state ? <Alert /> : null}
      {popUp.isClicked ? (
        <Delete delTarget={delTarget} ku={ku} setMaxPage={setMaxPage} />
      ) : null}
    </>
  );
};

export default Key;
