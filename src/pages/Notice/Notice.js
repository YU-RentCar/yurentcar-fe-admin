import { useEffect, useState } from "react";
import { useNotice } from "pages/Notice/utils/useNotice";
import { MdSearch, MdArrowBack, MdArrowForward } from "react-icons/md";
import { usePopUp } from "utils/usePopUp";
import { useNavigate } from "react-router-dom";
import Delete from "popUp/Notice/Delete";
import dayjs from "dayjs";

const Notice = () => {
  const nav = useNavigate(); // nav 제어
  const popUp = usePopUp("Notice/Delete"); // Delete 팝업 제어
  const nu = useNotice(); // Notice 의 Utils
  const [page, setPage] = useState(1); // 현재 페이지
  const [maxPage, setMaxPage] = useState({ num: 1 }); // 최대 페이지
  const [six, setSix] = useState([]); // 실제 화면 상에 보여질 6개
  const [searchTarget, setSearchTarget] = useState(""); // 검색할 공지사항 제목
  const [delTarget, setDelTarget] = useState({}); // 삭제할 공지사항
  useEffect(() => {
    const tmp = [...nu.getNoticeList()]; // 서버로부터 차량 리스트 조회
    setMaxPage({ num: Math.ceil(tmp.length / 6) });
  }, []);
  // maxPage 가 바뀌면 -> 새로운 데이터셋
  useEffect(() => {
    setSix(nu.fillSix(nu.getPageNotices(1)));
    maxPage ? setPage(1) : setPage(0);
  }, [maxPage]);
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="w-[1140px] mx-auto rounded-2xl bg-white shadow-xl flex flex-col justify-center items-center">
          <div className="flex items-center justify-between w-full h-[50px] px-8 mt-12">
            {/* 타이틀 */}
            <span className="text-3xl font-bold text-blue-500 w-44">
              공지사항 관리
            </span>
            <div className="flex items-center h-full">
              {/* 제목 검색 */}
              <input
                className="h-full text-xl font-semibold border-2 border-blue-500 rounded-full w-[360px] px-8"
                placeholder="제목을 입력해주세요"
                onChange={(e) => setSearchTarget(e.target.value.trim())}
              />
              {/* 검색 버튼 */}
              <button
                className="ml-2 text-4xl text-blue-500"
                onClick={() => {
                  const tmp = nu.searchNotices(searchTarget);
                  setMaxPage({ num: Math.ceil(tmp.length / 6) }); // 검색 결과 -> 새로운 데이터 셋
                }}
              >
                <MdSearch />
              </button>
            </div>
            {/* 공지사항 추가 버튼 */}
            <button
              className="h-full text-xl font-semibold text-white bg-blue-400 rounded-full w-44 hover:shadow-figma"
              onClick={() => {
                nav("/managenotice", { state: { type: "add" } });
              }}
            >
              공지사항 추가
            </button>
          </div>
          {/* 타이틀 */}
          <div className="flex items-center w-full h-20 pl-4 pr-8 mt-8 text-xl font-semibold border-b-2 border-b-black">
            <div className="w-[538px] h-full flex justify-start items-center pl-4">
              제목
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              업데이트 날짜
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              차량 상태 관리
            </div>
          </div>
          {/* 리스트 */}
          {six.map((v, i) => {
            return (
              <div
                id={i}
                className="flex items-center w-full h-16 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300"
                key={i}
              >
                <div className="w-[538px] h-full flex justify-start items-center pl-4">
                  <p className="overflow-hidden text-ellipsis">{v.title}</p>
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {v.modifiedAt === ""
                    ? ""
                    : dayjs(v.modifiedAt).format("YYYY.MM.DD")}
                </div>
                {v.noticeId === "" ? (
                  ""
                ) : (
                  <div className="w-[269px] h-full flex justify-around items-center px-6">
                    <button
                      className="w-[130px] h-2/3 rounded-full bg-slate-200 text-lg font-medium text-slate-500 hover:shadow-figma"
                      onClick={() => {
                        nav("/managenotice", {
                          state: {
                            type: "modify",
                            noticeId: v,
                          },
                        });
                      }}
                    >
                      공지 수정
                    </button>
                    <button
                      className="w-[70px] h-2/3 rounded-full border-2 border-red-300 text-lg font-medium text-red-300 hover:shadow-figma"
                      onClick={() => {
                        setDelTarget({
                          noticeId: v.noticeId,
                        });
                        popUp.toggle();
                      }}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* 페이지 */}
        <div className="w-[300px] flex justify-between items-center mt-10">
          <MdArrowBack
            className="text-5xl"
            onClick={() => {
              if (page === 1) return;
              setSix(nu.fillSix(nu.getPageNotices(page - 1)));
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
              if (page === maxPage) return;
              setSix(nu.fillSix(nu.getPageNotices(page + 1)));
              setPage(page + 1);
            }}
          />
        </div>
      </div>
      {popUp.isClicked ? (
        <Delete delTarget={delTarget} nu={nu} setMaxPage={setMaxPage} />
      ) : null}
    </>
  );
};

export default Notice;
