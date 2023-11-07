import SideBar from "components/SideBar";
import Car from "pages/Car/Car";
import CarState from "pages/CarState/CarState";
import ManageCar from "pages/ManageCar/ManageCar";
import Map from "pages/Map/Map";
import Point from "pages/Point/Point";
import { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

function App() {
  const nav = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.split("/")[1] === "managecar") nav("/car");
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
          <Route path="/car" element={<Car />}></Route>
          <Route path="/managecar" element={<ManageCar />}></Route>
          <Route path="/point" element={<Point />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
