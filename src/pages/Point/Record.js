import { Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useRecoilValue, useRecoilState } from "recoil";
import { pointAtom, changeRecordsSelector } from "recoil/pointAtom";

const Record = ({ setType }) => {
  const user = useRecoilValue(pointAtom); // 유저 정보
  const [records, setRecords] = useRecoilState(changeRecordsSelector); // 내역 정보
  const [page, setPage] = useState(1); // 현재 페이지
  const [maxPage, setMaxPage] = useState({ num: 1 }); // 최대 페이지
  const [six, setSix] = useState([]); // 실제 화면 상에 보여질 6개
  // 포인트 내역 조회
  function getPointRecords(nikcname) {
    /* getPointRecords(nickname)
      .then((response) => {
        console.log("포인트 / 내역조회 : ", response.data);
        const tmp = fillSix([...response.data]); // 6개보다 적다면 빈걸로 채워주기
        setRecords(tmp);
      })
      .catch((error) => {
        console.log("포인트 / 내역조회에러 : ", error.response);
      }); 
    return cars */
    const tmp = fillSix(records);
    records = [...tmp];
  }
  // 특정 페이지의 6개 가져오기
  function getPageRecords(page) {
    const pageRecords = records.slice((page - 1) * 6, page * 6);
    return pageRecords;
  }
  // 비어있는 개수 채우기
  function fillSix(beforeSix) {
    const len = beforeSix.length;
    const tmp = [...beforeSix];
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        tmp.push({
          price: 0,
          reason: "",
          createdTime: "",
        });
      }
    }
    return tmp;
  }
  useEffect(() => {
    // getPointRecords(""); 서버로부터 차량 리스트 조회
    setMaxPage({ num: Math.ceil(records.length / 6) });
  }, []);
  // maxPage 가 바뀌면 -> 새로운 데이터셋
  useEffect(() => {
    setSix(fillSix(getPageRecords(1)));
    maxPage ? setPage(1) : setPage(0);
  }, [maxPage]);
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
            {user.nickname} 님의 포인트 내역
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
            if (page === 1) return;
            setSix(fillSix(getPageRecords(page - 1)));
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
            setSix(fillSix(getPageRecords(page + 1)));
            setPage(page + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Record;
