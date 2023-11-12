import Change from "popUp/Point/Change";
import { useEffect, useState } from "react";
import { MdSearch, MdInfoOutline } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";
import { usePopUp } from "utils/usePopUp";
import { useRecoilState } from "recoil";
import { userInfoSelector } from "recoil/pointAtom";
import { getUserPoint } from "api/pointAxios";
import { useAlert } from "utils/useAlert";

const Search = ({ setType }) => {
  const alert = useAlert(); // alert 제어
  const popUp = usePopUp("Point/Change"); // Change 팝업 제어
  const [isSearched, setIsSearched] = useState(false); // 검색 결과
  const [user, setUser] = useRecoilState(userInfoSelector); // 유저 정보
  const [searchTarget, setSearchTarget] = useState(""); // 검색할 닉네임
  useEffect(() => {
    if (user.nickname !== "") {
      getUserPoint("first_admin", user.nickname)
        .then((response) => {
          console.log("포인트 / 포인트 : ", response.data);
          setIsSearched(true);
        })
        .catch((error) => {
          console.log("포인트 / 포인트에러 : ", error.response);
          alert.onAndOff("검색에 실패했습니다");
        });
    }
  }, []);
  return (
    <>
      <div className="flex items-center w-full h-screen">
        <div className="w-[1140px] mx-auto rounded-2xl bg-white shadow-xl flex flex-col justify-center items-center -mt-40">
          <div className="flex items-center w-full h-[50px] px-8 mt-12">
            {/* 타이틀 */}
            <span className="text-3xl font-bold text-blue-500 w-44">
              포인트 관리
            </span>
            <div className="flex items-center h-full ml-40">
              {/* 닉네임 검색 */}
              <input
                className="h-full text-xl font-semibold border-2 border-blue-500 rounded-full w-[360px] px-8"
                placeholder="닉네임을 입력해주세요"
                onChange={(e) => setSearchTarget(e.target.value)}
              />
              {/* 검색 버튼 */}
              <button
                className="ml-2 text-4xl text-blue-500"
                onClick={() => {
                  if (searchTarget.trim() === "")
                    alert.onAndOff("닉네임을 입력해주세요");
                  else {
                    getUserPoint("first_admin", searchTarget)
                      .then((response) => {
                        console.log("포인트 / 포인트 : ", response.data);
                        const tmp = {
                          ...user,
                          nickname: searchTarget,
                          point: Number(response.data),
                        };
                        setUser(tmp);
                        setIsSearched(true);
                      })
                      .catch((error) => {
                        console.log("포인트 / 포인트에러 : ", error.response);
                        setSearchTarget("");
                        alert.onAndOff("검색에 실패했습니다");
                      });
                  }
                }}
              >
                <MdSearch />
              </button>
            </div>
          </div>
          {/* 타이틀 */}
          <div className="flex items-center w-full h-20 pl-4 pr-8 mt-8 text-xl font-semibold border-b-2 border-b-black">
            <div className="w-[269px] h-full flex justify-center items-center">
              닉네임
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              포인트
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              내역 조회
            </div>
            <div className="w-[269px] h-full flex justify-center items-center">
              정보 변경
            </div>
          </div>
          {/* 리스트 */}
          <div className="flex items-center w-full h-20 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300">
            {isSearched ? (
              <>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {user.nickname}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {user.point}
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  <Tooltip
                    content="내역 보러가기"
                    placement="top"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    className="w-[120px] h-[40px] border-2 border-slate-500 rounded-full bg-white text-sm text-slate-500 font-semibold flex justify-center items-center"
                  >
                    {/* 내역 조회 컴포넌트 타입으로 변경 */}
                    <button onClick={() => setType(0)}>
                      <MdInfoOutline className="text-2xl" />
                    </button>
                  </Tooltip>
                </div>
                <div className="w-[269px] h-full flex justify-center items-center">
                  {/* 정보 변경 버튼 */}
                  <button
                    className="w-[140px] h-[45px] rounded-full bg-s-200 text-lg text-white bg-blue-500 font-medium hover:shadow-figma"
                    onClick={() => popUp.toggle()}
                  >
                    정보 변경
                  </button>
                </div>
              </>
            ) : (
              <div className="mx-auto my-auto text-2xl font-semibold text-blue-500">
                유저를 검색해주세요
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 정보 변경 팝업 */}
      {popUp.isClicked ? <Change /> : null}
    </>
  );
};

export default Search;
