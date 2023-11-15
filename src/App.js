import SideBar from "components/SideBar";
import Car from "pages/Car/Car";
import CarState from "pages/CarState/CarState";
import ManageCar from "pages/ManageCar/ManageCar";
import Map from "pages/Map/Map";
import Reservation from "pages/Reservation/Reservation";
import Point from "pages/Point/Point";
import Key from "pages/Key/Key";
import Notice from "pages/Notice/Notice";
import ManageNotice from "pages/ManageNotice/ManageNotice";
import Login from "pages/Login/Login";
import Alert from "popUp/Alert";
import { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminSelector } from "recoil/adminAtom";
import { useAlert } from "utils/useAlert";
import { alertAtom } from "recoil/alertAtom";

function App() {
  const nav = useNavigate();
  const location = useLocation();
  const alert = useAlert();
  const [admin, setAdmin] = useRecoilState(adminSelector);
  useEffect(() => {
    const adminInfo = window.sessionStorage.getItem("adminInfo");
    if (adminInfo === null) {
      alert.onAndOff("로그인을 진행해주세요");
      nav("/");
    } else {
      setAdmin({
        branchName: JSON.parse(adminInfo).branchName,
        province: JSON.parse(adminInfo).province,
        adminUsername: JSON.parse(adminInfo).adminUsername,
      });
      if (location.pathname.split("/")[1] === "managecar") nav("/car");
      else if (location.pathname.split("/")[1] === "managenotice")
        nav("/notice");
    }
  }, []);
  return (
    <>
      <div className="w-full min-h-screen bg-slate-50">
        {/* 사이드바 */}
        {location.pathname === "/" ? null : <SideBar />}
        {/* 메인 컨텐츠 */}
        <Routes>
          <Route path="/carstate" element={<CarState />}></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route path="/Reservation" element={<Reservation />}></Route>
          <Route path="/car" element={<Car />}></Route>
          <Route path="/managecar" element={<ManageCar />}></Route>
          <Route path="/point" element={<Point />}></Route>
          <Route path="/key" element={<Key />}></Route>
          <Route path="/notice" element={<Notice />}></Route>
          <Route path="/managenotice" element={<ManageNotice />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </div>
      {useRecoilValue(alertAtom).state && <Alert />}
    </>
  );
}

export default App;
