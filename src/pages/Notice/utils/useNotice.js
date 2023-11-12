import { getNoticeList, deleteNotice } from "api/noticeAxios";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminAtom } from "recoil/adminAtom";
import { noticeInfoSelector } from "recoil/noticeAtom";
import { useAlert } from "utils/useAlert";

export const useNotice = function () {
  const adminInfo = useRecoilValue(adminAtom); // 관리자 정보
  const alert = useAlert(); // alert 제어
  const [info, setInfo] = useRecoilState(noticeInfoSelector); // 공지사항 관리 데이터 관리

  // controller
  const nu = {};

  // 공지사항 리스트 조회
  nu.getNoticeList = function () {
    getNoticeList(adminInfo.province, adminInfo.branchName)
      .then((response) => {
        console.log("공지사항 / 조회 : ", response.data);
        const tmp = [...response.data];
        tmp.sort((a, b) => a.modifiedAt - b.modifiedAt);
        setInfo({
          notices: [...tmp],
          maxPage: { num: Math.ceil(tmp.length / 6) },
        });
      })
      .catch((error) => console.log("공지사항 / 조회에러 : ", error.response));
  };
  // 특정 페이지의 6개 가져오기
  nu.getPageNotices = function (page) {
    const pageNotices = info.notices.slice((page - 1) * 6, page * 6);
    return pageNotices;
  };
  // 비어있는 개수 채우기
  nu.fillEmpty = function (beforeSix) {
    const len = beforeSix.length;
    const tmp = [...beforeSix];
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        tmp.push({
          noticeId: "",
          photoUrl: "",
          title: "",
          description: "",
          startDate: "",
          finishDate: "",
          modifiedAt: "",
        });
      }
    }
    return tmp;
  };
  // 공지사항 검색
  nu.searchNotices = function (title) {
    getNoticeList(adminInfo.province, adminInfo.branchName)
      .then((response) => {
        console.log("검색 / 조회 : ", response.data);
        const tmp = [];
        [...response.data].forEach((v) => {
          if (v.title.includes(title)) tmp.push(v);
        });
        if (tmp.length) {
          setInfo({
            notices: [...tmp],
            maxPage: { num: Math.ceil(tmp.length / 6) },
          });
        } else alert.onAndOff("검색 결과가 없습니다");
      })
      .catch((error) => console.log("검색 / 조회에러 : ", error.response));
  };
  // 차량 삭제
  nu.deleteNotice = function (noticeId) {
    deleteNotice("first_admin", noticeId)
      .then((response) => {
        console.log("공지 / 삭제 : ", response.data);
        this.getNoticeList(adminInfo.province, adminInfo.branchName);
      })
      .catch((error) => console.log("공지 / 삭제에러 : ", error.response));
  };

  return nu;
};
