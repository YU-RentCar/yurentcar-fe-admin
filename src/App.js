import SideBar from "components/SideBar";
import CarState from "pages/CarState/CarState";
import Map from "pages/Map/Map";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-slate-50">
        {/* 사이드바 */}
        <SideBar />
        {/* 메인 컨텐츠 */}
        <Routes>
          <Route path="/carstate" element={<CarState />}></Route>
          <Route path="/map" element={<Map />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
