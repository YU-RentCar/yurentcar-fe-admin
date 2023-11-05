import SideBar from "components/SideBar";
import Car from "pages/Car/Car";
import CarState from "pages/CarState/CarState";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="w-screen h-screen bg-slate-50">
        {/* 사이드바 */}
        <SideBar />
        {/* 메인 컨텐츠 */}
        <Routes>
          <Route path="/carstate" element={<CarState />}></Route>
          <Route path="/car" element={<Car />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
