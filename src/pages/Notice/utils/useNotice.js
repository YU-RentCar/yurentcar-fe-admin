import { useState } from "react";

export const useNotice = function () {
  // 차량 더미 데이터
  const [notices, setNotices] = useState([
    {
      noticeId: 0,
      photoUrl: "",
      title:
        "title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1title1",
      description: "description1",
      startDate: "2023-01-01T00:00:00",
      finishDate: "2023-12-31T00:00:00",
      modifiedAt: "2023-11-09T00:00:00",
    },
    {
      noticeId: 1,
      photoUrl: "",
      title: "title2",
      description: "description2",
      startDate: "2023-01-01T00:00:00",
      finishDate: "2023-12-31T00:00:00",
      modifiedAt: "2023-11-09T00:00:00",
    },
    {
      noticeId: 2,
      photoUrl: "",
      title: "title3",
      description: "description3",
      startDate: "2023-01-01T00:00:00",
      finishDate: "2023-12-31T00:00:00",
      modifiedAt: "2023-11-09T00:00:00",
    },
    {
      noticeId: 3,
      photoUrl: "",
      title: "title4",
      description: "description4",
      startDate: "2023-01-01T00:00:00",
      finishDate: "2023-12-31T00:00:00",
      modifiedAt: "2023-11-09T00:00:00",
    },
    {
      noticeId: 4,
      photoUrl: "",
      title: "title5",
      description: "description5",
      startDate: "2023-01-01T00:00:00",
      finishDate: "2023-12-31T00:00:00",
      modifiedAt: "2023-11-09T00:00:00",
    },
    {
      noticeId: 5,
      photoUrl: "",
      title: "title6",
      description: "description6",
      startDate: "2023-01-01T00:00:00",
      finishDate: "2023-12-31T00:00:00",
      modifiedAt: "2023-11-09T00:00:00",
    },
    {
      noticeId: 6,
      photoUrl: "",
      title: "title7",
      description: "description7",
      startDate: "2023-01-01T00:00:00",
      finishDate: "2023-12-31T00:00:00",
      modifiedAt: "2023-11-09T00:00:00",
    },
    {
      noticeId: 7,
      photoUrl: "",
      title: "title8",
      description: "description8",
      startDate: "2023-01-01T00:00:00",
      finishDate: "2023-12-31T00:00:00",
      modifiedAt: "2023-11-09T00:00:00",
    },
    {
      noticeId: 8,
      photoUrl: "",
      title: "title9",
      description: "description9",
      startDate: "2023-01-01T00:00:00",
      finishDate: "2023-12-31T00:00:00",
      modifiedAt: "2023-11-09T00:00:00",
    },
    {
      noticeId: 9,
      photoUrl: "",
      title: "title10",
      description: "description10",
      startDate: "2023-01-01T00:00:00",
      finishDate: "2023-12-31T00:00:00",
      modifiedAt: "2023-11-09T00:00:00",
    },
  ]);

  // controller
  const nu = {};

  // getter
  nu.getNotices = function () {
    return notices;
  };
  // setter
  nu.setNotices = function (newNotices) {
    setNotices(newNotices);
  };
  // 공지사항 리스트 조회
  nu.getNoticeList = function () {
    const tmp = this.fillSix(notices);
    this.setNotices(tmp);
    return tmp;
  };
  // 특정 페이지의 6개 가져오기
  nu.getPageNotices = function (page) {
    const pageNotices = notices.slice((page - 1) * 6, page * 6);
    return pageNotices;
  };
  // 비어있는 개수 채우기
  nu.fillSix = function (beforeSix) {
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
    const tmp = [...notices];
    const idx = tmp.findIndex((notice) => notice.noticeId === target.noticeId);
    tmp.splice(idx, 1);
    this.setNotices(tmp);
    return tmp;
  };

  return nu;
};
