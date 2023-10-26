import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <h1 className="text-[48px] font-bold">Notice</h1>
        <p className="text-2xl font-bold">
          이전의 모든 세팅들을 그대로 들고 옴. package.json의 name은 수정.
        </p>
        <p className="text-2xl font-bold">
          .github 내부 workflow는 문제생길까봐 모두 주석처리하였음.
        </p>
        <p className="text-2xl font-bold">
          모든 폴더 내부에는 .gitkeep 파일이 있으므로 사용시 삭제
        </p>
        <p className="text-2xl font-bold">
          pakage랑 yarn lock 다 붙여와서 그냥 한건데.. 안꼬이겠지..
        </p>
      </div>
    </>
  );
}

export default App;
