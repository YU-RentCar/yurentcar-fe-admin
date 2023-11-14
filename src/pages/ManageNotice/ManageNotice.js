import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import axios from "axios";
import Alert from "popUp/Alert";
import "dayjs/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useState, useEffect, forwardRef, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ko } from "date-fns/locale";
import { Editor } from "@toast-ui/react-editor";
import { getNotice } from "api/noticeAxios";
import { useAlert } from "utils/useAlert";
import { alertAtom } from "recoil/alertAtom";
import { useRecoilValue } from "recoil";
dayjs.locale("ko");

const ManageNotice = () => {
  const alert = useAlert(); // alert 제어
  const nav = useNavigate(); // nav 제어
  const location = useLocation(); // nav state 정보 제어
  const [event, setEvent] = useState([new Date(), new Date()]); // 이벤트 기간
  const [imgSrc, setImgSrc] = useState(""); // 사진 경로
  const StartInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="w-[120px] h-10 rounded-l-xl border-r-[1px] border-black bg-sky-200 font-semibold text-sm hover:shadow-figma"
      onClick={onClick}
      ref={ref}
    >
      시작 날짜 선택
    </button>
  )); // 시작 날짜 커스텀
  const FinishInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="w-[120px] h-10 rounded-r-xl bg-sky-200 font-semibold text-sm hover:shadow-figma"
      onClick={onClick}
      ref={ref}
    >
      종료 날짜 선택
    </button>
  )); // 종료 날짜 커스텀
  const editorRef = useRef();
  const [newNotice, setNewNotice] = useState({ a: 1 });
  useEffect(() => {
    // "add" 라면 정보 초기화
    if (location.state.type === "add") {
      setNewNotice({
        picture: "",
        title: "",
        startDate: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
        finishDate: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
        description: "",
        isModified: false,
      });
    } else {
      getNotice(location.state.noticeId)
        .then((response) => {
          console.log("수정 / 조회 : ", response.data);
          const tmp = {
            picture: response.data.photoUrl,
            noticeId: location.state.noticeId,
            title: response.data.title,
            startDate: response.data.startDate,
            finishDate: response.data.finishDate,
            description: response.data.description,
            isModified: false,
          };
          editorRef.current.getInstance().setMarkdown(tmp.description);
          setImgSrc(
            `http://deploytest.iptime.org:8080/api/v1/images/display/${tmp.picture}`
          );
          setNewNotice({ ...tmp });
          const tmpEvent = [
            response.data.startDate === null
              ? null
              : new Date(response.data.startDate),
            response.data.finishDate === null
              ? null
              : new Date(response.data.finishDate),
          ];
          setEvent(tmpEvent);
        })
        .catch((error) => console.log("수정 / 조회에러 : ", error.response));
    }
  }, []);
  return (
    <>
      <div className="w-[800px] mx-auto py-20">
        {/* 타이틀 */}
        <div className="flex items-center w-full text-4xl font-bold">
          {location.state.type === "add" ? "공지사항 등록" : "공지사항 수정"}
          <button
            className="flex items-center justify-center h-10 ml-12 text-base font-bold w-28 rounded-xl bg-sky-200 hover:shadow-figma"
            onClick={() => {
              const tmp = {
                title: newNotice.title,
                startDate:
                  newNotice.startDate === null
                    ? null
                    : dayjs(newNotice.startDate).format("YYYY-MM-DDTHH:mm:ss"),
                finishDate:
                  newNotice.finishDate === null
                    ? null
                    : dayjs(newNotice.finishDate).format("YYYY-MM-DDTHH:mm:ss"),
                description: newNotice.description,
                isModified: newNotice.isModified,
              };
              if (validateInfo(newNotice)) {
                const blob = new Blob([JSON.stringify({ ...tmp })], {
                  type: "application/json",
                });
                let formData = new FormData();
                formData.append("file", newNotice.picture);
                formData.append("noticeRequest", blob);
                if (location.state.type === "add") {
                  axios
                    .post(
                      "/branches/notices?adminUsername=first_admin",
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        baseURL: "http://deploytest.iptime.org:8080/api/v1",
                      }
                    )
                    .then((response) => {
                      console.log("차 / 차등록 : ", response.data);
                      nav("/notice");
                    })
                    .catch((error) => {
                      console.log("차 / 차등록에러 : ", error.response);
                    });
                } else if (location.state.type === "modify") {
                  axios
                    .patch(
                      `/branches/notices?adminUsername=first_admin&noticeId=${location.state.noticeId}`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        baseURL: "http://deploytest.iptime.org:8080/api/v1",
                      }
                    )
                    .then((response) => {
                      console.log("차 / 차수정 : ", response.data);
                      nav("/notice");
                    })
                    .catch((error) => {
                      console.log("차 / 차수정에러 : ", error.response);
                    });
                }
              }
            }}
          >
            {location.state.type === "add" ? "공지사항 등록" : "공지사항 수정"}
          </button>
        </div>
        <div className="flex flex-col w-full px-8 mt-10 rounded-2xl shadow-figma">
          {/* 제목 */}
          <div className="flex flex-col w-full mt-10">
            <span className="text-2xl font-bold">제목</span>
            <input
              className="w-full h-12 px-4 mt-4 text-lg font-semibold border-2 border-blue-500 placeholder:text-slate-500 rounded-2xl"
              placeholder="제목을 입력해주세요"
              value={newNotice.title}
              onChange={(e) => {
                const tmp = { ...newNotice, title: e.target.value };
                setNewNotice(tmp);
              }}
            />
          </div>
          {/* 이벤트 기간 */}
          <div className="flex flex-col w-full mt-10">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">이벤트 기간</span>
              {/* 기간 미정 버튼 */}
              <div className="flex ml-10">
                <button
                  className="flex justify-center items-center w-[100px] h-10 rounded-l-2xl bg-amber-400 font-semibold text-sm border-r-[1px] border-black hover:shadow-figma"
                  onClick={() => {
                    const tmp = [...event];
                    tmp[0] = null;
                    setEvent([...tmp]);
                    setNewNotice({
                      ...newNotice,
                      startDate: null,
                      finishDate: tmp[1],
                    });
                  }}
                >
                  시작 날짜 미정
                </button>
                <button
                  className="flex justify-center items-center w-[100px] h-10 bg-amber-400 font-semibold text-sm hover:shadow-figma"
                  onClick={() => {
                    const tmp = [...event];
                    tmp[1] = null;
                    setEvent([...tmp]);
                    setNewNotice({
                      ...newNotice,
                      startDate: tmp[0],
                      finishDate: null,
                    });
                  }}
                >
                  종료 날짜 미정
                </button>
                <button
                  className="flex justify-center items-center w-[100px] h-10 rounded-r-2xl bg-amber-400 font-semibold text-sm border-l-[1px] border-black hover:shadow-figma"
                  onClick={() => {
                    const tmp = [null, null];
                    setEvent([...tmp]);
                    setNewNotice({
                      ...newNotice,
                      startDate: null,
                      finishDate: null,
                    });
                  }}
                >
                  기간 미정
                </button>
              </div>
            </div>
            {/* 날짜 선택 */}
            <div className="flex items-center justify-between w-full mt-4">
              {/* 기간 */}
              <div className="w-[320px] h-12 px-4 text-base font-semibold border-2 border-blue-500 rounded-2xl flex justify-center items-center">
                {`${
                  event[0] ? dayjs(event[0]).format("YY년 MM월 DD일 (ddd)") : ""
                } ~ ${
                  event[1] ? dayjs(event[1]).format("YY년 MM월 DD일 (ddd)") : ""
                }`}
              </div>
              <div className="flex items-center">
                {/* 날짜 선택 버튼 */}
                <DatePicker
                  className="w-full text-white"
                  onChange={(start) => {
                    const tmp = {
                      ...newNotice,
                      startDate: dayjs(start).format("YYYY-MM-DDTHH:mm:ss"),
                    };
                    setNewNotice(tmp);
                    const tmpEvent = [start, ""];
                    setEvent(tmpEvent);
                  }}
                  selected={event[0]}
                  peekNextMonth // 다음 월 도 미리보기
                  showMonthDropdown // 월 드롭다운
                  showYearDropdown // 년도 드롭다운
                  shouldCloseOnSelect // 선택 시 close
                  dropdownMode="select"
                  locale={ko}
                  customInput={<StartInput />}
                ></DatePicker>
                {/* 날짜 선택 버튼 */}
                <DatePicker
                  className="w-full text-white"
                  onChange={(finish) => {
                    const tmp = {
                      ...newNotice,
                      finishDate: dayjs(finish).format("YYYY-MM-DDTHH:mm:ss"),
                    };
                    setNewNotice(tmp);
                    const tmpEvent = [event[0], finish];
                    setEvent(tmpEvent);
                  }}
                  selected={event[1]}
                  minDate={event[0]}
                  peekNextMonth // 다음 월 도 미리보기
                  showMonthDropdown // 월 드롭다운
                  showYearDropdown // 년도 드롭다운
                  shouldCloseOnSelect // 선택 시 close
                  dropdownMode="select"
                  locale={ko}
                  customInput={<FinishInput />}
                ></DatePicker>
              </div>
            </div>
          </div>
          {/* 이벤트 사진 */}
          <div className="flex flex-col w-full mt-10">
            <span className="text-2xl font-bold">공지사항 사진</span>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="mx-auto w-[200px]"
              onChange={(e) => {
                const reader = new FileReader();
                // 업로드한 사진 url 저장
                reader.onload = function (e) {
                  setImgSrc(e.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
                setNewNotice({
                  ...newNotice,
                  picture: e.target.files[0],
                  isModified: true,
                }); // 변경 정보 저장
              }}
            />
            <img
              src={imgSrc}
              alt="공지사항 사진"
              className="object-cover w-[800px] border-2 border-dashed border-slate-300 rounded-2xl mt-4"
            ></img>
          </div>
          {/* 이벤트 내용 */}
          <div className="flex flex-col w-full mt-10">
            <span className="text-2xl font-bold">공지사항 내용</span>
            <div className="mt-4 mb-8">
              {/* 내용을 입력하기 위한 텍스트 에디터 + 사진도 추가 가능 */}
              <Editor
                height="600px"
                initialValue={
                  location.state.noticeId
                    ? newNotice.description
                    : "내용을 입력해주세요"
                }
                initialEditType="markdown"
                toolbarItems={[
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task", "indent", "outdent"],
                  ["table", "link"],
                  ["code", "codeblock"],
                  ["scrollSync"],
                ]}
                hideModeSwitch={true}
                onChange={() => {
                  const newDesc = editorRef.current.getInstance().getMarkdown();
                  const tmp = {
                    ...newNotice,
                    description: newDesc,
                  };
                  setNewNotice(tmp);
                }}
                ref={editorRef}
                plugins={[colorSyntax]}
                language="ko-KR"
              />
            </div>
          </div>
        </div>
      </div>
      {useRecoilValue(alertAtom).state && <Alert />}
    </>
  );

  function validateInfo(newNotice) {
    if (newNotice.title === "") {
      alert.onAndOff("제목을 입력해주세요");
      return false;
    } else if (newNotice.description === "") {
      alert.onAndOff("내용을 입력해주세요");
      return false;
    } else return true;
  }
};

export default ManageNotice;
