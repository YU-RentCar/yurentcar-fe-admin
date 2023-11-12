import { useRecoilState } from "recoil";
import { keyInfoSelector } from "recoil/keyAtom";
import { useAlert } from "utils/useAlert";
import { usePopUp } from "utils/usePopUp";

const Normal = ({ idx, car, mIdx, setMIdx }) => {
  const popUp = usePopUp("Key/Delete"); // 팝업 제어
  const alert = useAlert(); // alert 제어
  const [newInfo, setNewInfo] = useRecoilState(keyInfoSelector); // 차 키 정보
  return (
    <div
      id={idx}
      className="flex items-center w-full h-16 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300"
    >
      {/* 세부 내용 */}
      <div className="w-[180px] h-full flex justify-center items-center">
        {car.carNumber}
      </div>
      <div className="w-[180px] h-full flex justify-center items-center">
        {car.rfid.replaceAll(" ", "-")}
      </div>
      <div className="w-[180px] h-full flex justify-center items-center">
        {car.kioskId >= 0 ? car.kioskId : ""}
      </div>
      <div className="w-[180px] h-full flex justify-center items-center">
        {car.slotNumber >= 0 ? car.slotNumber : ""}
      </div>
      <div className="w-[180px] h-full flex justify-center items-center">
        {car.state}
      </div>
      <div className="w-[230px] h-full flex justify-around items-center">
        {/* 빈 객체라면 공백 or 수정 & 삭제 버튼 */}
        {car.carNumber === "" ? (
          ""
        ) : (
          <>
            <button
              className="h-10 text-base rounded-full w-28 text-slate-500 bg-slate-200 hover:shadow-figma"
              onClick={() => {
                // 수정이 끝나지 않았다면 막아야 함
                if (mIdx !== -1)
                  alert.onAndOff("기존 수정 내용을 저장해주세요");
                else {
                  setNewInfo({ addOrModify: false });
                  setMIdx(idx); // 수정이 가능하다면 해당 index 로 지정
                }
              }}
            >
              수정
            </button>
            <button
              className="w-20 h-10 text-base text-red-300 border-2 border-red-300 rounded-full hover:shadow-figma"
              onClick={() => {
                setNewInfo({ deleteTarget: car.keyId }); // 삭제 타겟 지정
                popUp.toggle(); // 삭제 팝업
              }}
            >
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Normal;
