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
import { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

function App() {
  const nav = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.split("/")[1] === "managecar") nav("/car");
    else if (location.pathname.split("/")[1] === "managenotice") nav("/notice");
  }, []);
  return (
    <>
      <div className="w-full min-h-screen bg-slate-50">
        {/* 사이드바 */}
        <SideBar />
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
        </Routes>
      </div>
    </>
  );
}

export default App;
