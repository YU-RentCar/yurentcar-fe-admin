import Logo from "assets/Logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, Drawer } from "@material-tailwind/react";
import {
  MdArrowForward,
  MdArrowBack,
  MdHandyman,
  MdDriveEta,
  MdVpnKey,
  MdEditCalendar,
  MdLocalParking,
  MdMoney,
  MdAssignment,
} from "react-icons/md";

const SideBar = () => {
  const [open, setOpen] = useState(false); // Drawer open/close 제어
  const nav = useNavigate(); // nav 제어
  const [menu, setMenu] = useState([
    {
      name: "차량 상태 관리",
      icon: <MdHandyman className="text-[35px]" />,
      path: "/carstate",
    },
    {
      name: "차 관리",
      icon: <MdDriveEta className="text-[35px]" />,
      path: "/car",
    },
    { name: "차 키 관리", icon: <MdVpnKey className="text-[35px]" /> },
    {
      name: "예약 변경",
      icon: <MdEditCalendar className="text-[35px]" />,
      path: "/reservation",
    },
    {
      name: "주차장 관리",
      icon: <MdLocalParking className="text-[35px]" />,
      path: "/map",
    },
    { name: "포인트 관리", icon: <MdMoney className="text-[35px]" /> },
    { name: "공지사항 관리", icon: <MdAssignment className="text-[35px]" /> },
  ]); // 각 메뉴 + 아이콘
  return (
    <>
      {/* 사이드바 펼침 버튼 + 툴팁 */}
      <Tooltip
        content="사이드바를 펼칩니다"
        placement="right"
        animate={{
          mount: { scale: 1, x: 0 },
          unmount: { scale: 0, x: 25 },
        }}
        className="w-[150px] h-[40px] border-2 border-slate-500 rounded-2xl bg-white text-sm text-slate-500 font-semibold flex justify-center items-center"
      >
        <button
          onClick={() => setOpen(true)} // 메뉴 열기
          className="flex items-center justify-center w-[45px] h-[45px] fixed left-[30px] top-[30px]"
        >
          <MdArrowForward className="text-[30px]" />
        </button>
      </Tooltip>
      {/* 사이드바 본체 */}
      <Drawer open={open} size={500}>
        {/* 로고 + 닫힘 버튼 */}
        <div className="w-[450px] flex justify-between items-center mx-auto mt-8">
          <div className="w-[250px] flex justify-between items-center">
            <img src={Logo} alt="로고" className="w-[120px] object-cover" />
            <span className="text-xl font-bold">관리자 페이지</span>
          </div>
          <button
            onClick={() => setOpen(false)} // 메뉴 닫기
            className="flex items-center justify-center w-[45px] h-[45px]"
          >
            <MdArrowBack className="text-[30px]" />
          </button>
        </div>
        {/* 지점 이름 */}
        <div className="text-4xl font-extrabold text-blue-800 ml-[25px] mt-4">
          서울대 지점
        </div>
        {/* 메뉴들 + 로그아웃 버튼 */}
        <div className="w-[450px] h-[780px] rounded-2xl bg-slate-50 mx-auto mt-4 flex flex-col justify-between items-center pt-6 pb-4">
          <div className="w-[420px]">
            {menu.map((v, i) => {
              return (
                <button
                  key={i}
                  className="w-[400px] h-[60px] px-4 mt-3 rounded-2xl hover:bg-slate-400 flex items-center hover:text-slate-800"
                  onClick={() => {
                    nav(v["path"]); // 지정된 경로로 이동
                    setOpen(false); // 이동 후에는 메뉴 닫기
                  }}
                >
                  {v["icon"]}
                  <div className="text-[30px] font-bold ml-12">{v["name"]}</div>
                </button>
              );
            })}
          </div>
          <button className="w-[420px] h-[70px] flex justify-center items-center bg-sky-200 rounded-2xl text-3xl font-extrabold hover:shadow-figma">
            로그아웃
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default SideBar;
