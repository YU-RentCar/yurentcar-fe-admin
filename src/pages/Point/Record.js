import { Tooltip } from "@material-tailwind/react";
import { getPointRecords } from "api/pointAxios";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useRecoilState } from "recoil";
import { pointInfoSelector } from "recoil/pointAtom";

const Record = ({ setType }) => {
  const [newInfo, setNewInfo] = useRecoilState(pointInfoSelector); // 내역 정보
  const [six, setSix] = useState([]); // 실제 화면 상에 보여질 6개
  // 포인트 내역 조회
  function getRecords(adminUsername, nickname) {
    getPointRecords(adminUsername, nickname)
      .then((response) => {
        console.log("포인트 / 내역조회 : ", response.data);
        const tmp = [...response.data];
        tmp.sort((a, b) => a.createdTime - b.createdTime);
        setNewInfo({
          records: [...tmp],
          maxPage: { num: Math.ceil(tmp.length / 6) },
        });
      })
      .catch((error) => {
        console.log("포인트 / 내역조회에러 : ", error.response);
      });
  }
  // 특정 페이지의 6개 가져오기
  function getPageRecords(page) {
    const pageRecords = newInfo.records.slice((page - 1) * 6, page * 6);
    return pageRecords;
  }
  // 비어있는 개수 채우기
  function fillEmpty(beforeSix) {
    const len = beforeSix.length;
    const tmp = [...beforeSix];
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        tmp.push({
          price: 0,
          reason: "",
        });
      }
    }
    return tmp;
  }
  useEffect(() => {
    // 서버로부터 차량 리스트 불러오기
    getRecords("first_admin", newInfo.nickname);
  }, []);
  // maxPage 가 바뀌면 -> 새로운 데이터셋
  useEffect(() => {
    setSix(fillEmpty(getPageRecords(1)));
    newInfo.maxPage.num ? setNewInfo({ page: 1 }) : setNewInfo({ page: 0 });
  }, [newInfo.maxPage]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="w-[1140px] mx-auto rounded-2xl bg-white shadow-xl flex flex-col justify-center items-center">
        <div className="flex items-center w-full h-[50px] px-8 mt-12">
          {/* 뒤로가기버튼 & 타이틀 */}
          <Tooltip
            content="뒤로가기"
            placement="left"
            animate={{
              mount: { scale: 1, x: 0 },
              unmount: { scale: 0, x: 25 },
            }}
            className="w-[100px] h-[40px] border-2 border-slate-500 rounded-full bg-white text-sm text-slate-500 font-semibold flex justify-center items-center"
          >
            {/* 뒤로가기 -> 닉네임 검색 컴포넌트 타입으로 변경 */}
            <button onClick={() => setType(1)}>
              <MdArrowBack className="text-4xl text-blue-500" />
            </button>
          </Tooltip>
          <span className="ml-4 text-3xl font-bold text-blue-500 w-44">
            포인트 관리
          </span>
          <span className="flex items-center h-full text-xl font-semibold">
            {newInfo.nickname} 님의 포인트 내역
          </span>
        </div>
        {/* 타이틀 */}
        <div className="flex items-center w-full h-20 px-8 mt-8 text-xl font-semibold border-b-2 border-b-black">
          <div className="w-[200px] h-full flex justify-start items-center">
            포인트
          </div>
          <div className="w-[800px] h-full flex justify-start items-center">
            사유
          </div>
        </div>
        {/* 리스트 */}
        {six.map((v, i) => {
          return (
            <div
              className="flex items-center w-full h-16 px-8 text-lg font-semibold border-b-2 border-t-slate-300"
              key={i}
            >
              <div className="w-[200px] h-full flex justify-start items-center">
                {v.price === 0
                  ? ""
                  : v.price > 0
                  ? `+${v.price}`
                  : `${v.price}`}
              </div>
              <div className="w-[800px] h-full flex justify-start items-center">
                {v.reason}
              </div>
            </div>
          );
        })}
      </div>
      {/* 페이지 */}
      <div className="w-[300px] flex justify-between items-center mt-10">
        <MdArrowBack
          className="text-5xl"
          onClick={() => {
            if (newInfo.page === 1) return;
            setSix(fillEmpty(getPageRecords(newInfo.page - 1)));
            setNewInfo({ page: newInfo.page - 1 });
          }}
        />
        <div className="text-lg">
          Page <span className="text-2xl">{newInfo.page}</span> of{" "}
          <span className="text-2xl">{newInfo.maxPage.num}</span>
        </div>
        <MdArrowForward
          className="text-5xl"
          onClick={() => {
            if (newInfo.page === newInfo.maxPage) return;
            setSix(fillEmpty(getPageRecords(newInfo.page + 1)));
            setNewInfo({ page: newInfo.page + 1 });
          }}
        />
      </div>
    </div>
  );
};

export default Record;
