import api from "api/interceptors";

/* 공지사항 리스트 조회 */
export const getNoticeList = (province, branchName) => {
  return api({
    url: "/branches/notices",
    method: "get",
    params: { province: province, branchName: branchName, count: 0 },
  });
};

/* 공지사항 상세 조회 */
export const getNotice = (noticeId) => {
  return api({
    url: "/branches/notices/details",
    method: "get",
    params: { noticeId: noticeId },
  });
};

/* 공지사항 삭제 */
export const deleteNotice = (adminUsername, noticeId) => {
  return api({
    url: "/branches/notices",
    method: "delete",
    params: { adminUsername: adminUsername, noticeId: noticeId },
  });
};
