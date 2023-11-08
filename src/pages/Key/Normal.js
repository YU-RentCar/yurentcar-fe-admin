import { useAlert } from "utils/useAlert";

const Normal = ({ idx, car, ku, mIdx, setMIdx, setMaxPage }) => {
  const alert = useAlert();
  return (
    <div
      id={idx}
      className="flex items-center w-full h-16 pl-4 pr-8 text-lg font-semibold border-b-2 border-t-slate-300"
    >
      {/* 세부 내용 */}
      <div className="w-[200px] h-full flex justify-center items-center">
        {car.carName}
      </div>
      <div className="w-[200px] h-full flex justify-center items-center">
        {car.carNumber}
      </div>
      <div className="w-[200px] h-full flex justify-center items-center">
        {car.rfid.replaceAll(" ", "-")}
      </div>
      <div className="w-[200px] h-full flex justify-center items-center">
        {car.keyState}
      </div>
      <div className="w-[250px] h-full flex justify-around items-center">
        {/* 빈 객체라면 공백 or 수정 & 삭제 버튼 */}
        {car.carNumber === "" ? (
          ""
        ) : (
          <>
            <button
              className="w-32 h-10 text-base rounded-full text-slate-500 bg-slate-200 hover:shadow-figma"
              onClick={() => {
                // 수정이 끝나지 않았다면 막아야 함
                if (mIdx !== -1)
                  alert.onAndOff("기존 수정 내용을 저장해주세요");
                else setMIdx(idx); // 수정이 가능하다면 해당 index 로 지정
              }}
            >
              수정
            </button>
            <button
              className="w-24 h-10 text-base text-red-300 border-2 border-red-300 rounded-full hover:shadow-figma"
              onClick={() => {
                const tmp = ku.deleteKey(car); // 해당 차량 삭제
                setMaxPage({ num: Math.ceil(tmp.length / 6) }); // 검색 결과 -> 새로운 데이터 셋
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
