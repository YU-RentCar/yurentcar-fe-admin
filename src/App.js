import SideBar from "components/SideBar";
import CarState from "pages/CarState/CarState";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* 사이드바 */}
      <SideBar />
      {/* 메인 컨텐츠 */}
      <Routes>
        <Route path="/carstate" element={<CarState />}></Route>
      </Routes>
    </>
  );
}

export default App;
