import { useRecoilValue } from "recoil";
import { keyAtom } from "recoil/keyAtom";
import { usePopUp } from "utils/usePopUp";
const Delete = ({ ku }) => {
  const popUp = usePopUp("Key/Delete"); // 팝업 제어
  const info = useRecoilValue(keyAtom); // 삭제 정보
  return (
    <div className="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
      <div className="w-[600px] h-[300px] rounded-2xl bg-white flex flex-col justify-center items-center">
        <div className="w-[550px] h-[200px] flex flex-col justify-between items-center">
          {/* 멘트 */}
          <span className="text-3xl font-bold">
            정말로 해당 키를 <span className="text-red-500">삭제</span>
            하시겠습니까?
          </span>
          {/* 삭제하기 버튼 */}
          <button
            className="w-[350px] h-16 bg-sky-200 rounded-2xl text-red-500 font-bold text-2xl"
            onClick={() => {
              ku.deleteKey("first_admin", info.deleteTarget); // 해당 차량 삭제
              popUp.toggle();
            }}
          >
            삭제하기
          </button>
          {/* 취소 버튼 */}
          <button
            className="w-[350px] h-16 bg-slate-300 rounded-2xl font-bold text-2xl"
            onClick={() => {
              popUp.toggle();
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
