import React from "react";
import { useEffect, useState, useRef } from "react";
import { adminLogin } from "api/loginAxios";
import Logo from "../../assets/Logo.png";

export const Login = () => {
  const [idInput, setIdInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="h-[600px] w-[900px] bg-white flex flex-col justify-center items-center">
        <div className="flex items-center">
          <img src={Logo} alt="로고" className="w-[300px] mb-7" />
          <span className="ml-6 text-3xl font-bold">관리자 페이지</span>
        </div>
        <div className="w-[600px] flex justify-end m-3 items-center">
          <div className="mr-[150px] text-3xl font-bold">아이디</div>
          <input
            type="text"
            className="p-3 text-2xl font-bold border-2 border-black rounded-md"
            onChange={(e) => {
              setIdInput(e.target.value);
            }}
            value={idInput}
          />
        </div>
        <div className="w-[600px] flex justify-end m-3 items-center">
          <div className="mr-[150px] text-3xl font-bold">비밀번호</div>
          <input
            type="text"
            className="p-3 text-2xl font-bold border-2 border-black rounded-md"
            onChange={(e) => {
              setPwdInput(e.target.value);
            }}
            value={pwdInput}
          />
        </div>
        <button
          className="px-[300px] py-5 rounded-md bg-amber-400 text-2xl font-bold mt-8"
          onClick={() => {
            adminLogin({ username: idInput, password: pwdInput })
              .then((response) => {
                console.log("로그인 성공!");
                console.log(response.data);
              })
              .catch((error) => {
                console.log("로그인 실패!");
                console.log(error);
              });
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
