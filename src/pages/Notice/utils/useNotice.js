import { getNoticeList } from "api/noticeAxios";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminAtom } from "recoil/adminAtom";
import { noticeInfoSelector } from "recoil/noticeAtom";

export const useNotice = function () {
  const adminInfo = useRecoilValue(adminAtom); // 관리자 정보
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
    const tmp = [...this.getNoticeList()];
    const res = [];
    tmp.forEach((v) => {
      if (v.title.includes(title)) res.push(v);
    });
    this.setNotices(res);
    return res;
  };
  // 차량 삭제
  nu.deleteNotice = function (target) {
    const tmp = [...info.notices];
    const idx = tmp.findIndex((notice) => notice.noticeId === target.noticeId);
    tmp.splice(idx, 1);
    this.setNotices(tmp);
    return tmp;
  };

  return nu;
};
