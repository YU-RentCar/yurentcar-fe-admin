import Alert from "popUp/Alert";
import Record from "./Record";
import Search from "./Search";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { alertAtom } from "recoil/alertAtom";

const Point = () => {
  const [type, setType] = useState(1); // 컴포넌트 제어
  const alertInfo = useRecoilValue(alertAtom); // alert state
  return (
    <>
      {/* 타입에 따른 표시 컴포넌트 */}
      <div className="flex flex-col items-center justify-center w-full h-screen">
        {type ? <Search setType={setType} /> : <Record setType={setType} />}
      </div>
      {/* alert 제어 */}
      {alertInfo.state ? <Alert /> : null}
    </>
  );
};

export default Point;
